import React, { useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from '../../context';
import { Button, Dropdown, Header, Card, ArticleCard } from '../../components';
import { getUniqueAuthors, getSources, filterArticles } from '../../utils';
import './Profile.css';

const Profile = () => {
  const { user, updateUserPreferences, articles } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [preferences, setPreferences] = useState({
    category: '',
    source: '',
    author: '',
  });
  const [filteredArticles, setFilteredArticles] = useState([]);

  const authorList = getUniqueAuthors(articles);
  const sourceList = getSources();

  const fetchDataAndFilterArticles = useCallback(async () => {
    try {
      const filtered = filterArticles(articles, preferences); // Filter the articles based on preferences
      setFilteredArticles(filtered);
    } catch (error) {
      console.log('Error fetching articles:', error);
    }
  }, [articles, preferences]);

  useEffect(() => {
    fetchDataAndFilterArticles();
  }, [fetchDataAndFilterArticles]);

  const handleUpdatePreferences = () => {
    setEditing(true);
  };

  const handleDropdownChange = useCallback((name, value) => {
    setPreferences((prev) => ({
      ...prev,
      [name]: value === '' ? '' : value,
    }));
  }, []);

  const handlePreferencesSubmit = useCallback((e) => {
    e.preventDefault();
    updateUserPreferences(preferences);
    setEditing(false);
  }, [preferences, updateUserPreferences]);

  const renderPreferencesSection = () => {
    const { source, author } = user.preferences || {};

    if (source || author) {
      return (
        <>
          {source && <h5>Source: {source}</h5>}
          {author && <h5>Author: {author}</h5>}
          <Button text="Update Preferences" onClick={() => handleUpdatePreferences()} />
        </>
      );
    } else {
      return (
        <>
          <p>No preferences set</p>
          {editing ? (
            <form onSubmit={handlePreferencesSubmit}>
              <DropdownWithMemo
                name="source"
                value={preferences.source || source} // Pre-fill with user's source preference
                onChange={handleDropdownChange}
                label="Source"
                options={sourceList}
                defaultValue=""
                defaultName="Select Source"
              />
              <DropdownWithMemo
                name="author"
                value={preferences.author || author} // Pre-fill with user's author preference
                onChange={handleDropdownChange}
                label="Author"
                options={authorList}
                defaultValue=""
                defaultName="Select Author"
              />
              <Button text="Save Preferences" type="submit" />
            </form>
          ) : (
            <Button text="Create Preferences" onClick={() => setEditing(true)} />
          )}
        </>
      );
    }
  };

  const renderProfileSection = () => {
    return (
      <div className="user-info">
        <div className="profile-image-container">
          <img
            src={process.env.REACT_APP_BASE_URL + user.img_URL}
            alt="Profile"
            className="profile-image"
          />
        </div>
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="container">
        <Card resizable={true} title="Profile" body={renderProfileSection()} />
      </div>
      <div className="container">
        <Card resizable={true} title="Preferences" body={renderPreferencesSection()} />
      </div>
      <div className="container">
        <div className="news-feed-container">
          {renderArticles(filteredArticles)}
        </div>
      </div>
    </div>
  );
};

const renderArticles = (articles) => {
  if (articles.length > 0) {
    return articles.map((article, id) => (
      <ArticleCard
        key={id}
        article={article}
      />
    ));
  } else {
    return <p>No articles to display</p>;
  }
};

// Dropdown component memoized with React.memo
const DropdownWithMemo = React.memo(Dropdown);

export default Profile;
