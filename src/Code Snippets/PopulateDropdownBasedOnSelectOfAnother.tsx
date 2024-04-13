import React, { useState } from 'react';

function DropdownExample() {
  const [firstDropdownValue, setFirstDropdownValue] = useState('');
  const [secondDropdownValue, setSecondDropdownValue] = useState('');
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);

  // Event handler for the first dropdown
  const handleFirstDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setFirstDropdownValue(selectedValue);

    // Set options for the second dropdown based on the selected value of the first dropdown
    if (selectedValue === 'option1') {
      setSecondDropdownOptions(['Option A', 'Option B', 'Option C']);
    } else if (selectedValue === 'option2') {
      setSecondDropdownOptions(['Option X', 'Option Y', 'Option Z']);
    } else {
      setSecondDropdownOptions([]); // Clear options if no selection
    }

    // Clear the value of the second dropdown when the first dropdown changes
    setSecondDropdownValue('');
  };

  // Event handler for the second dropdown
  const handleSecondDropdownChange = (event) => {
    setSecondDropdownValue(event.target.value);
  };

  return (
    <div>
      {/* First Dropdown */}
      <select value={firstDropdownValue} onChange={handleFirstDropdownChange}>
        <option value="">Select...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>

      {/* Separate Second Dropdown */}
      <select value={secondDropdownValue} onChange={handleSecondDropdownChange}>
        {/* Render options dynamically based on state */}
        {secondDropdownOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownExample;
