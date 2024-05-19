import React, { useState, useEffect} from 'react';
import * as IScaleSource from '../../DataLayer/Interfaces/IScales';
import * as IFingerPos from '../../DataLayer/Interfaces/IFingerPositions'
import StringDirection from '../StringDirection'
import * as useApi from '../../Services/API/APIPromise'; 
import config from '../../Config';
import ViolinCell from './ViolinCell';

interface ViolinNeckProps {
  scale: IScaleSource.default;
  direction : StringDirection;
//   onSelect: (value: string) => void;
}

const ViolinNeck = (props: ViolinNeckProps) => {
  const {scale,direction} = props;

  const [violinData, setViolinData] = useState<IFingerPos.default[][]>([]);

  const handleChangePosition = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setViolinData(violinData.map((row) => 
      row.map((cell) => 
        IFingerPos.getFingerPositionID(cell) === index ? { ...cell, Position: event.target.value } : cell
              )
              )
    );
  };

  const handleChangeFinger = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setViolinData(violinData.map((row) => 
      row.map((cell) => 
        IFingerPos.getFingerPositionID(cell) === index ? { ...cell, Position: event.target.value } : cell
              )
              )
    );
  };
  useEffect(() => {
    // Fetch posts when component mounts

    const client = new useApi.HTTPClient(config.apiUrl);
    const fetchScaleTypes = async () => {
      try {
        const fetchedFingerPositions = await client.get<IFingerPos.IFingerPositionSource[]>('FingerPositions?scaleID=' + scale.Scale  + '&octaves=' + scale.Octaves  + '&direction=' + direction); 
        setViolinData(IFingerPos.getScale(fetchedFingerPositions));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchScaleTypes();

    // Cleanup function (optional)
    return () => {
      // Cleanup logic (if any)
    };
  }, [direction, props, scale.Octaves, scale.Scale]); // Empty dependency array ensures the effect runs only once on mount


  // displayViolinData(initialViolinData);

  return(  
    violinData.map((row, rowIndex) => (
        <div key={rowIndex} className="ViolinNeck">
          {row.map((cell, colIndex) => (
          <div key={colIndex} >
            {/* <div className="position finger" onClick={() => handleCellClick(rowIndex, colIndex, "Finger")}> */}
              {/* {editingCell.row === rowIndex && editingCell.col === colIndex ? ( */}
              <ViolinCell
                key={IFingerPos.getFingerPositionID(cell)}
                item={cell}
                value={cell.Finger ? cell.Finger.toString() : ""}
                onChange={handleChangeFinger}
                cellType = "Finger"
              />
            {/* </div> */}
            <ViolinCell
                key={IFingerPos.getFingerPositionID(cell)}
                item={cell}
                value={cell.Position ? cell.Position : ""}
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
