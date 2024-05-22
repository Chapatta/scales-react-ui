import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';

interface EditableCellProps {
  value: string;
  onSave: (newValue: string) => void;
}

const EditableCell = React.memo(({ value, onSave }: EditableCellProps) => {
  const [tempValue, setTempValue] = useState<string>(value);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value);
  };

  const handleInputBlur = () => {
    onSave(tempValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSave(tempValue);
    }
  };

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  return (
    <input className='position'
      type="text"
      value={tempValue}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  );
});

export default EditableCell;
