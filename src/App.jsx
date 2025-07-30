import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('bestScore')) || 0;
  });
  const [clickedCards, setClickedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch characters from API
  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using Rick and Morty API as example
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      
      // Take first 12 characters and format them
      const characters = data.results.slice(0, 12).map(char => ({
        id: char.id,
        name: char.name,
        image: char.image
      }));
      
      return characters;
    } catch (err) {
      setError('Failed to load characters. Please try again.');
      console.error('Error fetching characters:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Initialize and shuffle cards
  const initializeCards = async () => {
    const characters = await fetchCharacters();
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
      if (newClickedCards.length === cards.length) {
        setGameOver(true);
        setBestScore(cards.length);
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
      <h1>Rick and Morty Memory Game</h1>
      <p className="game-description">
        Get points by clicking on an image but don't click on any more than once!
      </p>
      
      <div className="score-board">
        <span className="score">Score: {score}</span>
        <span className="best-score">Best score: {bestScore}</span>
      </div>

      {loading && (
        <div className="loading">
          <h2>Loading characters...</h2>
          <div className="spinner"></div>
        </div>
      )}

      {error && (
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={initializeCards} className="reset-button">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {gameOver && (
            <div className="game-over">
              <h2>{score === cards.length ? 'Congratulations! You won!' : 'Game Over!'}</h2>
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
        </>
      )}
    </div>
  );
}

export default App;
