/*
In React, components are meant to render UI elements, and they typically don't return values directly in the same way a function does. 
However, you can pass data to components via props, and they can communicate with other parts of your application 
through various means such as callbacks or context.

The ChildComponent handles user input through an input field and a submit button.
When the submit button is clicked, it calls the handleSubmit function which, in turn, calls the onFormSubmit function passed down from the parent component along with the current input value.
The ParentComponent defines the handleFormSubmit function, which receives the submitted value and can do something with it, such as logging it or updating some state.
This way, the ChildComponent doesn't directly "return" a value, but it communicates the value back to its parent component via a callback function.
*/

import React, { useState } from 'react';

function ChildComponent(props) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    // Do something with the input value
    props.onFormSubmit(inputValue);
    // Clear the input field
    setInputValue('');
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

function ParentComponent() {
  const handleFormSubmit = (value) => {
    console.log('Submitted value:', value);
    // Do something with the submitted value
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <ChildComponent onFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default ParentComponent;
