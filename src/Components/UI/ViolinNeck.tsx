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

  useEffect(() => {
    // Fetch posts when component mounts
    const client = new useApi.HTTPClient(config.apiUrl);
    const fetchScaleTypes = async () => {
      try {
        const fetchedFingerPositions = await client.get<IFingerPos.IFingerPositionSource[]>('FingerPositions?scaleID=' + props.scale.Id  + '&octaves=' + props.scale.Octaves  + '&direction=' + props.direction); 
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
  }, [props.scale.Id, props.scale.Octaves,props.direction]); // Empty dependency array ensures the effect runs only once on mount

  const violinData : IFingerPos.default[][] = IFingerPos.getScale(fingerPositions);

  // displayViolinData(initialViolinData);

  return(  
    violinData.map((row, rowIndex) => (
        <div key={rowIndex} className="ViolinNeck">
          {row.map((cell, colIndex) => (
          <div key={colIndex}>
            <div className="position finger">
              {/* onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)} */}
              {cell.Finger ? cell.Finger : "\u00a0"} 
            </div>
            <div className="position">
              {cell.Position ? cell.Position : "\u00a0"} 
            </div>
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
