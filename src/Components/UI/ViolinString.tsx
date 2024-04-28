//import VString from '../../Classes/VString'; // Import the default export
//import ViolinFret from './ViolinFret'
//import * as DataLayer from '../DataLayer/Test/TestCalls';
import React, { useEffect } from 'react';
import Fret from '../../Classes/Fret'; // Import the default export
import StringDirection from '../StringDirection'; // Import the default export

interface ViolinStringProps {
   name: string;
   direction: StringDirection;
   frets: Fret[];  //   onSelect: (value: string) => void;
  }

  const ViolinString: React.FC<ViolinStringProps> = ({name, direction, frets}) => {
    useEffect(() => {
      // `forEach` to perform side effects
      frets.forEach((fret ) => {
        console.log(`Fret: ${fret.toString()}`); // Log each user's name
      });
    }, []); // Empty dependency array ensures this effect runs once

    //const maxFret = DataLayer.GetMaxFret();

    return (
        <div className="row">
            <div id="StringHeader">{name}</div>
            {/* {violinString.frets.map((fret) => (
              <ViolinFret fret={fret}>
            ))} */}
            {/* {violinString.frets.map((fret) => (
              {ViolinFret(fret)}
              )
              )
            } */}
        </div>
    );
  };
  
  export default ViolinString;