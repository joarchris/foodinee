// FoodListForDay.js
import React from 'react';
import { TrashIcon } from '@heroicons/react/outline';

function groupFoodItemsByDate(foodItems) {
  return foodItems.reduce((groupedItems, item) => {
    const date = item.timestamp.split(' ')[0]; // Extracting the date from the timestamp
    if (!groupedItems[date]) {
      groupedItems[date] = [];
    }
    groupedItems[date].push(item);
    return groupedItems;
  }, {});
}

function FoodListForDay({ foodItems, onDelete }) {
  const groupedItems = groupFoodItemsByDate(foodItems);

  return (
    <div>
      {Object.keys(groupedItems).map((date) => (
        <div className="listing-details" key={date}>
          <h3>{date}</h3>
          {groupedItems[date].map((item) => (
            <p key={item.id}>
              {item.name} - {item.quantity && <span>{item.quantity}stk</span>} {item.volume && <span>{item.volume}dl</span>}{' '}
              {item.weight && <span>{item.weight}g</span>}{' '}
              <span className="cursor-pointer ml-2" onClick={() => onDelete(item.id)}>
                <TrashIcon height={15} color={'red'} />
              </span>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default FoodListForDay;
