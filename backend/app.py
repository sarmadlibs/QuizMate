
import re
from transformers import T5ForConditionalGeneration, T5Tokenizer, pipeline
from flask import Flask, request, jsonify

app = Flask(__name__)


tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = T5ForConditionalGeneration.from_pretrained("valhalla/t5-small-qa-qg-hl", use_auth_token="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")

qa_pipeline = pipeline("question-answering", model="distilbert-base-uncased-distilled-squad", tokenizer="distilbert-base-uncased-distilled-squad")


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


@app.route('/generate_qa_pairs', methods=['POST'])
def generate_qa_pairs():
    input_data = request.get_json()
    text = input_data["text"]
    

    prompt = f"generate questions for the following text: {text}"
    inputs = tokenizer.encode(prompt, return_tensors="pt", max_length=512, truncation=True)
    outputs = model.generate(inputs, max_length=200, num_return_sequences=25, do_sample=True, top_k=100, top_p=0.9, temperature=0.6)
    decoded_output = [tokenizer.decode(output, skip_special_tokens=True) for output in outputs]
    questions = [question.strip() for output in decoded_output for question in output.split("\n")]


    questions = remove_duplicates(questions)
    questions = filter_questions(questions, text)


    qa_results = []
    for question in questions:
        answer = qa_pipeline(question=question, context=text)
        qa_results.append({"question": question, "answer": answer["answer"], "score": answer["score"]})


    qa_results = sorted(qa_results, key=lambda x: x["score"], reverse=True)[:5]

    return jsonify(qa_results)

if __name__ == '__main__':
    app.run(debug=True)
