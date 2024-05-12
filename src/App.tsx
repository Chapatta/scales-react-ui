import { useState } from 'react'
import './App.css'
import KeysDropDown from './Components/UI/KeysDropDown'
import FretBar from './Components/UI/FretBar'
import StringCaptions from './Components/UI/StringCaptions'
import ScaleTypesDropDown from './Components/UI/ScaleTypesDropDown'
import ScalesDropDown from './Components/UI/ScalesDropDown'
import Label from './Components/UI/Label'
import ViolinNeck from './Components/UI/ViolinNeck'
import * as DAL from './DataLayer/Test/TestCalls'
import * as IFingerPos from './DataLayer/Interfaces/IFingerPositions'
import * as IScaleSource from './DataLayer/Interfaces/IScales'
import StringDirection from './Components/StringDirection'
// import IScaleType from '../../DataLayer/Interfaces/IScaleTypes';
import * as useApi from './Services/API/APITool'; 
import config from './Config';

function App() {

  const [scaleDropdownText, setScaleDropdownText] = useState('');

  // const [scalesTypeResponse, setScalesTypeResponse] = useState<useApi.ApiResult<IScaleType>>(useApi.default<IScaleType>(config.apiUrl + '/ScaleTypes'));

  //const [dropDownScales, setDropdownScales] = useState<IScaleSource[]>([]);
  const [scalesFilter, setDropdownScales] = useState<IScaleSource.IScaleFilter>({
    Type: IScaleSource.ScaleFilterType.ScaleType,
    Value: ''
  });

  const [violinDataAsc, setViolinDataAsc] = useState<IFingerPos.default[][]>(IFingerPos.emptyViolinNeck());
  const [violinDataDesc, setViolinDataDesc] = useState<IFingerPos.default[][]>(IFingerPos.emptyViolinNeck());

  const [scaleKeySignature, setScaleKeySignature] = useState('');
  const [scaleNotes, setScaleNotes] = useState('');

  const handleScaleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    const scaleID = parseInt(selectedOption);
    console.log(`scaleID ${scaleID}`);

    const currentScale : IScaleSource.default = DAL.GetScale(scaleID);

    // Find the selected option element and extract its text
    const selectedOptionText = event.target.selectedOptions[0].text;
    //setScalesTypeResponse(scalesTypeResponse);

    setScaleDropdownText(selectedOptionText);
    setScaleKeySignature(currentScale.KeyNotes);
    setScaleNotes(currentScale.Notes);

    const fingerPositions = DAL.GetFingerPositions(scaleID,currentScale.Octaves);

    const fingerPositionsAsc = fingerPositions.filter(fingerPos => fingerPos.Direction = StringDirection.Asc);
    const fingerPositionsDesc = fingerPositions.filter(fingerPos => fingerPos.Direction = StringDirection.Desc)

    const violinDataAsc : IFingerPos.default[][] = IFingerPos.getScale(fingerPositionsAsc);
    const violinDataDesc : IFingerPos.default[][]= IFingerPos.getScale(fingerPositionsDesc);

    // displayViolinData(initialViolinData);

    setViolinDataAsc(violinDataAsc)
    setViolinDataDesc(violinDataDesc)
  };

  return (
  <>
  {/* <h1>Violin Scales</h1> */}
  <div className="scaleSelector">
    <div className="stackVertical">
      <div className='tableRow'>
        <div>Key:</div>
        <div className="VertSpacer"></div>
        <div><KeysDropDown onSelect={(selectedValue) => {
                console.log('Selected value:', selectedValue);
                setDropdownScales({
                  Type: IScaleSource.ScaleFilterType.Key,
                  Value: selectedValue
                })
              }}>

             </KeysDropDown>
        </div>
      </div>
      <div className='tableRow'>
        <div>Scale Type:</div>
        <div className="VertSpacer"></div>
        <div><ScaleTypesDropDown onSelect={(selectedValue) => {
                console.log('Selected value:', selectedValue);
                setDropdownScales({
                  Type: IScaleSource.ScaleFilterType.ScaleType,
                  Value: selectedValue
                })
              }}>
            </ScaleTypesDropDown>
        </div>
      </div>
    </div>
    <div className="stackVertical">
      <div className='tableRow'>
        <div>Scales:</div>
        <div className="VertSpacer"></div>
        <div><ScalesDropDown scalesFilter={scalesFilter} onSelect={handleScaleDropdownChange}></ScalesDropDown></div>
      </div>
      <Label id="ScaleName-label" caption="Scale Name:" text={scaleDropdownText}/>
      <Label id="KeySignature-label" caption="Key Signature:" text={scaleKeySignature}/>
      <Label id="Notes-label" caption="Notes:" text={scaleNotes}/>
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
    <StringCaptions/>
    <div id="ViolinNecks">
      <FretBar/>
      <ViolinNeck violinData={violinDataAsc} />
      <div id ="ViolinSpacer"></div>
      <FretBar/>
      <ViolinNeck violinData={violinDataDesc} />
    </div>
  </div>
  </>
  )
}

export default App
