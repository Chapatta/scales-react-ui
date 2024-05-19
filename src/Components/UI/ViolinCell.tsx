// State is updated at the grid level. However, React's reconciliation algorithm efficiently updates only the parts of the DOM that have changed. 
//While the entire component function re-executes, the actual DOM updates are minimal.
// To optimize this further and ensure that only the necessary parts of the grid are re-rendered, 
//you can use React.memo or similar techniques to prevent unnecessary re-renders of components that haven't changed.
import React, { memo } from 'react';

interface GridItem {
  id: number;
  content: string;
}

interface GridItemProps {
  item: GridItem;
  editMode: number | null;
  editContent: string;
  handleEditClick: (item: GridItem) => void;
  handleSaveClick: (id: number) => void;
  setEditContent: (content: string) => void;
}

const ViolinCell = memo((props: GridItemProps) => {
  const { item, editMode, editContent, handleEditClick, handleSaveClick, setEditContent } = props;

  return (
    <div className="grid-item">
      {editMode === item.id ? (
        <div>
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button onClick={() => handleSaveClick(item.id)}>Save</button>
        </div>
      ) : (
        <div>
          <span>{item.content}</span>
          <button onClick={() => handleEditClick(item)}>Edit</button>
        </div>
      )}
    </div>
  );
});

ViolinCell.displayName = 'ViolinCell';

export default ViolinCell;
