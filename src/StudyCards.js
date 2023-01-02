import React, { useState } from "react";
import "./StudyCards.css";

function StudyCards() {
  // Declare state variables "input", "questionInput", and "answerInput"
  const [input, setInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");

  // Declare the "cards" state variable to hold the array of study cards
  const [cards, setCards] = useState([]);

  // Event handler for the textarea element
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  // Event handlers for the question and answer input fields
  const handleQuestionChange = (event) => {
    setQuestionInput(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswerInput(event.target.value);
  };

  // Event handler for the form submission
  const handleInputSubmit = (event) => {
    event.preventDefault();

    /**
     *! Split the input text into an array of lines,
     *! Filter out empty lines from the input lines,
     *! Create array of study cards from the input lines
     **/
    const inputLines = input.split("\n");
    const filteredInputLines = inputLines.filter((line) => line !== "");
    const newCards = filteredInputLines.reduce((acc, line, index) => {
      // If the current index is even, add a new study card to the array
      if (index % 2 === 0) {
        acc.push({
          question: line,
          answer: filteredInputLines[index + 1],
        });
      }
      return acc;
    }, []);

    //! Update the "cards" state with the new array of study cards
    setCards([...cards, ...newCards]);
  };

  // Event handler for the "Add card" button
  const handleAddCard = (event) => {
    event.preventDefault();

    // Create a new study card object with the question and answer input values
    const newCard = {
      question: questionInput,
      answer: answerInput,
    };

    // Add the new study card to the "cards" state array
    setCards([...cards, newCard]);

    // Clear the question and answer input fields
    setQuestionInput("");
    setAnswerInput("");
  };

  return (
    <div className="App">
      <form onSubmit={handleInputSubmit}>
        <textarea value={input} onChange={handleInputChange} />
        <button type="submit">Create cards</button>
      </form>
      <form onSubmit={handleAddCard}>
        <label>
          Question:
          <input
            type="text"
            value={questionInput}
            onChange={handleQuestionChange}
          />
        </label>
        <label>
          Answer:
          <input
            type="text"
            value={answerInput}
            onChange={handleAnswerChange}
          />
        </label>
        <button type="submit">Add card</button>
      </form>
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div className="card-front">{card.question}</div>
          <div className="card-back">{card.answer}</div>
        </div>
      ))}
    </div>
  );
}

export default StudyCards;
