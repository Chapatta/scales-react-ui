import { useState, useRef } from 'react'
import './App.css'
import KeysDropDown from './Components/UI/KeysDropDown'
import GradesDropDown from './Components/UI/GradesDropDown'
import ScaleSelector from './Components/UI/ScalesSelector'
import FretBar from './Components/UI/FretBar'
import StringCaptions from './Components/UI/StringCaptions'
import ScaleTypesDropDown from './Components/UI/ScaleTypesDropDown'
import ScalesDropDown from './Components/UI/ScalesDropDown'
import Label from './Components/UI/Label'
import ViolinNeck, {ViolinNeckHandle,ViolinNeckProps} from './Components/UI/ViolinNeck'
// import * as DAL from './DataLayer/Test/TestCalls'
// import * as IFingerPos from './DataLayer/Interfaces/IFingerPositions'
import * as IScaleSource from './DataLayer/Interfaces/IScales'
import StringDirection from './Components/StringDirection'
// import IScaleType from '../../DataLayer/Interfaces/IScaleTypes';
// import * as useApi from './Services/API/APITool'; 
// import config from './Config';
import ScaleDetails from './Components/UI/ScaleDetails'

function App() {

  const [currentABRSMScaleID, setScaleID] = useState(0);
  // const [currentScale, setScale] = useState<IScaleSource.default>(IScaleSource.emptyScale());

  const [scalesFilter, setDropdownScales] = useState<IScaleSource.IScaleFilter>({
    Type: IScaleSource.ScaleFilterType.ScaleType,
    Value: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const AscViolinNeckRef = useRef<ViolinNeckHandle>();
  const DescViolinNeckRef = useRef();

  const handleSaveButtonClick = () => {
    if (AscViolinNeckRef.current) {
      AscViolinNeckRef.current.saveViolinNeck();
    }
  };

  return (
  <>
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
      <div className='tableRow'>
        <div>Grade:</div>
        <div className="VertSpacer"></div>
        <div><GradesDropDown onSelect={(selectedValue) => {
                console.log('Selected value:', selectedValue);
                setDropdownScales({
                  Type: IScaleSource.ScaleFilterType.Grades,
                  Value: selectedValue
                })
              }}>
             </GradesDropDown>
        </div>
      </div>
    </div>
    <div className="stackVertical">
      <div className='tableRow'>
        <div>Scales:</div>
        <div className="VertSpacer"></div>
        <div><ScalesDropDown scalesFilter={scalesFilter} onSelect={(selectedValue) => {
                console.log('Selected value:', selectedValue);
                setScaleID(parseInt(selectedValue));
              }}></ScalesDropDown></div>
      </div>
      {/* <Label id="ScaleName-label" caption="Scale Name:" text={currentScale.Name}/>
      <Label id="KeySignature-label" caption="Key Signature:" text={currentScale?.KeyNotes}/>
      <Label id="Notes-label" caption="Notes:" text={currentScale?.Notes}/> */}
    </div>
  </div>
  <table>
      <tr>
          <td>Lock Violin<input type="checkbox" id="LockViolin"/></td>
          <td><button id="Save-button" onClick={handleSaveButtonClick}>Save</button></td>
          <td><button id="Load-button" onClick={openModal}>Load Scale</button></td>
          <ScaleSelector isOpen={isModalOpen} onClose={closeModal}>
            <h2>Modal Content</h2>
            <p>This is a simple modal dialog.</p>
          </ScaleSelector>
      </tr>
  </table>
  <div id="Violin">
    <StringCaptions/>
    <div id="ViolinNecks">
      <FretBar/>
      <ViolinNeck scale={currentABRSMScaleID} direction={StringDirection.Asc} ref={AscViolinNeckRef}/>
      <div id ="ViolinSpacer"></div>
      <FretBar/>
      <ViolinNeck scale ={currentABRSMScaleID} direction={StringDirection.Desc} />
    </div>
  </div>
  </>
  )
}

export default App
