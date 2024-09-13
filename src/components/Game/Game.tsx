import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { saveScore, getHighScore } from '../../services/api';
import './Game.css';

const Game: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    startNewGame();
    fetchHighScore();
  }, []);

  const fetchHighScore = async () => {
    try {
      const highScore = await getHighScore();
      setHighScore(highScore);
    } catch (error) {
      console.error('Failed to fetch high score:', error);
    }
  };

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const guessNumber = parseInt(guess);

    if (isNaN(guessNumber)) {
      setMessage('Please enter a valid number');
      return;
    }

    if (guessNumber === targetNumber) {
      const newScore = score - 1;
      setScore(20);
      setHighScore(newScore);
      setMessage('Correct! Starting a new game...');
      
      if (newScore > highScore) {
        setHighScore(newScore);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        saveScore(newScore);
        
      }
      setTimeout(startNewGame, 2000);
    } else if (guessNumber < targetNumber) {
        
        setScore(score-1)
      setMessage('Too low! Try again.');
    } else {
        
        setScore(score-1)
      setMessage('Too high! Try again.');
    }
    setGuess('');
    if(score<0){
        startNewGame();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="game-container">
      {showConfetti && <Confetti />}
      <h2>Number Guessing Game</h2>
      <p>Guess a number between 1 and 100</p>
      <form onSubmit={handleGuess}>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          min="1"
          max="100"
          required
        />
        <button type="submit">Guess</button>
      </form>
      <p className="message">{message}</p>
      <p>Current Score: {score}</p>
      <p>High Score: {highScore}</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
    </div>
  );
};

export default Game;
