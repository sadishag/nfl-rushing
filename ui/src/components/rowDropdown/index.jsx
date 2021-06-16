import React from 'react';
import './index.css';

const RowDropdown = (props) => {
  const { rowsPerPage, setRowsPerPage } = props;

  return (
    <div className="dropdown-container">
      <label className="dropdown-label" htmlFor="">
        Rows Per Page
      </label>
      <select
        value={rowsPerPage}
        onChange={(e) => {
          setRowsPerPage(e.target.value);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export { RowDropdown };
