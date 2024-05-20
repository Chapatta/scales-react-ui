// State is updated at the grid level. However, React's reconciliation algorithm efficiently updates only the parts of the DOM that have changed. 
//While the entire component function re-executes, the actual DOM updates are minimal.
// To optimize this further and ensure that only the necessary parts of the grid are re-rendered, 
//you can use React.memo or similar techniques to prevent unnecessary re-renders of components that haven't changed.
import React, { useState , useEffect, memo } from 'react';

import * as IFingerPos from '../../DataLayer/Interfaces/IFingerPositions'

interface GridItemProps {
  fingerPosition: IFingerPos.default;
  initialValue: string;
  onChange: (fingerPosition: IFingerPos.default, event: React.ChangeEvent<HTMLInputElement>) => void;
  cellType: string;
}

const ViolinCell = memo((props: GridItemProps) => {
  const { fingerPosition, initialValue, onChange} = props;

  const [cellValue, setValue] = useState(initialValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(fingerPosition,event);
  };

  // Update the state if initialValue changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
        <input className="position ${cellType}"
        type="text"
        value={cellValue}
        onChange={handleInputChange}
        />
  );
});

ViolinCell.displayName = 'ViolinCell';

export default ViolinCell;
