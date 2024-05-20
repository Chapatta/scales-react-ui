import React, { useState, useEffect} from 'react';
import * as IScaleSource from '../../DataLayer/Interfaces/IScales';
import * as IFingerPos from '../../DataLayer/Interfaces/IFingerPositions'
import StringDirection from '../StringDirection'
import * as useApi from '../../Services/API/APIPromise'; 
import config from '../../Config';
import ViolinCell from './ViolinCell';

interface ViolinNeckProps {
  scale: number;
  direction : StringDirection;
//   onSelect: (value: string) => void;
}

const ViolinNeck = (props: ViolinNeckProps) => {
  const {scale,direction} = props;

  const [violinData, setViolinData] = useState<IFingerPos.default[][]>([]);

  const handleChangePosition = (fingerPosition: IFingerPos.default, event: React.ChangeEvent<HTMLInputElement>) => {
    violinData[fingerPosition.String][fingerPosition.Fret].Position = event.target.value;
    setViolinData(violinData);
  };

  const handleChangeFinger = (fingerPosition: IFingerPos.default, event: React.ChangeEvent<HTMLInputElement>) => {
    violinData[fingerPosition.String][fingerPosition.Fret].Finger = parseInt(event.target.value,10);
    setViolinData(violinData);
  };

  useEffect(() => {
    // Fetch posts when component mounts

    const client = new useApi.HTTPClient(config.apiUrl);
    const fetchScaleTypes = async () => {
      try {
        const fetchedFingerPositions = await client.get<IFingerPos.IFingerPositionSource[]>(`FingerPositions?scaleID=${scale}&direction=${direction}`); 
        const violinData1 = IFingerPos.getScale(fetchedFingerPositions)
        setViolinData(violinData1);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchScaleTypes();

    // Cleanup function (optional)
    return () => {
      // Cleanup logic (if any)
    };
  },[scale,direction] ) // Empty dependency array ensures the effect runs only once on mount


  // displayViolinData(initialViolinData);

  return(  
    violinData.map((row, rowIndex) => (
        <div key={rowIndex} className="ViolinNeck">
          {row.map((cell, colIndex) => (
          <div key={colIndex} >
            {/* <div className="position finger" onClick={() => handleCellClick(rowIndex, colIndex, "Finger")}> */}
              {/* {editingCell.row === rowIndex && editingCell.col === colIndex ? ( */}
              <ViolinCell
                fingerPosition={cell}
                initialValue={cell.Finger ? cell.Finger.toString() : ""}
                onChange={handleChangeFinger}
                cellType = "Finger"
              />
            {/* </div> */}
            <ViolinCell
                fingerPosition={cell}
                initialValue={cell.Position ? cell.Position : ""}
                onChange={handleChangePosition}
                cellType = "Position"
              />
            {/* <div className="position"  onClick={() => handleCellClick(rowIndex, colIndex,"Position")}>
              {cell.Position ? cell.Position : "\u00a0"} 
            </div> */}
            <div className="position note">
              {cell.Note ? cell.Note : "\u00a0"} 
            </div>
            </div>
          ))}
        </div>
      )
    )
  )
}

export default ViolinNeck;
