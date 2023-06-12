import React from 'react';
import './ArticleCard.css';
import { Button } from '../';
import { CONSTANTS } from '../../utils';

const ArticleCard = ({ article }) => {
  const { img, title, subtitle, source, date, author, redirectLink } = article;

  // Function to truncate content based on word count
  const truncateContent = (content, wordCount) => {
    const words = content.split(' ');
    if (words.length > wordCount) {
      const truncatedWords = words.slice(0, wordCount);
      return truncatedWords.join(' ') + '...';
    }
    return content;
  };

  // Function to render the source component with custom names
  const renderSourceComponent = () => {
    let sourceName = '';

    // Assign custom names based on the source value
    switch (source) {
      case CONSTANTS.NEWS_API:
        sourceName = 'News API';
        break;
      case CONSTANTS.THE_NEW_YORK_TIMES:
        sourceName = 'The New York Times';
        break;
      case CONSTANTS.THE_GUARDIAN:
        sourceName = 'The Guardian';
        break;
      default:
        sourceName = source;
        break;
    }

    return <span className="source">{sourceName}</span>;
  };

  return (
    <div className="article-card">
      {img && <div className="image-container">
        <img src={img} alt={title} className="article-image" />
      </div>}
      <div className="details">
        {date && (
          <div className="row">
            {renderSourceComponent()}
            <span className="published-date">{new Date(date).toLocaleDateString()}</span>
          </div>
        )}
        {title && (
          <div className="row">
            <h3 className="title">{truncateContent(title, 12)}</h3>
          </div>
        )}
        {subtitle && (
          <div className="row">
            <p className="subtitle">{truncateContent(subtitle, 15)}</p>
          </div>
        )}
        
        <div className="row">
          {author && (
            <span className="author">{author}</span>)}
            <a href={redirectLink} target="_blank" rel="noreferrer">
            <Button className="read-more-button" text="Read more" />
           </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
