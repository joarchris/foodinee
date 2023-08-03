// FoodListForDay.js
import React from 'react';
import { TrashIcon } from '@heroicons/react/outline';

function groupFoodItemsByDate(foodItems) {
  return foodItems.reduce((groupedItems, item) => {
    const date = item.timestamp.split(' ')[0]; // Extracting the date from the timestamp
    console.log('date:', date);
    if (!groupedItems[date]) {
      groupedItems[date] = [];
    }
    groupedItems[date].push(item);
    return groupedItems;
  }, {});
}
function FoodListForDay({ foodItems, onDelete }) {
  const groupedItems = groupFoodItemsByDate(foodItems);
  console.log('grouped items:', groupedItems);

  // Sort the keys (dates) in reverse order to display the newest item at the top
  const sortedDates = Object.keys(groupedItems)
    .sort((a, b) => new Date(b) - new Date(a))
    .reverse();
  console.log('sorted dates:', sortedDates);
  return (
    <div>
      {sortedDates
        .reverse()
        // Reverse the sortedDates array to have newest date groups on top
        .map((date) => (
          <div className="listing-details" key={date}>
            <h3>{date}</h3>
            {groupedItems[date]
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .reverse()
              .map((item) => (
                <p key={item.id}>
                  {item.name} - {item.quantity && <span>{item.quantity}stk</span>}{' '}
                  {item.volume && <span>{item.volume}dl</span>} {item.weight && <span>{item.weight}g</span>}{' '}
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
