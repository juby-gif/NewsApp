import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Dropdown } from '../';
import './SearchBar.css';
import { UserContext } from '../../context';
import { getUniqueAuthors, getSources } from '../../utils';
import { Input } from '../';

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
  const authorList =  getUniqueAuthors(articles);
  const sourceList = getSources();

  return (
    <div className='search-section'>
      <div className="search-bar">
        <Input 
          className="custom-input" 
          type="text" 
          placeholder="Type your keywords to generate articles..." 
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
          <Dropdown 
            name="author" 
            value={selectedFilters.author} 
            onChange={(e) =>
              handleFilterChange('author', e.target.value)
            }
            options={authorList} 
            defaultValue="" 
            defaultName="Select Author"
          />
        </div>
        <div>
          <Dropdown 
            name="source" 
            value={selectedFilters.source} 
            onChange={(e) =>
              setSelectedFilters({
                ...selectedFilters,
                source: e.target.value
              })
            }
            options={sourceList} 
            defaultValue="" 
            defaultName="Select Source"
          />
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
