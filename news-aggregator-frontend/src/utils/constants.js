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
  sources: {
    NEWS_API: { name: 'News API', value: 'newsapi' },
    THE_GUARDIAN: { name: 'The Guardian', value: 'theguardian' },
    THE_NEW_YORK_TIMES: { name: 'The New York Times', value: 'nytimes' },
  },
};

export { API_ENDPOINTS, CONSTANTS };
