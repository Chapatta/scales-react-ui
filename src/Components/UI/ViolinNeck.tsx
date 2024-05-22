import React, { useState, useEffect} from 'react';
import * as IScaleSource from '../../DataLayer/Interfaces/IScales';
import * as IFingerPos from '../../DataLayer/Interfaces/IFingerPositions'
import StringDirection from '../StringDirection'
import * as useApi from '../../Services/API/APIPromise'; 
import config from '../../Config';
import ViolinCell from './ViolinCell';
import EditableCell from './EditableCell';

interface ViolinNeckProps {
  scale: number;
  direction : StringDirection;
//   onSelect: (value: string) => void;
}

const ViolinNeck = (props: ViolinNeckProps) => {
  const {scale,direction} = props;

  const [violinData, setViolinData] = useState<IFingerPos.default[][]>([]);

  const [editingCell, setEditingCell] = useState({ row: 0, col: 0, type: "" });

  const handleCellClick = (fingerPosition : IFingerPos.default, cellType : string) => {
    setEditingCell({ row: fingerPosition.String, col: fingerPosition.Fret, type: cellType });
  };

  const handleSave = (fingerPosition : IFingerPos.default, cellType : string,newValue : string) => {
    const newData  = violinData.map(row => [...row]);
    if (cellType == "Position")
    {
      newData[fingerPosition.String][fingerPosition.Fret].Position = newValue;
    }
    else
    {
      newData[fingerPosition.String][fingerPosition.Fret].Finger = parseInt(newValue,10);
    }

    setViolinData(newData);
    setEditingCell({ row: 0, col: 0,type: ""});
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
            <div className="position finger" onClick={() => handleCellClick(cell, "Finger")}>
              {editingCell.row === rowIndex && editingCell.col === colIndex  && editingCell.type === "Finger" ? (
                    <EditableCell
                      value={cell.Finger ? cell.Finger.toString() : "\u00a0"}
                      onSave={(newValue) => handleSave(cell, "Finger",newValue)}
                    />
                  ) : (
                    <div className="position note">
                      {cell.Finger ? cell.Finger : "\u00a0"} 
                    </div>
                  )}
            </div>
            <div className="position" onClick={() => handleCellClick(cell, "Position")}>
              {editingCell.row === rowIndex && editingCell.col === colIndex  && editingCell.type === "Position" ? (
                    <EditableCell
                      value={cell.Position ? cell.Position : "\u00a0"}
                      onSave={(newValue) => handleSave(cell, "Position",newValue)}
                    />
                  ) : (
                    <div className="position note">
                      {cell.Position ? cell.Position : "\u00a0"} 
                    </div>
                  )}
            </div>
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
