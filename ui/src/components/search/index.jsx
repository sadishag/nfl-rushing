import React from 'react';
import './index.css';

const Search = (props) => {
  const { searchQuery, setSearchQuery } = props;

  return (
    <div className="search-container">
      <label className="search-label" htmlFor="">
        Search{' '}
      </label>
      <input
        className="search-text"
        type="text"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <i className="fas fa-search" id="search-icon"></i>
    </div>
  );
};

export { Search };
