import React, { useState } from 'react';

import * as DataLayer from '../DataLayer/Test/TestCalls';
import ViolinFret from './ViolinFret'

interface ViolinProps {
  //keys: Keys.Key[];
  scaleID: number
//   onSelect: (value: string) => void;
}

const Violin: React.FC<ViolinProps> = ({ scaleID }) => {
  const maxFret = DataLayer.GetMaxFret();
  const violinFrets = [];

  for (let i = 0; i < maxFret; i++) {
    // itemElements.push(<li key={i}>{items[i]}</li>);
    violinFrets.push(<ViolinFret position={0} finger={0} note="E" />);
  }

  return (
    <div id="Violin">
        <div id="Violin-Asc">Asc</div>
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
        </div>
    </div>
  );
};

export default Violin;