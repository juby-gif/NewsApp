import { Home, Login, Register, ProfilePage } from '../pages';

/**
 * Routes configuration for the News Aggregator application
 */
export const routes = [
  { path: '/', component: Home, exact: true, private: true },
  { path: '/login', component: Login, private: false },
  { path: '/register', component: Register, private: false },
  { path: '/user-profile', component: ProfilePage, private: true },
  // Add more routes as needed
];
