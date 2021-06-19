import React from 'react';
import './index.css';

const sortableRows = ['Yds', 'Lng', 'TD'];

const renderTableRows = (data) => {
  return data.map((row) => {
    const { Player, Team, Pos, Att, Yds, Avg, TD, Lng, FUM } = row;
    return (
      <tr key={Player}>
        <td>{Player}</td>
        <td>{Team}</td>
        <td>{Pos}</td>
        <td>{row['Att/G']}</td>
        <td>{Att}</td>
        <td>{Yds}</td>
        <td>{Avg}</td>
        <td>{row['Yds/G']}</td>
        <td>{TD}</td>
        <td>{Lng}</td>
        <td>{row['1st']}</td>
        <td>{row['1st%']}</td>
        <td>{row['20+']}</td>
        <td>{row['40+']}</td>
        <td>{FUM}</td>
      </tr>
    );
  });
};

const isSortable = (colName) => sortableRows.includes(colName);

const renderCaretUp = (sortOrder, setSortOrder, sortBy, setSortBy, colName) => (
  <a
    href="#"
    onClick={(e) => sortOrderChange(setSortOrder, setSortBy, 'DESC', colName)}
  >
    <i className="fas fa-caret-up"></i>
  </a>
);

const renderCaretDown = (
  sortOrder,
  setSortOrder,
  sortBy,
  setSortBy,
  colName
) => (
  <a
    href="#"
    onClick={(e) => sortOrderChange(setSortOrder, setSortBy, 'ASC', colName)}
  >
    <i className="fas fa-caret-down"></i>
  </a>
);

const sortOrderChange = (setSortOrder, setSortBy, order, colName) => {
  setSortOrder(order);
  setSortBy(colName);
};

const renderSortFields = (colName, sortOrderHooks) => {
  const { sortOrder, setSortOrder, sortBy, setSortBy } = sortOrderHooks;

  if (isSortable(colName)) {
    return (
      <span>
        {renderCaretUp(sortOrder, setSortOrder, sortBy, setSortBy, colName)}
        {renderCaretDown(sortOrder, setSortOrder, sortBy, setSortBy, colName)}
      </span>
    );
  }
  return null;
};

const renderTableHeader = (headers, sortOrderHooks) => {
  return headers.map((col, index) => {
    return (
      <th key={`col-${index}`} id={`col-${index}`}>
        {col}
        {renderSortFields(col, sortOrderHooks)}
      </th>
    );
  });
};

const Table = (props) => {
  const { rushData, sortOrder, setSortOrder, sortBy, setSortBy } = props;
  const sortOrderHooks = { sortOrder, setSortOrder, sortBy, setSortBy };

  return (
    <table id="nfl-rushing-table" className="table-nfl">
      <thead>
        <tr>
          {renderTableHeader(
            Object.keys(rushData.length !== 0 ? rushData[0] : []),
            sortOrderHooks
          )}
        </tr>
      </thead>
      <tbody>{renderTableRows(rushData)}</tbody>
    </table>
  );
};

export { Table };
