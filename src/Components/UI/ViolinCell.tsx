// State is updated at the grid level. However, React's reconciliation algorithm efficiently updates only the parts of the DOM that have changed. 
//While the entire component function re-executes, the actual DOM updates are minimal.
// To optimize this further and ensure that only the necessary parts of the grid are re-rendered, 
//you can use React.memo or similar techniques to prevent unnecessary re-renders of components that haven't changed.
import React, { memo } from 'react';

import * as IFingerPos from '../../DataLayer/Interfaces/IFingerPositions'

interface GridItemProps {
  key: number;
  item: IFingerPos.default;
  value: string;
  onChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  cellType: string;
}

const ViolinCell = memo((props: GridItemProps) => {
  const { key, value, onChange} = props;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(key, event);
  };

  return (
    <div className="position ${cellType}">
        <input className="position"
        type="text"
        value={value}
        onChange={handleInputChange}
        />
    </div>
  );
});

ViolinCell.displayName = 'ViolinCell';

export default ViolinCell;
