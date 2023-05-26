import React, { useState, useEffect } from 'react';
import './App.css';

const keysToType = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

const App = () => {
  const [currentKeys, setCurrentKeys] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [keysPressed, setKeysPressed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  // Generate a random sequence of keys
  const generateKeysToType = () => {
    const sequenceLength = Math.floor(Math.random() * 10) + 5; // Random length between 5 and 15
    const randomKeys = [];
    for (let i = 0; i < sequenceLength; i++) {
      const randomIndex = Math.floor(Math.random() * keysToType.length);
      randomKeys.push(keysToType[randomIndex]);
    }
    setCurrentKeys(randomKeys);
  };

  // Handle user input
  const handleUserInput = (e) => {
    const inputKey = e.key.toLowerCase();
    if (currentKeys.includes(inputKey)) {
      setUserInput((prevInput) => prevInput + inputKey);
      setKeysPressed((prevKeysPressed) => prevKeysPressed + 1);
    }
  };

  // Calculate accuracy percentage
  const calculateAccuracy = () => {
    const typedKeys = userInput.split('');
    const correctKeys = currentKeys.slice(0, typedKeys.length);
    let matchingKeys = 0;
    for (let i = 0; i < typedKeys.length; i++) {
      if (typedKeys[i] === correctKeys[i]) {
        matchingKeys++;
      }
    }
    const newAccuracy = (matchingKeys / typedKeys.length) * 100;
    setAccuracy(newAccuracy);
  };

  // Timer countdown
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // Handle timer completion
  useEffect(() => {
    if (timer === 0) {
      setUserInput('');
      setKeysPressed(0);
      setAccuracy(100);
      generateKeysToType();
      setTimer(300);
    }
  }, [timer]);

  // Initialize the first set of keys to type
  useEffect(() => {
    generateKeysToType();
  }, []);

  // Update accuracy on user input change
  useEffect(() => {
    calculateAccuracy();
  }, [userInput]);

  return (
    <div className="App">
      <h1>Touch Typing App</h1>
      <div className="timer">Timer: {timer}s</div>
      <div className="typing-box">
        <input type="text" value={userInput} onKeyPress={handleUserInput} readOnly />
      </div>
      <div className="keys-to-type">
        Next Keys: {currentKeys.map((key, index) => <span key={index}>{key}</span>)}
      </div>
      <div className="stats">
        <div>Keys Pressed: {keysPressed}</div>
        <div>Accuracy: {accuracy.toFixed(2)}%</div>
      </div>
    </div>
  );
};

export default App;
