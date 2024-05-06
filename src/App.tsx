import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import './CSS/styles.css'
import KeysDropDown from './Components/UI/KeysDropDown'
import ScaleTypesDropDown from './Components/UI/ScaleTypesDropDown'
import ScalesDropDown from './Components/UI/ScalesDropDown'
import Label from './Components/UI/Label'
import Violin from './Components/UI/Violin'
//import { GetFingerPositions } from './DataLayer/Test/TestCalls'
import * as DAL from './DataLayer/Test/TestCalls'
import * as IFingerPos from '../Interfaces/IFingerPositions'
// import DropdownExample from './Code Snippets/ChatGPTDropDownFunctionalComponent'

function App() {
//  const [count, setCount] = useState(0)
const [scaleTypeDropdownValue, setScaleTypeDropdownValue] = useState(0);
const [scaleDropdownValue, setScaleDropdownValue] = useState(0);
const [scaleDropdownText, setScaleDropdownText] = useState('');

  // const [cellData, setCellData] = useState(
  //   Array.from({ length: rows }, () => Array(columns).fill(''))
  // );

  const initialData = [
    ["John Doe", 28, "Engineer"],
    ["Jane Smith", 34, "Designer"],
    ["Bob Johnson", 45, "Manager"],
  ];

  /*
  {
    position: number;
    finger: number;
    note: string;
}
*/
  const initialViolinData = [
    [
      {
        position: 0,
        finger: 0,
        note: 'D'
      },
      {
        position: 1,
        finger: 1,
        note: 'D1'
      },
      {
        position: 2,
        finger: 2,
        note: 'D2'
      }
    ],
    [
      {
        position: 0,
        finger: 0,
        note: 'G'
      },
      {
        position: 1,
        finger: 1,
        note: 'G1'
      },
      {
        position: 2,
        finger: 2,
        note: 'G2'
      }
    ]
  ];

  const [tableData, setTableData] = useState(initialData);
  const [violinData, setViolinData] = useState<IFingerPos[][]>([]);

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

  const initialViolinData = getScale(scaleID,currentScale.Octaves);

  displayViolinData(initialViolinData);

  setViolinData(initialViolinData)
};

const getScale = (scaleID: number,octaves: number) =>
{
  const rows = 8;
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
  console.log(`scaleID ${scaleID} octaves ${octaves}`);
    
  if (scaleID != 0)
  {
    // 18
    const fingerPositions = DAL.GetFingerPositions(scaleID,octaves);
    //String":"E","Fret":6,"Direction":"Asc",
    //console.log(`fingerPositions ${fingerPositions}`);

    fingerPositions.forEach((fingerPosition) => {
      updateCell(twoDimArray,fingerPosition)
      //console.log(`Index ${index}: ${value}`);
    });
  }
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
  let ascIndex = 0; 
  switch (fingerPosition.String) {
    case "E":
      ascIndex = 7;
      //console.log("Start of the work week!");
      break;
    case "A":
      ascIndex = 6;
      //console.log("Start of the work week!");
      break;
    case "D":
      ascIndex = 5;
      //console.log("Start of the work week!");
      break;
    case "G":
      ascIndex = 4;
    //console.log("Start of the work week!");
      break;
    default:
      console.log("Invalid String.");
      break;
  }
  if (fingerPosition.Direction == 'Desc') 
  {
    ascIndex = ascIndex - 4;
  }
  return ascIndex;
}


//        ? row.map((cell, cIdx) => (cIdx === colIndex ? newValue : cell))


// const updateCell = (rowIndex, colIndex, newValue) => {
//   setTableData((prevData) =>
//     prevData.map((row, rIdx) =>
//       rIdx === rowIndex
//         ? row.map((cell, cIdx) => (cIdx === colIndex ? newValue : cell))
//         : row
//     )
//   );
// };

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
{/* The table is rendered using nested map functions. The outer map iterates over the rows, and the inner map iterates over the cells in each row. */}
<table>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>
                <input
                  type={colIndex === 1 ? "number" : "text"}
                  value={cell}
                  // onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                />
              </td>
            ))}
          </tr>
        ))}
</table>

<div>
  {violinData.map((row, rowIndex) => (
          <div key={rowIndex} className="container">
            {row.map((cell, colIndex) => (
            <div key={colIndex}>
              <div>
                {cell.Finger ? cell.Finger : "\u00a0"} 
              </div>
              <div>
                {cell.Position ? cell.Position : "\u00a0"} 
              </div>
              <div>
                {cell.Note ? cell.Note : "\u00a0"} 
              </div>
              </div>
            ))}
          </div>
        ))}
</div>

        {/* <Violin scaleID={0} /> */}

        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
