import React, { useState, useEffect } from 'react';
import { Header, ArticleCard } from '../../components';

const ProfilePage = () => {
  // State variables
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
    authors: []
  });
  const [newsArticles, setNewsArticles] = useState([]);

  // Fetch user data from the server
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/user');
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch personalized news articles based on preferences
  useEffect(() => {
    fetchNewsArticles();
  }, [preferences]);

  const fetchNewsArticles = async () => {
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        body: JSON.stringify(preferences),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const newsData = await response.json();
      setNewsArticles(newsData);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle input changes
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.value);
  };

  const handlePreferencesChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: value.split(',') // Assuming multi-select values are comma-separated
    }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Save preferences
  const savePreferences = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/preferences', {
        method: 'POST',
        body: JSON.stringify(preferences),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Fetch updated news articles based on new preferences
      fetchNewsArticles();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <img className="profile-image" alt="user-profile-pic" src={profileImage || user.profileImage} />
        <div className="profile-info">
          {!editMode && <h2>{name || user.name}</h2>}
          {!editMode && <p>{user.email}</p>}
          {editMode && (
            <div>
              <input type="text" value={name} onChange={handleNameChange} placeholder={user.name} />
              <input type="text" value={profileImage} onChange={handleProfileImageChange} placeholder="Profile Image URL" />
            </div>
          )}
        </div>
        <button onClick={toggleEditMode}>{editMode ? 'Cancel' : 'Edit'}</button>
        {editMode && (
          <form onSubmit={savePreferences}>
            <h3>Preferences</h3>
            <label htmlFor="sources">Preferred Sources:</label>
            <select
              id="sources"
              name="sources"
              multiple
              value={preferences.sources}
              onChange={handlePreferencesChange}
            >
              <option value="source1">Source 1</option>
              <option value="source2">Source 2</option>
              <option value="source3">Source 3</option>
              {/* Add more source options here */}
            </select>
            <label htmlFor="categories">Preferred Categories:</label>
            <select
              id="categories"
              name="categories"
              multiple
              value={preferences.categories}
              onChange={handlePreferencesChange}
            >
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
              {/* Add more category options here */}
            </select>
            <label htmlFor="authors">Preferred Authors:</label>
            <select
              id="authors"
              name="authors"
              multiple
              value={preferences.authors}
              onChange={handlePreferencesChange}
            >
              <option value="author1">Author 1</option>
              <option value="author2">Author 2</option>
              <option value="author3">Author 3</option>
              {/* Add more author options here */}
            </select>
            <button type="submit">Save Preferences</button>
          </form>
        )}
      </div>
      <div className="news-container">
        <h3>Personalized News Articles</h3>
        <div id="newsArticles">
          {/* Render the list of news articles */}
          {newsArticles.map((article) => (
            <div key={article.id} className="news-article">
              <h4>{article.title}</h4>
              <p>{article.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
