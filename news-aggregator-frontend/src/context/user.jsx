import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const [user, setUser] = useState(storedUser || null);
  const [articles, setArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn);
  const [error, setError] = useState('');

  const login = (userData) => {
    const updatedUser = {
      ...userData,
      preferences: {
        category: '',
        source: '',
        author: '',
      },
    };
    updateUser(updatedUser);
    setIsLoggedIn(true);
    persistUser(updatedUser);
  };

  const logout = () => {
    updateUser(null);
    setIsLoggedIn(false);
    clearUserFromStorage();
  };

  const updateUserPreferences = (preferences) => {
    try {
      setUser((prevUser) => {
        const updatedUser = {
          ...prevUser,
          preferences: preferences,
        };
        persistUser(updatedUser);
        return updatedUser;
      });
    } catch (error) {
      setError('Failed to update preferences.');
      // Perform error handling actions or notify the user
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    persistUser(updatedUser);
  };

  const updateArticles = (newArticles) => {
    setArticles(newArticles);
  };

  const persistUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
  };

  const clearUserFromStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  };

  useEffect(() => {
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [storedIsLoggedIn]);

  const contextValue = {
    user,
    articles,
    isLoggedIn,
    error,
    login,
    logout,
    updateUserPreferences,
    updateArticles,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
