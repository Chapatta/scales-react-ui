import React, { useState } from 'react';
// import * as DAL from '../../DataLayer/Test/TestCalls';
import * as useApi from '../../APITool'; 
import IScaleType from '../../DataLayer/Interfaces/IScaleTypes';
import config from '../../Config';

console.log(config.apiUrl); //
interface DropdownProps {
  //keys: Keys.Key[];
  onSelect: (value: string) => void;
}

const Dropdown = ({ onSelect}: DropdownProps) => {
  // const scaleTypes = DAL.GetScaleTypes();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const response : useApi.ApiResult<IScaleType> = useApi.default<IScaleType>(config.apiUrl + '/ScaleTypes');

  if (response.loading) {
    return <div>Loading...</div>;
  }

  if (response.error) {
    return <div>Error: {response.error}</div>;
  }

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

response.data.map((scaleType,index) => (
    console.log('Index :', index,'ID :', scaleType.id, 'Name :', scaleType.Name)));


  return (
    <select id="ScaleType-dropdown" value={selectedOption} onChange={handleOptionChange}>
      <option value="">Select an option</option>
      {response.data.map((scaleType,index) => (
        <option key={index} value={scaleType.Id}>
          {scaleType.Name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
