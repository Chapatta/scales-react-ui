import React, { useState, useEffect } from 'react';
// import * as DAL from '../../DataLayer/Test/TestCalls';
//import * as useApi from '../../Services/API/APITool'; 
import * as useApi from '../../Services/API/APIPromise'; 
import IScaleType from '../../DataLayer/Interfaces/IScaleTypes';
import config from '../../Config';

interface DropdownProps {
  //keys: Keys.Key[];
  onSelect: (value: string) => void;
}

const Dropdown = ({ onSelect}: DropdownProps) => {
  // const scaleTypes = DAL.GetScaleTypes();
  const [selectedOption, setSelectedOption] = useState<string>('');
  // const response : useApi.ApiResult<IScaleType> = useApi.default<IScaleType>(config.apiUrl + '/ScaleTypes');
  // if (response.loading) {
  //   return <div>Loading...</div>;
  // }

  // if (response.error) {
  //   return <div>Error: {response.error}</div>;
  // }

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  const client = new useApi.HTTPClient(config.apiUrl);

  // Make a GET request to fetch a list of users
  //Leave this useful
  // response.data.map((scaleType,index) => (
  //     console.log('Index :', index,'Id :', scaleType.Id, 'Name :', scaleType.Name)));
  const [scaleTypes, setscaleTypes] = useState<IScaleType[]>([]);

  useEffect(() => {
    // Fetch posts when component mounts
    const fetchScaleTypes = async () => {
      try {
        const fetchedScaleTypes = await client.get<IScaleType[]>('ScaleTypes');
        setscaleTypes(fetchedScaleTypes);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchScaleTypes();

    // Cleanup function (optional)
    return () => {
      // Cleanup logic (if any)
    };
  }, [client]); // Empty dependency array ensures the effect runs only once on mount

  return (
    <select id="ScaleType-dropdown" value={selectedOption} onChange={handleOptionChange}>
      <option value="">Select an option</option>
      {scaleTypes.map((scaleType,index) => (
        <option key={index} value={scaleType.Id}>
          {scaleType.Name}
        </option>
      ))}
    </select>
  );

};

export default Dropdown;
