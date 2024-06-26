// props to make it more reusable:
// We define an interface DropdownProps to represent the props that the Dropdown component accepts. 
// It includes an array of Option objects (options) and a function (onSelect) that will be called when an option is selected.
// Inside the Dropdown component, we use the useState hook to manage the state of the selected option.
// We define a handleOptionChange function to handle changes in the dropdown selection. This function updates the selected option in the component state and calls the onSelect function with the selected value.
// The component renders a <select> element with options generated dynamically from the options prop.
// When an option is selected, the onSelect function provided via props is called with the value of the selected option.

// You can use this Dropdown component in other parts of your application by passing the options array and an onSelect function as props. For example:
// <Dropdown
//   options={[
//     { label: 'Option 1', value: 'option1' },
//     { label: 'Option 2', value: 'option2' },
//     { label: 'Option 3', value: 'option3' }
//   ]}
//   onSelect={(selectedValue) => console.log('Selected value:', selectedValue)}
// />

import React, { useState } from 'react';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <select value={selectedOption} onChange={handleOptionChange}>
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
