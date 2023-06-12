import React, { createContext, useState, useEffect } from 'react';

// Create the user context
const UserContext = createContext();

// Create the user provider component
const UserProvider = ({ children }) => {
  // State for user and login status
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle user login
  const login = (userData) => {
    const updatedUser = {
      ...userData,
      preferredSources: [],
      preferredCategories: [],
      preferredAuthors: [],
    };
    updateUser(updatedUser);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Function to handle user logout
  const logout = () => {
    updateUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  // Function to update user preferences
  const updateUserPreferences = (preferences) => {
    updateUser((prevUser) => ({ ...prevUser, ...preferences }));
  };

  // Function to update the user state
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  // Function to update the article state
  const updateArticles = (articles) => {
    setArticles(articles);
  };

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Create the context value
  const contextValue = {
    user,
    articles,
    isLoggedIn,
    login,
    logout,
    updateUserPreferences,
    updateArticles,
  };

  // Render the user provider with the context value
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
