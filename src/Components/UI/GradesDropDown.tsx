import React, { useState} from 'react';
interface DropdownProps {
  //keys: Keys.Key[];
  onSelect: (value: string) => void;
}

//const Label = ({ id,caption,text}: LabelProps) => (

const Dropdown = (props: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    props.onSelect(selectedValue);
  };

  const grades = [{grade: 1 },{grade: 2 },{grade: 3 },{grade: 4 },{grade: 5 },{grade: 6 },{grade: 7 },{grade: 8 }];

  return (
    <select id="Grade-dropdown" value={selectedOption} onChange={handleOptionChange}>
      <option value="">Select an option</option>
      {grades.map((grade, index) => (
        <option key={index} value={grade.grade}>
          {grade.grade}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;