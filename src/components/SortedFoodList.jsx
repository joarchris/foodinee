import React, { useState, useEffect } from 'react';
import FoodTracker from './FoodTracker';
import Footer from './Footer';
import { TrashIcon } from '@heroicons/react/outline';
import { v4 as uuidv4 } from 'uuid';

export default function SortedFoodlist() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const storedFoodItems = JSON.parse(localStorage.getItem('foodpackage') || '[]');
    setFoodItems(storedFoodItems);
  }, []);

  const handleAddFoodItem = (newFoodItem) => {
    const updatedFoodItems = [...foodItems, { ...newFoodItem, id: uuidv4() }];
    setFoodItems(updatedFoodItems);
    localStorage.setItem('foodpackage', JSON.stringify(updatedFoodItems));
  };

  // Group food items by date
  const groupedFoodItems = foodItems.reduce((grouped, foodItem) => {
    const date = new Date(foodItem.createdAt);
    const dateString = date.toDateString();
    if (!grouped[dateString]) {
      grouped[dateString] = [];
    }
    grouped[dateString].push(foodItem);
    return grouped;
  }, {});

  // Sort dates in descending order (newest on top)
  const sortedDates = Object.keys(groupedFoodItems).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB - dateA;
  });

  // Delete food item by id
  const handleDelete = (itemId) => {
    const updatedFoodItems = foodItems.filter((item) => item.id !== itemId);
    setFoodItems(updatedFoodItems);
    localStorage.setItem('foodpackage', JSON.stringify(updatedFoodItems));
  };

  return (
    <div className="app">
      <div className="pages">
        <FoodTracker onAdd={handleAddFoodItem} foodItems={foodItems} />
        <div>
          {sortedDates.map((dateString) => (
            <div className="listing-details" key={dateString}>
              <h4>{dateString}</h4>

              {groupedFoodItems[dateString].map((item, index) => (
                <p key={index}>
                  {item.title} - {item.quantity && <span>{item.quantity}stk</span>}{' '}
                  {item.volume && <span>{item.volume}dl</span>} {item.weight && <span>{item.weight}g</span>}{' '}
                  <span className="cursor-pointer ml-2" onClick={() => handleDelete(item.id)}>
                    <TrashIcon height={15} color={'red'} />
                  </span>
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
