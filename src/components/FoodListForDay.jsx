import React from 'react';

function FoodListForDay({ foodItems }) {
  return (
    <div className="listing-details">
      <div>
        {foodItems.map((item) => (
          <p key={item.id}>
            {item.name} - {item.quantity && <div>{item.quantity} stk</div>} {item.volume && <div>{item.volume} dl</div>}{' '}
            {item.weight && <div>{item.weight} g</div>}
            {item.timestamp}
          </p>
        ))}
      </div>
    </div>
  );
}

export default FoodListForDay;
