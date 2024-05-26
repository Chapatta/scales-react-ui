import React, { useState, useEffect, useCallback,forwardRef, useImperativeHandle} from 'react';
import * as IScaleSource from '../../DataLayer/Interfaces/IScales';
import * as IFingerPos from '../../DataLayer/Interfaces/IFingerPositions'
import StringDirection from '../StringDirection'
import * as useApi from '../../Services/API/APIPromise'; 
import config from '../../Config';
import ViolinCell from './ViolinCell';
import EditableCell from './EditableCell';
import ViolinString from '../../Components/ViolinString'

export interface ViolinNeckProps {
  scale: number;
  direction : StringDirection;
//   onSelect: (value: string) => void;
}

export interface ViolinNeckHandle {
  saveViolinNeck: () => void;
}

function getNote(string: number, fret: number): string {
  const notes: readonly string[] = ['G','G#', 'A','A#', 'B','C','C#', 'D','D#', 'E', 'F','F#'];
  const noteIndex: number = ((ViolinString.G - string)* 7 + fret) % 12; 
  return notes[noteIndex];
}

const ViolinNeck = forwardRef<ViolinNeckHandle,ViolinNeckProps>((props,ref) => {
  useImperativeHandle(ref, () => ({
    saveViolinNeck
  }));

  const {scale,direction} = props

  const saveViolinNeck = () => {
    alert('Child function called!');
  };

  const [violinData, setViolinData] = useState<IFingerPos.default[][]>([]);
  const [editingCell, setEditingCell] = useState({ row: 0, col: 0, type: "" });

  const handleCellClick = useCallback((fingerPosition : IFingerPos.default, cellType : string) => {
    const newData  = violinData.map(row => [...row]);
    newData[fingerPosition.String][fingerPosition.Fret].Note = getNote(fingerPosition.String,fingerPosition.Fret);
    setViolinData(newData);
    setEditingCell({ row: fingerPosition.String, col: fingerPosition.Fret, type: cellType });
  },[violinData]);

  const handleSave = useCallback((fingerPosition : IFingerPos.default, cellType : string,newValue : string) => {
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
  },[violinData]);

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
                    <div className="position Finger">
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
});

export default ViolinNeck;
