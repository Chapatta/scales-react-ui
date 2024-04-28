import React from 'react';

const TableRow = ({ rowIndex, rowData, updateCell }) => {
  return (
    <tr>
      {rowData.map((cell, colIndex) => (
        <td key={colIndex}>
          <input
            type={colIndex === 1 ? 'number' : 'text'}
            value={cell}
            onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
          />
        </td>
      ))}
    </tr>
  );
};

export default TableRow;


// import React, { useState } from 'react';
// import TableRow from './TableRow'; // Assuming the row component is in the same directory

// const ArrayTable = () => {
//   // Define the initial table data as an array of arrays
//   const initialData = [
//     ['John Doe', 28, 'Engineer'],
//     ['Jane Smith', 34, 'Designer'],
//     ['Bob Johnson', 45, 'Manager'],
//   ];

//   // Create state to store the table data
//   const [tableData, setTableData] = useState(initialData);

//   // Function to update a specific cell
//   const updateCell = (rowIndex, colIndex, newValue) => {
//     setTableData((prevData) =>
//       prevData.map((row, rIdx) =>
//         rIdx === rowIndex
//           ? row.map((cell, cIdx) => (cIdx === colIndex ? newValue : cell))
//           : row
//       )
//     );
//   };

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Age</th>
//           <th>Job</th>
//         </tr>
//       </thead>
//       <tbody>
//         {tableData.map((row, rowIndex) => (
//           <TableRow
//             key={rowIndex}
//             rowIndex={rowIndex}
//             rowData={row}
//             updateCell={updateCell}
//           />
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ArrayTable;
