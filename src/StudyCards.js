import React, { useState, useEffect } from "react";
import "./StudyCards.css";

function StudyCards() {
  const [input, setInput] = useState("");
  // const [cards, setCards] = useState([]);
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const saveCardsToLocalStorage = (cards) => {
    localStorage.setItem("cards", JSON.stringify(cards));
  };

  const loadCardsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cards")) || [];
  };

  const [cards, setCards] = useState(loadCardsFromLocalStorage());

  // ...

  // Save the cards to local storage whenever the "cards" state changes
  useEffect(() => {
    saveCardsToLocalStorage(cards);
  }, [cards]);
  const handlePointerDown = (event) => {
    setIsDragging(true);
    setDragStart(event.clientX);
    setScrollStart(document.querySelector(".carousel-inner").scrollLeft);
  };

  const handlePointerMove = (event) => {
    if (isDragging) {
      document.querySelector(".carousel-inner").scrollLeft =
        scrollStart - (event.clientX - dragStart);
    }
  };

  const handlePointerUp = (event) => {
    setIsDragging(false);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestionInput(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswerInput(event.target.value);
  };

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

  const handleAddCard = (event) => {
    event.preventDefault();

    setCards([
      ...cards,
      {
        question: questionInput,
        answer: answerInput,
      },
    ]);

    setQuestionInput("");
    setAnswerInput("");
  };

  const handleFlipCard = (card, isDelete) => {
    const cardIndex = cards.indexOf(card);

    if (isDelete) {
      // Remove the card from the array
      const newCards = [...cards];
      newCards.splice(cardIndex, 1);

      // Update the state with the new array of cards
      setCards(newCards);
    } else {
      setCurrentCardIndex(cardIndex);

      // Create a new array of cards with the "flipped" class added to the card
      const newCards = [...cards];
      newCards[cardIndex] = { ...card, flipped: !card.flipped };

      // Update the "cards" state with the new array of cards
      setCards(newCards);
    }
  };

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleMovePrevious = () => {
    setCurrentCardIndex((currentCardIndex + cards.length - 1) % cards.length);
    document.querySelector(".carousel-inner").scrollBy({
      left: -document.querySelector(".card").offsetWidth,
      behavior: "smooth",
    });
  };

  const handleMoveNext = () => {
    setCurrentCardIndex((currentCardIndex + 1) % cards.length);
    document.querySelector(".carousel-inner").scrollBy({
      left: document.querySelector(".card").offsetWidth,
      behavior: "smooth",
    });
  };

  const handleDeleteCard = (cardToDelete) => {
    const newCards = cards.filter((card) => card !== cardToDelete);
    setCards(newCards);
  };

  return (
    <div className="App">
      <form onSubmit={handleInputSubmit}>
        <textarea
          value={input}
          placeholder="Enter a question followed by an answer on the following line to get started..."
          onChange={handleInputChange}
        />
        <button type="submit">Create cards</button>
      </form>
      <form onSubmit={handleAddCard}>
        <input
          type="text"
          value={questionInput}
          onChange={handleQuestionChange}
          placeholder="Question"
        />
        <input
          type="text"
          value={answerInput}
          onChange={handleAnswerChange}
          placeholder="Answer"
        />
        <button type="submit">Add card</button>
      </form>
      <div
        className="carousel"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="carousel-inner">
          {cards.map((card, index) => (
            <div>
              <div
                key={index}
                className={`card ${card.flipped ? "flipped" : ""}`}
                onClick={() => handleFlipCard(card, true)}
              >
                <div className="card-front">{card.question}</div>
                <div className="card-back">{card.answer}</div>
                <button
                  className="deleteButton"
                  onClick={() => handleDeleteCard(card)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-nav">
          <button className="carousel-button1" onClick={handleMovePrevious}>
            &lt;
          </button>
          <button className="carousel-button2" onClick={handleMoveNext}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudyCards;
