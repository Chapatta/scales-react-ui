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

  for (let iFret = 0; iFret < maxFret; iFret++) {
    const tmpFret: Fret = { position: 0, finger: 0 ,note:"A"} ;
    frets.push(tmpFret);
  }

  /*
  for (var violinString = 0; violinString < 8; violinString++) 
  {
    let string = strings.A
    for (var fret = 0; fret < maxFret; fret++) 
    {
                    
    }
  }

  const currentScale = DataLayer.GetScale(scaleID);
*/
//  const CurrentScaleNotes = UT.GetScaleNotes(currentScale.Notes);
  
  //DV.ShowFingerBlocks(currentScale);

  /*
  Vilin should hold all the frets nd then cgo through them and change them then React will decide if it needs to update
  */
/*
  let fingerPosition;
  const fingerPositions = DataLayer.GetFingerPositions(currentScale.Scale,currentScale.Octaves);

  let currentViolinPos = {string: "", position : ""}
  
  const startingNote = scale.StartingNote
  let octaveStartIndex;
  for (var i = 0; i < fingerPositions.length; i++) 
  {
      fingerPosition = fingerPositions[i];

      if (fingerPosition.Note == startingNote )
      {
          octaveStartIndex = i;
      }
      
      ViolinAddNote(violin,fingerPosition,currentViolinPos)
  }

  const maxFret = DataLayer.GetMaxFret();
  const FretsGAsc : Fret[] = [];
  const FretsDAsc : Fret[] = [];
  const FretsAAsc : Fret[] = [];
  const FretsEAsc : Fret[] = [];
  const FretsGDesc : Fret[] = [];
  const FretsDDesc : Fret[] = [];
  const FretsADesc : Fret[] = [];
  const FretsEDesc : Fret[] = [];
*/

  return (
    <div id="Violin">
        <div id="Violin-Asc">Asc</div>
        {frets.map((fret) => (
          // Using a unique key for each element is critical
          <ViolinFret fret={fret}/>
        ))}
        {/* <div className="row">
            <div id="StringHeader">E</div>
            <ViolinString name="E" direction={StringDirection.Asc}  frets={FretsEAsc} />
        </div>
        <div className="row">
            <div id="StringHeader">A</div>
            <ViolinString name="A" direction={StringDirection.Asc}  frets={FretsAAsc} />
        </div>
        <div className="row">
            <div id="StringHeader">D</div>
            <ViolinString name="D" direction={StringDirection.Asc}  frets={FretsDAsc} />
        </div>
        <div className="row">
            <div id="StringHeader">G</div>
            <ViolinString name="G" direction={StringDirection.Asc}  frets={FretsGAsc} />
        </div>

        <div id="ViolinSpacer"/>
        <div className="row">
            <div id="StringHeader">E</div>
            <ViolinString name="E" direction={StringDirection.Desc}  frets={FretsEDesc} />
        </div>
        <div className="row">
            <div id="StringHeader">A</div>
            <ViolinString name="A" direction={StringDirection.Desc}  frets={FretsADesc} />
        </div>
        <div className="row">
            <div id="StringHeader">D</div>
            <ViolinString name="D" direction={StringDirection.Desc}  frets={FretsDDesc} />
        </div>
        <div className="row">
            <div id="StringHeader">G</div>
            <ViolinString name="G" direction={StringDirection.Desc}  frets={FretsGDesc} />
        </div> */}
    
    </div>
  );
};

export default Violin;