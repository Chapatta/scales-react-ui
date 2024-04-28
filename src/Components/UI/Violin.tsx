import React, { useState } from 'react';
import StringDirection from '../StringDirection'; // Import the default export

import * as DataLayer from '../../DataLayer/Test/TestCalls';
import ViolinFret from './ViolinFret'
//import * as VString from '../Classes/VString'; // Import the default export
import ViolinString from './ViolinString'
import Fret from '../Classes/ViolinFret'

import * as UT from './Util.js'

interface ViolinProps {
  //keys: Keys.Key[];
  scaleID: number
//   onSelect: (value: string) => void;
}

//const ViolinFret = ({fret}: ViolinFretProps) => (

//const Violin: React.FC<ViolinProps> = ({ scaleID }) => {
const Violin = ({ scaleID } : ViolinProps) => {
        const maxFret = DataLayer.GetMaxFret();
  let strings = [];

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  //const frets = [];
  const frets: Fret[] = [];

  const rows = 8;
  const columns = 10;
  
  // Create a state variable to hold the content of each cell

  for (let iFret = 0; iFret < maxFret; iFret++) {
    const tmpFret: Fret = { position: 0, finger: 0 ,note:"A"} ;
    frets.push(tmpFret);
  }

  // const updatedData = [...cellData];
  // updatedData[1][1] = '"Hello"';
  // setCellData(updatedData);



  // let fingerPosition;
  // const fingerPositions = DataLayer.GetFingerPositions(currentScale.Scale,currentScale.Octaves);

  // let currentViolinPos = {string: "", position : ""}
  
  // const startingNote = scale.StartingNote
  // let octaveStartIndex;
  // for (var i = 0; i < fingerPositions.length; i++) 
  // {
  //     fingerPosition = fingerPositions[i];

  //     if (fingerPosition.Note == startingNote )
  //     {
  //         octaveStartIndex = i;
  //     }
      
  //     ViolinAddNote(violin,fingerPosition,currentViolinPos)
  // }

  return (
    <div id="Violin">
        <div id="Violin-Asc">Asc</div>
          {cellData.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((cell, colIndex) => (
                <div key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    // onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  />
                </div>
              ))}
            </div>
          ))
          }
    </div>
  );
};

export default Violin;