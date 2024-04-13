/*
function PopulateScalesDropDown(scaleType)
{
    const dropdown = document.getElementById('Scales-dropdown');
    dropdown.length = 0;
    
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Choose Scale';
    
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    
    let option,scale;

    var scales = DAL.GetScales(scaleType)
    for (var i = 0; i < scales.length; i++) 
    {
        scale = scales[i];
        option = document.createElement('option');
        option.text = scale.StartingNote + " " + scale.Name  + " (" + scale.Octaves + ")";
        option.value = scale.ID;
        dropdown.add(option);      
    }
}
*/

/*
This is different to the static drop downs Keys and ScaleTypes as it changes depending on the e.g. value of ScaleTypes
*/

import React, { useState } from 'react';
// import KeysDropDown from './DataLayer/APICalls'

import * as DataLayer from '../DataLayer/Test/TestCalls';
//import { Key } from '../DataLayer/TestCalls';
// import { getKeys } from '../DataLayer/TestCalls';
// import KeysDropDown from './DataLayer/TestCalls'

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
  scaleType: number;
  onSelect: (value: string) => void;
}

/*
Using React.FC provides type safety and helps with auto-completion and documentation in TypeScript-based React projects. It's also a convention used by many developers when defining functional components in React with TypeScript.
*/
const Dropdown: React.FC<DropdownProps> = (props) => {
  const scales = DataLayer.GetScales(props.scaleType);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    props.onSelect(selectedValue);
  };

  return (
    <select id="ScaleType-dropdown" value={selectedOption} onChange={handleOptionChange}>
      <option value="">Select an option</option>
      {scales.map((scale,index) => (
        <option key={index} value={scale.ID}>
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
