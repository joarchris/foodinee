import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function FoodTracker({ onAdd, foodItems }) {
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState(''); // Initialize with 0 as a number
  const [weight, setWeight] = useState(''); // Initialize with 0 as a number
  const [volume, setVolume] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const foodItem = {
      title,
      quantity,
      volume,
      weight,
      createdAt: Date.now(),
      id: uuidv4(), // Assign a unique id here
    };

    saveItem(foodItem);
    setTitle('');
    setQuantity('');
    setVolume('');
    setWeight('');
  };

  const saveItem = (foodItem) => {
    const foodpackage = [...foodItems, foodItem];
    onAdd(foodItem); // Call the parent's onAdd function to update state
    localStorage.setItem('foodpackage', JSON.stringify(foodpackage));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Mat eller drikke" />
        <input type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="Antall x" />
        <input type="number" value={volume} onChange={(event) => setVolume(event.target.value)} placeholder="Volume dl" />
        <input type="number" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder="Vekt gram" />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
