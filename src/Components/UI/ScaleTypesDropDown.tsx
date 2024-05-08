import React, { useState } from 'react';
// import KeysDropDown from './DataLayer/APICalls'

import * as DAL from '../../DataLayer/Test/TestCalls';
//import { Key } from '../DataLayer/TestCalls';
// import { getKeys } from '../DataLayer/TestCalls';
// import KeysDropDown from './DataLayer/TestCalls'

interface DropdownProps {
  //keys: Keys.Key[];
  onSelect: (value: string) => void;
}

const Dropdown = ({ onSelect}: DropdownProps) => {
  const scaleTypes = DAL.GetScaleTypes();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <select id="ScaleType-dropdown" value={selectedOption} onChange={handleOptionChange}>
      <option value="">Select an option</option>
      {scaleTypes.map((scaleType,index) => (
        <option key={index} value={scaleType.ID}>
          {scaleType.Name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
