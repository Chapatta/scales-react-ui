import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import './CSS/styles.css'
import KeysDropDown from './Components/UI/KeysDropDown'
import ScaleTypesDropDown from './Components/UI/ScaleTypesDropDown'
import ScalesDropDown from './Components/UI/ScalesDropDown'
import Label from './Components/UI/Label'
import ViolinNeck from './Components/UI/ViolinNeck'
//import { GetFingerPositions } from './DataLayer/Test/TestCalls'
import * as DAL from './DataLayer/Test/TestCalls'
import * as IFingerPos from './DataLayer/Interfaces/IFingerPositions'
// import DropdownExample from './Code Snippets/ChatGPTDropDownFunctionalComponent'

function App() {
//  const [count, setCount] = useState(0)
const [scaleTypeDropdownValue, setScaleTypeDropdownValue] = useState(0);
const [scaleDropdownValue, setScaleDropdownValue] = useState(0);
const [scaleDropdownText, setScaleDropdownText] = useState('');

  // const [cellData, setCellData] = useState(
  //   Array.from({ length: rows }, () => Array(columns).fill(''))
  // );

  // const [violinData, setViolinData] = useState<IFingerPos[][]>([]);
  const [violinDataAsc, setViolinDataAsc] = useState<IFingerPos[][]>([]);
  const [violinDataDesc, setViolinDataDesc] = useState<IFingerPos[][]>([]);

  // const [cellData, setCellData] = useState(
  //   Array.from({ length: rows }, () => Array(columns).fill(''))
  // );


const handleScaleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedOption = event.target.value;
  const scaleID = parseInt(selectedOption);
  console.log(`scaleID ${scaleID}`);

  setScaleDropdownValue(scaleID);

  const currentScale = DAL.GetScale(scaleID);

  // Find the selected option element and extract its text
  const selectedOptionText = event.target.selectedOptions[0].text;
  setScaleDropdownText(selectedOptionText);

  const fingerPositions = DAL.GetFingerPositions(scaleID,currentScale.Octaves);

  const fingerPositionsAsc = fingerPositions.filter(fingerPos => fingerPos.Direction = "Asc");
  const fingerPositionsDesc = fingerPositions.filter(fingerPos => fingerPos.Direction = "Desc")

  const violinDataAsc : IFingerPos[][] = getScale(fingerPositionsAsc);
  const violinDataDesc : IFingerPos[][]= getScale(fingerPositionsDesc);

  // displayViolinData(initialViolinData);

  setViolinDataAsc(violinDataAsc)
  setViolinDataDesc(violinDataDesc)
};

const getScale = (fingerPositions: IFingerPos.IFingerPositionSource[]) : IFingerPos[][] =>
{
  const rows = 4;
  const columns = 18;

  // Initialize the 2D array with a default object in each cell
  const twoDimArray : IFingerPos[][] = Array.from({ length: rows }, (_, rowIndex) =>
  Array.from({ length: columns }, (_, colIndex) => ({
    String: rowIndex,
    Fret: colIndex,
    Position: null,
    Finger: null,
    Note: null
      }))
    );
    
    fingerPositions.forEach((fingerPosition) => {
      updateCell(twoDimArray,fingerPosition)
      //console.log(`Index ${index}: ${value}`);
    });
  //  displayViolinData(twoDimArray);
  return twoDimArray;
}

const displayViolinData = (fingerPositions : IFingerPos[][]) => {
  // Use forEach to iterate through rows and columns
  fingerPositions.forEach((row, rowIndex) => {
    row.forEach((element, columnIndex) => {
      console.log(`Element at row ${rowIndex}, column ${columnIndex}: ${element.String} ${element.Fret} ${element.Position} ${element.Finger}  ${element.Note}`);
    });
  });
}

const updateCell = (fingerPositions : IFingerPos[][], fingerPosition: IFingerPos.IFingerPositionSource) => {
  const rowIndex = getStringIndex(fingerPosition);
  const colIndex = fingerPosition.Fret;
  fingerPositions.map((row, rIdx) => {
      if (rIdx === rowIndex) {  
        return row.map((cell, cIdx) => {
              if (cIdx === colIndex) {
                cell.Position = fingerPosition.Position;
                cell.Finger = fingerPosition.Finger;
                cell.Note = fingerPosition.Note;
                return cell;
              } else {
                return cell;
              } 
            });
      } else {
        return row;
      }
  });
}

const getStringIndex = (fingerPosition: IFingerPos) => {
  let stringIndex = 0; 
  switch (fingerPosition.String) {
    case "E":
      stringIndex = 0;
      //console.log("Start of the work week!");
      break;
    case "A":
      stringIndex = 1;
      //console.log("Start of the work week!");
      break;
    case "D":
      stringIndex = 2;
      //console.log("Start of the work week!");
      break;
    case "G":
      stringIndex = 3;
    //console.log("Start of the work week!");
      break;
    default:
      console.log("Invalid String.");
      break;
  }
  return stringIndex;
}

  return (
    <>
      <h1>Violin Scales</h1>
  <div className="scaleSelector">
    <div className="stackVertical">
      <div className='tableRow'>
        <div>Key:</div>
        <div className="VertSpacer"></div>
        <div><KeysDropDown onSelect={(selectedValue) => console.log('Selected value:', selectedValue)}></KeysDropDown></div>
      </div>
      <div className='tableRow'>
        <div>Scale Type:</div>
        <div className="VertSpacer"></div>
        <div><ScaleTypesDropDown onSelect={(selectedValue) => {console.log('Selected value:', selectedValue), setScaleTypeDropdownValue(parseInt(selectedValue,10))}}></ScaleTypesDropDown></div>
      </div>
    </div>
    <div className="stackVertical">
      <div className='tableRow'>
        <div>Scales:</div>
        <div className="VertSpacer"></div>
        <div><ScalesDropDown scaleType = {scaleTypeDropdownValue} onSelect={handleScaleDropdownChange}></ScalesDropDown></div>
        {/* onSelect={(selectedValue) => {console.log('Selected value:', selectedValue); setScaleDropdownValue;}} */}
      </div>
      <div className='tableRow'>
        <div>Scale Name:</div>
        <div className="VertSpacer"></div>
        <div id="ScaleName-label">{scaleDropdownText}</div>
      </div>
      <div className='tableRow'>
        <div>Key Signature:</div>
        <div className="VertSpacer"></div>
        <div id="KeySignature-label"></div>
      </div>
      <div className='tableRow'>
        <div>Notes:</div>
        <div className="VertSpacer"></div>
        <div id="Notes-label"></div>
      </div>
    </div>
  </div>
        <table>
            <tr>
                <td>Lock Violin<input type="checkbox" id="LockViolin"/></td>
                <td><button id="Export-button">Export</button></td>
                <td><button id="CopyAsc-button">Copy Ascending</button></td>
            </tr>
        </table>
<div id="Violin">
    <ViolinNeck violinData={violinDataAsc} />
    <div id ="ViolinSpacer"></div>
    <ViolinNeck violinData={violinDataDesc} />
</div>

    </>
  )
}

export default App
