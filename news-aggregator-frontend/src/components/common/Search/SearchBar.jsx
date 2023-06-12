import React, { useState } from 'react';
import SearchInput from './SearchInput';
import DateFilter from './DateFilter';
import CategoryFilter from './CategoryFilter';
import AuthorFilter from './AuthorFilter';
import ApplyFilterButton from './ApplyFilterButton';
import './SearchBar.css'

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterApply = () => {
    // Perform the search or filtering operation
    // using the selected filter values
    console.log('Search query:', searchQuery);
    console.log('Selected date:', selectedDate);
    console.log('Selected category:', selectedCategory);
    console.log('Selected author:', selectedAuthor);
  };

  return (
    <div className="search-bar">
      <SearchInput value={searchQuery} onChange={handleSearchChange} />
      <DateFilter value={selectedDate} onChange={setSelectedDate} />
      <CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
      <AuthorFilter value={selectedAuthor} onChange={setSelectedAuthor} />
      <ApplyFilterButton onClick={handleFilterApply} />
    </div>
  );
}

export default SearchBar;
