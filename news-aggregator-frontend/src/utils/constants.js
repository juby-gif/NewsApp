/**
 * API endpoints for the News Aggregator application
 */
const API_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  FETCH_ARTICLES: '/articles',
  CREATE_PREFERENCE: '/preferences/create',
  LOGOUT: '/logout',
  // Add more endpoints as needed
};

/**
 * Constants for the News Aggregator application
 */
const CONSTANTS = {
  NEWS_API: 'newsapi',
  THE_GUARDIAN: 'theguardian',
  THE_NEW_YORK_TIMES: 'nytimes',
};

export { API_ENDPOINTS, CONSTANTS };
