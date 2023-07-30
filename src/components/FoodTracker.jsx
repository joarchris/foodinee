// FoodTracker.js
import React, { useState, useEffect } from 'react';
import FoodListForDay from './FoodListForDay';

function FoodTracker() {
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // Load data from local storage when the component mounts
    const savedData = localStorage.getItem('foodItems');
    if (savedData) {
      setFoodItems(JSON.parse(savedData));
    }
  }, []);

  const handleChangeFood = (e) => {
    setFoodName(e.target.value);
  };

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleChangeWeight = (e) => {
    setWeight(e.target.value);
  };

  const handleChangeVolume = (e) => {
    setVolume(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (foodName && quantity) {
      const newFoodItem = {
        id: Date.now(),
        name: foodName,
        quantity: parseInt(quantity),
        weight: parseInt(weight),
        volume: parseInt(volume),
        timestamp: new Date().toLocaleTimeString(),
      };

      setFoodItems((prevFoodItems) => [...prevFoodItems, newFoodItem]);
      setFoodName('');
      setQuantity('');
      setWeight('');
      setVolume('');

      // Save data to localStorage
      localStorage.setItem('foodItems', JSON.stringify([...foodItems, newFoodItem]));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={foodName} onChange={handleChangeFood} placeholder="Food or Drink Name" />
        <input type="number" value={quantity} onChange={handleChangeQuantity} placeholder="Quantity" />
        <input type="number" value={weight} onChange={handleChangeWeight} placeholder="Weight in gram" />
        <input type="number" value={volume} onChange={handleChangeVolume} placeholder="Volume in dl" />
        <button type="submit">Add</button>
      </form>
      <FoodListForDay foodItems={foodItems} />
    </div>
  );
}

export default FoodTracker;
