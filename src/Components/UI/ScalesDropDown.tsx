import React, { useState } from 'react';
import IScaleSource from '../../DataLayer/Interfaces/IScales';

enum ScaleType {
    Major = 1,
    MinorHarmonic = 2,
    MinorMelodic = 3,
    MajorArpeggio = 4,
    MinorArpeggio = 5,
    Dominant7th = 6,
    Diminished7th = 7
  }

interface Scale { ID: number; Scale: number; ScaleType: number; Octaves: number; StartingNote: string; Name: string; Notes: string; KeyNotes: string; }
interface DropdownProps {
  scales: IScaleSource[];
  // onSelect: (value: string) => void;
  onSelect:(event: React.ChangeEvent<HTMLSelectElement>) => void;
}

/*
Using React.FC provides type safety and helps with auto-completion and documentation in TypeScript-based React projects. It's also a convention used by many developers when defining functional components in React with TypeScript.
*/
const Dropdown = ({ scales ,onSelect}: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelect(e);
  };

  return (
    <select id="ScaleType-dropdown" value={selectedOption} onChange={handleOptionChange}>
      <option value="">Select an option</option>
      {scales.map((scale,index) => (
        <option key={index} value={scale.Id}>
          {GetScaleName(scale)}
        </option>
      ))}
    </select>
  );
};

function GetScaleName(Scale: Scale)
{
    let scaleName;
    switch (Scale.ScaleType)
    {
        case ScaleType.Dominant7th:
            scaleName = "Key of " + Scale.StartingNote + " " + Scale.Name + " " + Scale.Octaves + " octaves"
            break;
        case ScaleType.Diminished7th:
            scaleName = Scale.Name + " starting on " + Scale.StartingNote + " " + Scale.Octaves + " octaves"
            break;     
        default:
            scaleName = Scale.StartingNote + " " + Scale.Name + " " + Scale.Octaves + " octaves"
    }
    return scaleName;
}
export default Dropdown;
