import React, { useState } from 'react';
import * as IScaleSource from '../../DataLayer/Interfaces/IScales';
import * as useApi from '../../Services/API/APITool'; 
import config from '../../Config'; 

enum ScaleType {
    Major = 1,
    MinorHarmonic = 2,
    MinorMelodic = 3,
    MajorArpeggio = 4,
    MinorArpeggio = 5,
    Dominant7th = 6,
    Diminished7th = 7
  }

//interface Scale { ID: number; Scale: number; ScaleType: number; Octaves: number; StartingNote: string; Name: string; Notes: string; KeyNotes: string; }
interface DropdownProps {
  //scales: IScaleSource[];
  scalesFilter : IScaleSource.IScaleFilter
  onSelect: (value: string) => void;
}

const Dropdown = (props: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  let URL : string = config.apiUrl + '/Scales/' ; 
  if (props.scalesFilter.Value == '' )
  {
    URL = URL + 'ScaleType/-1';
  }
  else if (props.scalesFilter.Type == IScaleSource.ScaleFilterType.ScaleType){
    URL = URL + 'ScaleType/' + props.scalesFilter.Value;
  }
  else{
    URL = URL + 'Key/' + props.scalesFilter.Value;
  }

  const response : useApi.ApiResult<IScaleSource.default> = useApi.default<IScaleSource.default>(URL);
  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    props.onSelect(selectedValue);
  };

  // if (scalesResponse === undefined)
  // {
  //   return (
  //     <select id="ScaleType-dropdown" value={selectedOption} onChange={handleOptionChange}>
  //       <option value="">Select an option</option>
  //     </select>
  //   );
  // }

  if (response.loading) {
    return <div>Loading...</div>;
  }

  if (response.error) {
    return <div>Error: {response.error}</div>;
  }    

  return (
    <select id="Scale-dropdown" value={selectedOption} onChange={handleOptionChange}>
      <option value="">Select an option</option>
      {response.data.map((scale,index) => (
        <option key={index} value={scale.Id}>
          {GetScaleName(scale)}
        </option>
      ))}
    </select>
  );
};

function GetScaleName(Scale: IScaleSource.default)
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
