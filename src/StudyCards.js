import React, { useState } from "react";
import "./StudyCards.css";

function StudyCards() {
  // Declare state variables "input" and "cards"
  const [input, setInput] = useState("");
  const [cards, setCards] = useState([]);

  // Event handler for the textarea element
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  // Event handler for the form submission
  const handleSubmit = (event) => {
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
    setCards(newCards);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea value={input} onChange={handleChange} />
        <button type="submit">Create cards</button>
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
