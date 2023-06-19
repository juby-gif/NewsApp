import React from 'react';
import './Dropdown.css';

const Dropdown = ({ name, value, onChange, label, options, defaultValue, defaultName }) => {

  return (
    <div className="dropdown">
      {label && <label>{label}</label>}
      <select name={name} value={value} onChange={onChange}>
        <option value={defaultValue}>{defaultName}</option>
        {options.map((option) => {
          if (typeof option === 'string') {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          } else if (typeof option === 'object' && option.hasOwnProperty('name') && option.hasOwnProperty('value')) {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          }
          return null;
        })}
      </select>
    </div>
  );
};

export default Dropdown;
