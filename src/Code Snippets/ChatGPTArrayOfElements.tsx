import React from 'react';

const MyComponent = () => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  const itemElements = [];

  for (let i = 0; i < items.length; i++) {
    itemElements.push(<li key={i}>{items[i]}</li>);
  }

  return (
    <div>
      <h1>List of Items</h1>
      <ul>
        {itemElements}
      </ul>
    </div>
  );
};

export default MyComponent;