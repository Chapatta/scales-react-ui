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
//import * as IFingerPos from './Datalayer/Interfaces/IFingerPositions'
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
      <div>
        <table>
            <tr>
                <td>
                    <table id="Key">
                        <tr>
                            <td>Key:</td><td className="VertSpacer"></td><td>
                            <KeysDropDown
                              onSelect={(selectedValue) => console.log('Selected value:', selectedValue)}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td><td></td><td></td>
                        </tr>                                    
                    </table>
                </td>
                <td className="VertSpacer" />
                <td>
                    <table>
                        <tr>
                            <td>Scale Type:</td><td className="VertSpacer"></td><td>
                            <ScaleTypesDropDown
                              onSelect={(selectedValue) => {console.log('Selected value:', selectedValue), setScaleTypeDropdownValue(parseInt(selectedValue,10))}}
                            />                              
                            </td>
                        </tr>
                        <tr>
                            <td>Scales:</td><td></td><td>
                              <ScalesDropDown
                                scaleType = {scaleTypeDropdownValue}
                                // onSelect={(selectedValue) => {console.log('Selected value:', selectedValue); setScaleDropdownValue;}}
                                onSelect={handleScaleDropdownChange}
                                
                              />   
                            </td>
                        </tr>
                        <tr>
                          <td>Scale Name:</td><td></td>
                          <Label id="ScaleName-label" text={scaleDropdownText}></Label>
                        </tr>
                        <tr>
                          <td>Key Signature:</td><td></td><td>
                          <label id="KeySignature-label"></label></td>
                        </tr>
                        <tr>
                          <td>Notes:</td><td></td>
                          <td><label id="Notes-label"></label></td>
                        </tr>                                    
                    </table>
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <td>Lock Violin<input type="checkbox" id="LockViolin"/></td>
                <td><button id="Export-button">Export</button></td>
                <td><button id="CopyAsc-button">Copy Ascending</button></td>
            </tr>
        </table>
<div id="Violin">
    <ViolinNeck violinData={violinDataAsc} />
    <ViolinNeck violinData={violinDataDesc} />
</div>


      </div>

    </>
  )
}

export default App
