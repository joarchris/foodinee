import { TrashIcon } from '@heroicons/react/outline';
import React from 'react';

function SortedFoodList({ foodItems, onDelete }) {
  // Group the food items by date
  const groupedItems = foodItems.reduce((groups, item) => {
    const dateKey = item.timestamp.split(',')[0]; // Extract date part
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(item);
    return groups;
  }, {});

  // Sort the groups by newest date
  const sortedGroups = Object.keys(groupedItems)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((dateKey) => ({
      dateKey,
      items: groupedItems[dateKey],
    }));

  return (
    <div>
      {sortedGroups.map((group) => (
        <div className="listing-details" key={group.dateKey}>
          <h2>{group.dateKey}</h2>
          <p>
            {group.items.map((item) => (
              <p key={item.id}>
                {item.name} - {item.quantity && <span>{item.quantity}stk</span>} {item.volume && <span>{item.volume}dl</span>}{' '}
                {item.weight && <span>{item.weight}g</span>}{' '}
                <span className="cursor-pointer ml-2" onClick={() => onDelete(item.id)}>
                  <TrashIcon height={15} color={'red'} />
                </span>
              </p>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SortedFoodList;
