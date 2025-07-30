import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";

// Character data matching the Amphibia theme
const characters = [
  {
    id: 1,
    name: "Anne Boonchuy",
    image: "https://heldersrvio.github.io/memory-card-game/static/media/anne.d9d14c90.jpg"
  },
  {
    id: 2,
    name: "Sadie Croaker",
    image: "https://heldersrvio.github.io/memory-card-game/static/media/croaker.824ac0d7.png"
  },
  {
    id: 3,
    name: "Captain Grime",
    image: "https://heldersrvio.github.io/memory-card-game/static/media/grime.6e597003.png"
  },
  {
    id: 4,
    name: "Hop Pop Plantar",
    image: "https://heldersrvio.github.io/memory-card-game/static/media/hoppop.5badcd86.png"
  },
  {
    id: 5,
    name: "Leopold Loggle",
    image: "https://heldersrvio.github.io/memory-card-game/static/media/loggle.c5790b4e.png"
  },
  {
    id: 6,
    name: "Maddie Flour",
    image: "https://heldersrvio.github.io/memory-card-game/static/media/maddie.794635a6.jpg"
  },
  {
    id: 7,
    name: "Polly Plantar",
    image: "https://heldersrvio.github.io/memory-card-game/static/media/polly.7702daf7.png"
  },
  {
    id: 8,
    name: "Sasha",
    image: "https://heldersrvio.github.io/memory-card-game/static/media/sasha.5e94ec83.jpg"
  },
  {
    id: 9,
    name: "Sprig Plantar",
    image: "https://heldersrvio.github.io/memory-card-game/static/media/sprig.57a1fbf3.png"
  },
  {
    id: 10,
    name: "Sylvia Sundew",
    image: "https://heldersrvio.github.io/memory-card-game/static/media/sylvia.fc5ee06d.png"
  },
  {
    id: 11,
    name: "Mayor Toadstool",
    image: "https://heldersrvio.github.io/memory-card-game/static/media/toadstool.2b499bfe.jpg"
  },
  {
    id: 12,
    name: "Wally",
    image: "https://heldersrvio.github.io/memory-card-game/static/media/wally.8036609c.png"
  }
];

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('bestScore')) || 0;
  });
  const [clickedCards, setClickedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Initialize and shuffle cards
  const initializeCards = () => {
    const shuffled = [...characters].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  useEffect(() => {
    initializeCards();
  }, []);

  // Save best score to localStorage
  useEffect(() => {
    if (bestScore > 0) {
      localStorage.setItem('bestScore', bestScore.toString());
    }
  }, [bestScore]);

  const handleCardClick = (cardId) => {
    if (gameOver) return;

    if (clickedCards.includes(cardId)) {
      // Game over - clicked the same card twice
      setGameOver(true);
      if (score > bestScore) {
        setBestScore(score);
      }
    } else {
      // Correct click
      const newClickedCards = [...clickedCards, cardId];
      setClickedCards(newClickedCards);
      setScore(score + 1);

      // Check if all cards have been clicked (win condition)
      if (newClickedCards.length === characters.length) {
        setGameOver(true);
        setBestScore(characters.length);
      } else {
        // Shuffle cards after each click
        setCards([...cards].sort(() => Math.random() - 0.5));
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    setClickedCards([]);
    setGameOver(false);
    initializeCards();
  };

  return (
    <div className="App">
      <h1>Amphibia Memory Game</h1>
      <p className="game-description">
        Get points by clicking on an image but don't click on any more than once!
      </p>
      
      <div className="score-board">
        <span className="score">Score: {score}</span>
        <span className="best-score">Best score: {bestScore}</span>
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>{score === characters.length ? 'Congratulations! You won!' : 'Game Over!'}</h2>
          <p>Your final score: {score}</p>
          <button onClick={resetGame} className="reset-button">
            Play Again
          </button>
        </div>
      )}

      <Board 
        cards={cards} 
        onCardClick={handleCardClick}
      />
    </div>
  );
}

export default App;
