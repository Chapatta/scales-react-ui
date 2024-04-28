import React, { useState } from 'react';
import StringDirection from '../StringDirection'; // Import the default export

import * as DataLayer from '../../DataLayer/Test/TestCalls';
import ViolinFret from './ViolinFret'
//import * as VString from '../Classes/VString'; // Import the default export
import ViolinString from './ViolinString'

interface ViolinProps {
  //keys: Keys.Key[];
  scaleID: number
//   onSelect: (value: string) => void;
}

const Violin: React.FC<ViolinProps> = ({ scaleID }) => {
  const maxFret = DataLayer.GetMaxFret();
  const FretsGAsc = [];
  const FretsDAsc = [];
  const FretsAAsc = [];
  const FretsEAsc = [];
  const FretsGDesc = [];
  const FretsDDesc = [];
  const FretsADesc = [];
  const FretsEDesc = [];

  //GDAE
//   const violinStrings: { [key: string]: VString.default } = {
//   "G Asc": {  name: "G", direction: VString.StringDirection.Asc, frets: []},
//   "D Asc": {  name: "G", direction: VString.StringDirection.Asc, frets: []},
//   "A Asc": {  name: "G", direction: VString.StringDirection.Asc, frets: []},
//   "E Asc": {  name: "G", direction: VString.StringDirection.Asc, frets: []},
//   "G Desc": {  name: "G", direction: VString.StringDirection.Desc, frets: []},
//   "D Desc": {  name: "G", direction: VString.StringDirection.Desc, frets: []},
//   "A Desc": {  name: "G", direction: VString.StringDirection.Desc, frets: []},
//   "E Desc": {  name: "G", direction: VString.StringDirection.Desc, frets: []}
//   };

//const violinString = {  name: "G", direction: VString.StringDirection.Asc, frets: []}
//   for (let string = 0; string < maxFret; string++) {
//     for (let fret = 0; fret < maxFret; fret++) {
//     // itemElements.push(<li key={i}>{items[i]}</li>);
//     violinFrets.push(<ViolinFret position={0} finger={0} note="E" />);
//     }
//   }

  return (
    <div id="Violin">
        <div id="Violin-Asc">Asc</div>
        <div className="row">
            <div id="StringHeader">E</div>
            <ViolinString name="G" direction={StringDirection.Asc}  frets={[]} />
        </div>

        {/* <div className="row">
            <div id="StringHeader">E</div>
            {ViolinString(violinString)}
        </div> */}

        {/* <div className="row">
            <div id="StringHeader">A</div>
            {ViolinString(violinStrings["A Asc"])}
        </div> */}

        {/* <div className="row">
            <div id="StringHeader">D</div>
            {violinFrets}
        </div>

        <div className="row">
            <div id="StringHeader">G</div>
            {violinStrings}
        </div>

        <div id="ViolinSpacer"/>
    
        <div id="Violin-Desc">Desc</div>
        <div className="row">
            <div id="StringHeader">E</div>
            {violinFrets}
        </div>

        <div className="row">
            <div id="StringHeader">A</div>
            {violinFrets}
        </div>
        <div className="row">
            <div id="StringHeader">D</div>
            {violinFrets}
        </div>

        <div className="row">
            <div id="StringHeader">G</div>
            {violinFrets}
        </div> */}
    </div>
  );
};

export default Violin;