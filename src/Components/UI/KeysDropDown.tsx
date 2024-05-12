import React, { useState } from 'react';
import * as useApi from '../../APITool'; 
import IKey from '../../DataLayer/Interfaces/IKeys';
import config from '../../Config';
interface DropdownProps {
  //keys: Keys.Key[];
  onSelect: (value: string) => void;
}

//const Label = ({ id,caption,text}: LabelProps) => (

const Dropdown = ({ onSelect }: DropdownProps) => {
  const response : useApi.ApiResult<IKey> = useApi.default<IKey>(config.apiUrl + '/Keys');
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <select id="Key-dropdown" value={selectedOption} onChange={handleOptionChange}>
      <option value="">Select an option</option>
      {response.data.map((key, index) => (
        <option key={index} value={key.KeyNotes}>
          {key.KeyNotes}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
