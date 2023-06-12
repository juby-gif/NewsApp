import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { routes } from "./utils";
import { useContext } from "react";
import { UserContext } from "./context";
import './App.css';

/**
 * App component responsible for setting up routing in the application.
 * Ensures authentication for private routes and redirects unauthenticated users to the login page.
 */
const App = () => {
  const { isLoggedIn } = useContext(UserContext);

  // For Debugging Purpose Only
  // console.log(isLoggedIn);
  
  return (
    <Router>
      <Routes >
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.private && !isLoggedIn ? (
                <Navigate to="/login" replace />
              ) : (route.component)}
            exact={route.exact}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
