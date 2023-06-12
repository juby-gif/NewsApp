import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../';
import './SearchBar.css';
import { UserContext } from '../../context';
import { CONSTANTS } from '../../utils'

const SearchBar = ({
  keyword,
  setKeyword,
  handleSearch,
  loading,
  selectedFilters,
  error,
  setSelectedFilters,
  handleFilterChange
}) => {

  const { articles } = useContext(UserContext);

  // Create a list of unique authors from the articles
  const authorList = Array.from(new Set(articles.map(article => article.author)));

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value.split(','))}
        />
      </div>
      <div className="filter-container">
        <div>
          <DatePicker
            selected={selectedFilters.date}
            placeholderText="Select Date"
            onChange={(date) => setSelectedFilters({ ...selectedFilters, date: date })}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div>
          <select
            value={selectedFilters.author}
            onChange={(e) =>
              handleFilterChange('author', e.target.value)
            }
          >
            <option value="">Select Author</option>
            {authorList.map((author, index) => (
              <option key={index} value={author}>{author}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={selectedFilters.source}
            onChange={(e) =>
              setSelectedFilters({
                ...selectedFilters,
                source: e.target.value
              })
            }
          >
            <option value="">Select Source</option>
            <option value={CONSTANTS.NEWS_API}>News API</option>
            <option value={CONSTANTS.THE_GUARDIAN}>The Guardian</option>
            <option value={CONSTANTS.THE_NEW_YORK_TIMES}>The New York Times</option>
          </select>
        </div>
        <div>
          <Button
            className="search-button"
            text="Search"
            onClick={handleSearch}
            disabled={loading}
          />
        </div>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default SearchBar;
