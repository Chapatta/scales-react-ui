import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import KeysDropDown from './UI/KeysDropDown'
import ScaleTypesDropDown from './UI/ScaleTypesDropDown'
import ScalesDropDown from './UI/ScalesDropDown'
import Label from './UI/Label'
// import DropdownExample from './Code Snippets/ChatGPTDropDownFunctionalComponent'

function App() {
//  const [count, setCount] = useState(0)
const [scaleTypeDropdownValue, setScaleTypeDropdownValue] = useState(0);
const [scaleDropdownValue, setScaleDropdownValue] = useState(0);
const [scaleDropdownText, setScaleDropdownText] = useState('');

const handleScaleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedOption = event.target.value;
  setScaleDropdownValue(parseInt(selectedOption));

  // Find the selected option element and extract its text
  const selectedOptionText = event.target.selectedOptions[0].text;
  setScaleDropdownText(selectedOptionText);
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
                          <Label id="ScaleName-label" caption = "Scale Name" text={scaleDropdownText}></Label>
                            {/* <td>Scale Name:</td><td></td><td><label id="ScaleName-label"></label></td> */}
                        </tr>
                        <tr>
                            <td>Key Signature:</td><td></td><td><label id="KeySignature-label"></label></td>
                        </tr>
                        <tr>
                            <td>Notes:</td><td></td><td><label id="Notes-label"></label></td>
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
