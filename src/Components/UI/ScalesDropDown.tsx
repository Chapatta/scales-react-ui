import React, { useState , useEffect} from 'react';
import * as IScaleSource from '../../DataLayer/Interfaces/IScales';
import * as useApi from '../../Services/API/APIPromise'; 
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

  const URL : string = config.apiUrl + '/Scales' ; 
  let URLParameters : string = '';
  if (props.scalesFilter.Value == '' )
  {
    URLParameters = 'ScaleType/-1';
  }
  else if (props.scalesFilter.Type == IScaleSource.ScaleFilterType.ScaleType){
    URLParameters = 'ScaleType/' + props.scalesFilter.Value;
  }
  else{
    URLParameters = 'Key/' + props.scalesFilter.Value;
  }

  URLParameters = URLParameters.replace(/#/g, encodeURIComponent("#"));

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    props.onSelect(selectedValue);
  };

  const [scales, setScales] = useState<IScaleSource.default[]>([]);

  useEffect(() => {
    // Fetch posts when component mounts
    const client = new useApi.HTTPClient(URL);
    const fetchScales = async () => {
      try {
        const fetchedScales = await client.get<IScaleSource.default[]>(URLParameters);
        setScales(fetchedScales);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchScales();

    // Cleanup function (optional)
    return () => {
      // Cleanup logic (if any)
    };
  }, [URL, URLParameters]); // Empty dependency array ensures the effect runs only once on mount

  return (
    <select id="Scale-dropdown" value={selectedOption} onChange={handleOptionChange}>
      <option value="">Select an option</option>
      {scales.map((scale,index) => (
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
