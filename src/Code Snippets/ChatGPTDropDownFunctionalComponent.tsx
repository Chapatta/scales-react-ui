import React, { useState } from 'react';

interface Option {
  label: string;
  value: string;
}

//Here's what's changed:

//We've used the React.FC type to define the functional component DropdownExample.
//The handleOptionChange function is now directly receiving a ChangeEvent from the select element, so we don't need to access e.target.value directly.
//We've provided type annotations for e parameter in the handleOptionChange function.
//The rest of the component remains the same.

const DropdownExample: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options: Option[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <h2>Dropdown Example</h2>
      <select value={selectedOption || ''} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <p>Selected Option: {selectedOption}</p>
    </div>
  );
}

export default DropdownExample;


