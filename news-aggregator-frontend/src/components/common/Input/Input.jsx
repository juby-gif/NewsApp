import React from 'react';
import './Input.css';

const Input = ({ type, placeholder, value, onChange, className }) => {
  const inputClass = `input ${className}`; // Combine default and custom class
  return (
    <input
      className={inputClass}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
