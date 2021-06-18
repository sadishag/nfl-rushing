import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from './components/table';
import './App.css';
import { Search } from './components/search';
import { RowDropdown } from './components/rowDropdown';
import { PageNavigator } from './components/pageNavigator';

const App = () => {
  const [rushData, setRushData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    axios
      .get(
        `/api/v1/rush?page=${page}&rowsPerPage=${rowsPerPage}&search=${searchQuery}&sortOrder=${sortOrder}&sortBy=${sortBy}`
      )
      .then((resp) => {
        if (resp.status === 200) {
          setRushData(resp.data.data);
          setTotalPages(resp.data.totalPages);
        } else {
          setRushData([]);
          setTotalPages(0);
        }
      })
      .catch(() => {
        setRushData([]);
        setTotalPages(0);
      });
  }, [searchQuery, page, rowsPerPage, sortOrder, sortBy]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>NFL-Rushing</h1>
        <Search setSearchQuery={setSearchQuery} setPage={setPage} />
        <RowDropdown
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
        <a
          href="http://localhost:8080/api/v1/rush/download-csv"
          target="_blank"
          rel="noreferrer"
        >
          <button style={{ backgroundColor: 'green', color: 'white' }}>
            Download
          </button>
        </a>
      </header>
      <Table
        rushData={rushData}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <PageNavigator page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default App;
