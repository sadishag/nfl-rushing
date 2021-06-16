import React from 'react';

const PageNavigator = (props) => {
  const { page, setPage, totalPages } = props;

  return (
    <span>
      <a href="#" onClick={() => setPage(page > 1 ? page - 1 : page)}>
        <i className="fas fa-caret-left"></i>
      </a>{' '}
      {page} of {totalPages}{' '}
      <a href="#" onClick={() => setPage(page < totalPages ? page + 1 : page)}>
        <i className="fas fa-caret-right"></i>
      </a>
    </span>
  );
};

export { PageNavigator };
