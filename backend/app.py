
from transformers import T5ForConditionalGeneration, T5Tokenizer, pipeline
from flask import Flask, request, jsonify

app = Flask(__name__)

tokenizer = T5Tokenizer.from_pretrained("t5-base")
model = T5ForConditionalGeneration.from_pretrained("valhalla/t5-base-qg-hl")
qa_pipeline = pipeline("question-answering")

@app.route('/generate_qa_pairs', methods=['POST'])
def generate_qa_pairs():
    input_data = request.get_json()
    text = input_data["text"]

    prompt = f"generate questions for the following text: {text}"

    inputs = tokenizer.encode(prompt, return_tensors="pt", max_length=512, truncation=True)
    outputs = model.generate(inputs, max_length=200, num_return_sequences=10, do_sample=True, top_k=100, top_p=0.9, temperature=0.8)

    decoded_output = [tokenizer.decode(output, skip_special_tokens=True) for output in outputs]

    questions = [question.strip() for output in decoded_output for question in output.split("\n")]

    # Filter out questions with low scores
    qa_results = []
    for question in questions:
        answer = qa_pipeline(question=question, context=text)
        qa_results.append({"question": question, "answer": answer["answer"], "score": answer["score"]})

    # Sort by score and retain top 5 questions
    sorted_qa_results = sorted(qa_results, key=lambda x: x["score"], reverse=True)[:5]

    return jsonify(sorted_qa_results)

if __name__ == '__main__':
    app.run(debug=True)
