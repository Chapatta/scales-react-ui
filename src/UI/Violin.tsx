import React, { useState } from 'react';

import * as DataLayer from '../DataLayer/Test/TestCalls';

interface ViolinProps {
  //keys: Keys.Key[];
  scaleID: number
//   onSelect: (value: string) => void;
}

const Violin: React.FC<ViolinProps> = ({ scaleID }) => {
  const scale = DataLayer.GetScale(scaleID);
//   const [selectedOption, setSelectedOption] = useState<string>('');

//   const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedValue = e.target.value;
//     setSelectedOption(selectedValue);
//     onSelect(selectedValue);
//   };

  return (
    <table id="Violin">
        <tr id="Violin-Asc"><td>Asc</td></tr>

        <tr className="position"><td rowSpan={3}>E</td></tr><tr className="finger"></tr><tr className="note"></tr>
        <tr className="position"><td rowSpan={3}>A</td></tr><tr className="finger"></tr><tr className="note"></tr>
        <tr className="position"><td rowSpan={3}>D</td></tr><tr className="finger"></tr><tr className="note"></tr>
        <tr className="position"><td rowSpan={3}>G</td></tr><tr className="finger"></tr><tr className="note"></tr>

        <tr id="ViolinSpacer"></tr>

        <tr id="Violin-Desc"><td>Desc</td></tr>

        <tr className="position"><td rowSpan={3}>E</td></tr><tr className="finger"></tr><tr className="note"></tr>
        <tr className="position"><td rowSpan={3}>A</td></tr><tr className="finger"></tr><tr className="note"></tr>
        <tr className="position"><td rowSpan={3}>D</td></tr><tr className="finger"></tr><tr className="note"></tr>
        <tr className="position"><td rowSpan={3}>G</td></tr><tr className="finger"></tr><tr className="note"></tr>
    </table>
  );
};

export default Violin;