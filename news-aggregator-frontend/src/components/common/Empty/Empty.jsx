import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import './Empty.css';


const EmptyComponent = ({ isLoaded, isSearchEmpty }) => {
  if (!isLoaded) {
    return (
      <div className="empty-component">
        <FontAwesomeIcon icon={faSearch} className="empty-component-icon" />
        <div className="empty-component-subtitle">Start typing your keywords to populate articles</div>
      </div>
    );
  } else if (isSearchEmpty) {
    return (
      <div className="empty-component">
        <FontAwesomeIcon icon={faExclamationCircle} className="empty-component-icon" />
        <h3 className="empty-component-subtitle">No articles found</h3>
      </div>
    );
  } else {
    return null;
  }
};

export default EmptyComponent;
