import React from 'react';

function FoodListForDay({ foodItems }) {
  // Sort the foodItems array in descending order based on the timestamp
  const sortedFoodItems = foodItems.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  return (
    <div className="listing-details">
      <div>
        {sortedFoodItems.map((item) => (
          <p key={item.id}>
            {item.name} - {item.quantity && <span>{item.quantity}stk</span>} {item.volume && <span>{item.volume}dl</span>}{' '}
            {item.weight && <span>{item.weight}g</span>} kl:{item.timestamp}
          </p>
        ))}
      </div>
    </div>
  );
}

export default FoodListForDay;
