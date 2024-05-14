import React, { useState, useEffect } from 'react';
// import * as DAL from '../../DataLayer/Test/TestCalls';
//import * as useApi from '../../Services/API/APITool'; 
import * as useApi from '../../Services/API/APIPromise'; 
import IScale from '../../DataLayer/Interfaces/IScales';
import config from '../../Config';

interface DropdownProps {
  //keys: Keys.Key[];
  scaleID: number;
  callBack: (scale: IScale) => void;
}

const ScaleDetails = ( props: DropdownProps) => {
  // const scaleTypes = DAL.GetScaleTypes();
  //const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    // Fetch posts when component mounts
    const client = new useApi.HTTPClient(config.apiUrl);
    const fetchScaleTypes = async () => {
      try {
        const fetchedScale = await client.get<IScale>('Scales?scaleID=' + props.scaleID);
        props.callBack(fetchedScale);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchScaleTypes();

    // Cleanup function (optional)
    return () => {
      // Cleanup logic (if any)
    };
  }, [props]); // Empty dependency array ensures the effect runs only once on mount

  //if you don't put anything into the div react is smart enough to realise that it doesn't need to refresh
  return (
    <div>{props.scaleID}</div>
  );

};

export default ScaleDetails;