

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
    outputs = model.generate(inputs, max_length=200, num_return_sequences=5, do_sample=True, top_k=100, top_p=0.9)

    decoded_output = tokenizer.decode(outputs[0], skip_special_tokens=True)

    questions = decoded_output.strip().split("\n")

    result = []
    for question in questions:
        answer = qa_pipeline(question=question, context=text)
        result.append({"question": question, "answer": answer["answer"]})

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
