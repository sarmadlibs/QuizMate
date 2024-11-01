import re
import subprocess
import json
from flask import Flask, request, jsonify

app = Flask(__name__)

def remove_duplicates(questions):
    unique_questions = []
    for question in questions:
        if question not in unique_questions:
            unique_questions.append(question)
    return unique_questions

def filter_questions(questions, text):
    keywords = re.findall(r'\b\w+\b', text.lower())
    filtered_questions = [q for q in questions if any(kw in q.lower() for kw in keywords)]
    return filtered_questions

def run_llama_query(prompt):
    result = subprocess.run(
        ["ollama", "run", "llama3.2:3b", prompt],
        capture_output=True,
        text=True
    )
    if result.returncode != 0:
        print("Error running Ollama:", result.stderr)
        return ""
    return result.stdout

@app.route('/generate_qa_pairs', methods=['POST'])
def generate_qa_pairs():
    input_data = request.get_json()
    text = input_data["text"]

    prompt = f"Generate exactly 10 clear and concise question-answer pairs based on the following text. Only provide the question and answer, in this format:\n\nQ: [Question]\nA: [Answer]\n\nText: {text}"
    generated_text = run_llama_query(prompt)
    
    print("Generated Text:", generated_text)

    #attempt to parse as plain text - each line as q&a pair
    qa_results = []
    lines = generated_text.splitlines()
    for line in lines:
        if line.startswith("Q:"):
            question = line[3:].strip()
        elif line.startswith("A:"):
            answer = line[3:].strip()
            qa_results.append({"question": question, "answer": answer})

    return jsonify(qa_results[:10])

if __name__ == '__main__':
    app.run(debug=True)