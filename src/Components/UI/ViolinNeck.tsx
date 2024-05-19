import React, { useState, useEffect} from 'react';
import * as IScaleSource from '../../DataLayer/Interfaces/IScales';
import * as IFingerPos from '../../DataLayer/Interfaces/IFingerPositions'
import StringDirection from '../StringDirection'
import * as useApi from '../../Services/API/APIPromise'; 
import config from '../../Config';

interface ViolinNeckProps {
  scale: IScaleSource.default;
  direction : StringDirection;
//   onSelect: (value: string) => void;
}

const ViolinNeck = (props: ViolinNeckProps) => {

  const [fingerPositions, setFingerPositions] = useState<IFingerPos.IFingerPositionSource[]>([]);
  const [editingCell, setEditingCell] = useState({ row: -1, col: -1 });

  const handleCellClick = (row : number, col: number, cellType : string) => {
    setEditingCell({ row, col });
    console.log('row ',row,'col ', col , 'cellType',cellType)
  };

  const handleCellChange = (event, row, col) => {
    const updatedGrid = [...gridData];
    updatedGrid[row][col] = event.target.value;
    setGridData(updatedGrid);
  };

  const handleCellBlur = () => {
    setEditingCell({ row: -1, col: -1 });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCellBlur();
    }
  };

  useEffect(() => {
    // Fetch posts when component mounts
    const client = new useApi.HTTPClient(config.apiUrl);
    const fetchScaleTypes = async () => {
      try {
        const fetchedFingerPositions = await client.get<IFingerPos.IFingerPositionSource[]>('FingerPositions?scaleID=' + props.scale.Scale  + '&octaves=' + props.scale.Octaves  + '&direction=' + props.direction); 
        setFingerPositions(fetchedFingerPositions);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchScaleTypes();

    // Cleanup function (optional)
    return () => {
      // Cleanup logic (if any)
    };
  }, [props]); // Empty dependency array ensures the effect runs only once on mount

  const violinData : IFingerPos.default[][] = IFingerPos.getScale(fingerPositions);

  // displayViolinData(initialViolinData);

  return(  
    violinData.map((row, rowIndex) => (
        <div key={rowIndex} className="ViolinNeck">
          {row.map((cell, colIndex) => (
          <div key={colIndex} >
            <div className="position finger" onClick={() => handleCellClick(rowIndex, colIndex, "Finger")}>
              {/* onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)} */}
              {editingCell.row === rowIndex && editingCell.col === colIndex ? (
                  <input
                    type="text"
                    value={cell.Finger ? cell.Finger : "\u00a0"}
                    onChange={(event) => handleCellChange(event, rowIndex, colIndex)}
                    onBlur={handleCellBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                ) : (
                  <div>{cell.Finger ? cell.Finger : "\u00a0"}</div>
                )}
            </div>
            <div className="position"  onClick={() => handleCellClick(rowIndex, colIndex,"Position")}>
              {cell.Position ? cell.Position : "\u00a0"} 
            </div>
            <div className="position note"  onClick={() => handleCellClick(rowIndex, colIndex)}>
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
