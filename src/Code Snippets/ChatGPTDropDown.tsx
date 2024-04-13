//TSX typescript version
import React, { useState } from 'react';

interface Option {
  label: string;
  value: string;
}

function DropdownExample() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options: Option[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div>
      <h2>Dropdown Example</h2>
      <select value={selectedOption || ''} onChange={(e) => handleOptionChange(e.target.value)}>
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