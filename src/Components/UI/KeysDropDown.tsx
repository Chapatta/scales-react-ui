import React, { useState , useEffect} from 'react';
import * as useApi from '../../Services/API/APIPromise'; 
import IKey from '../../DataLayer/Interfaces/IKeys';
import config from '../../Config';
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

  const [keys, setKeys] = useState<IKey[]>([]);

  useEffect(() => {
    // Fetch posts when component mounts
    const client = new useApi.HTTPClient(config.apiUrl);
    const fetchScaleTypes = async () => {
      try {
        const fetchedKeys = await client.get<IKey[]>('Keys');
        setKeys(fetchedKeys);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchScaleTypes();

    // Cleanup function (optional)
    return () => {
      // Cleanup logic (if any)
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <select id="Key-dropdown" value={selectedOption} onChange={handleOptionChange}>
      <option value="">Select an option</option>
      {keys.map((key, index) => (
        <option key={index} value={key.KeyNotes}>
          {key.KeyNotes}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
