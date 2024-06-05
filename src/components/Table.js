import React from 'react';

const Table = ({ data, columns }) => {
  return (
    <table>
      <thead className='thead-font'>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} style={index === 0 ? { backgroundColor: '#ebebeb' } : null}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{item[col.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
