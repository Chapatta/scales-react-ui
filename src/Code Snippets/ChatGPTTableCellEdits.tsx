import React, { useState } from 'react';

const EditableTable = ({ rows, columns }) => {
  // Create a state variable to hold the content of each cell
  const [cellData, setCellData] = useState(
    Array.from({ length: rows }, () => Array(columns).fill(''))
  );

  // Handler for changing the content of a cell
  const handleCellChange = (rowIndex, columnIndex, newValue) => {
    const updatedData = [...cellData];
    updatedData[rowIndex][columnIndex] = newValue;
    setCellData(updatedData);
  };

  return (
    <table>
      <thead>
        <tr>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <th key={colIndex}>Column {colIndex + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cellData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>
                <input
                  type="text"
                  value={cell}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;
