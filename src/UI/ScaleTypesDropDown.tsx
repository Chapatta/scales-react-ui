// Old java script
// function SetupScaleTypesDropdown()
// {
//     const dropdown = document.getElementById('ScaleType-dropdown');
//     dropdown.length = 0;
    
//     const defaultOption = document.createElement('option');
//     defaultOption.text = 'Choose Scale type';
    
//     dropdown.add(defaultOption);
//     dropdown.selectedIndex = 0;
    
//     let option,scaleType;

//     var scaleTypes = DAL.GetScaleTypes();
//     for (var i = 0; i < scaleTypes.length; i++) 
//     {
//       option = document.createElement('option');
//       scaleType = scaleTypes[i];
//       option.text = scaleType.Name;
//       option.value = scaleType.ID;
//       dropdown.add(option);
//     }

//     dropdown.addEventListener('change', OnScaleTypes_Change);
// }

//React


import React, { useState } from 'react';
// import KeysDropDown from './DataLayer/APICalls'

import * as DataLayer from '../DataLayer/Test/TestCalls';
//import { Key } from '../DataLayer/TestCalls';
// import { getKeys } from '../DataLayer/TestCalls';
// import KeysDropDown from './DataLayer/TestCalls'

interface DropdownProps {
  //keys: Keys.Key[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onSelect }) => {
  let scaleTypes = DataLayer.GetScaleTypes();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <select id="ScaleType-dropdown" value={selectedOption} onChange={handleOptionChange}>
      <option value="">Select an option</option>
      {scaleTypes.map((scaleType) => (
        <option key={scaleType.ID} value={scaleType.Name}>
          {scaleType.Name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
