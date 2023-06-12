import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApiService, API_ENDPOINTS } from '../../utils';
import { UserContext } from '../../context';
import { Card, Button } from '../../components';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const apiService = useApiService();
  const { login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isTransitioning, setTransitioning] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiService.post(API_ENDPOINTS.LOGIN, { email, password });

      if (response && response.user) {
        setTransitioning(true);
        setTimeout(() => {
          login(response.user);
          navigate('/');
        }, 1000); // Smooth transition delay before redirecting
      } else {
        setError('Invalid response from the server');
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className={`login ${isTransitioning ? 'transitioning' : ''}`}>
      <Card
        className="login-form"
        title="Login"
        subtitle={error && <div className="error-message">{error}</div>}
        body={
          <CardBody
            handleLogin={handleLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            isTransitioning={isTransitioning}
          />
        }
        resizable={true}
      />
    </div>
  );
};

export default Login;

const CardBody = ({ handleLogin, email, setEmail, password, setPassword, loading, isTransitioning }) => {
  return (
    <form onSubmit={handleLogin}>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isTransitioning} // Disable input field during transition
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isTransitioning} // Disable input field during transition
        />
      </div>
      <Button type="submit" className={loading ? 'loading' : ''} text={loading ? 'Loading...' : 'Login'} disabled={isTransitioning} />
      <div className="register-link">
        <Link to="/register">New member? Register</Link>
      </div>
    </form>
  );
};
