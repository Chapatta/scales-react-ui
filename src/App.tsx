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
    {
      position: 0,
      finger: 0,
      note: 'G'
    },
    {
      position: 0,
      finger: 1,
      note: 'D'
    }
  ];

  const [tableData, setTableData] = useState(initialData);
  const [violinData, setViolinData] = useState(initialViolinData);

  // const [cellData, setCellData] = useState(
  //   Array.from({ length: rows }, () => Array(columns).fill(''))
  // );


const handleScaleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedOption = event.target.value;
  setScaleDropdownValue(parseInt(selectedOption));

  // Find the selected option element and extract its text
  const selectedOptionText = event.target.selectedOptions[0].text;
  setScaleDropdownText(selectedOptionText);
};

const updateCell = (rowIndex, colIndex, newValue) => {
  setTableData((prevData) =>
    prevData.map((row, rIdx) =>
      rIdx === rowIndex
        ? row.map((cell, cIdx) => (cIdx === colIndex ? newValue : cell))
        : row
    )
  );
};

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
          <div key={rowIndex}>
            <div>
              {row.finger}
            </div>
            <div>
              {row.position}
            </div>
            <div>
              {row.note}
            </div>
            {/* {row.map((cell, colIndex) => (
              <td key={colIndex}>
                <input
                  type={colIndex === 1 ? "number" : "text"}
                  value={cell}
                  // onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                />
              </td>
            ))} */}
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
