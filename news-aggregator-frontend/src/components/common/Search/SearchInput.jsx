import React from 'react';
import PropTypes from 'prop-types';

function SearchInput({ value, onChange }) {
  return (
    <div className="search-input-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
