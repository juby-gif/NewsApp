import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { API_ENDPOINTS, useApiService } from '../../utils';
import { UserContext } from '../../context';
import { Card, Button } from '../../components';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const apiService = useApiService(); // Initialize the useApiService hook
  const { login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { name, email, password } = formData;
      const response = await apiService.post(API_ENDPOINTS.REGISTER, { name, email, password });
      console.log(response);

      // Check if user is defined in the response
      if (response && response.user) {
        login(response.user);
        navigate('/'); // Redirect to the dashboard on successful login
      } else {
        setError('Invalid response from the server');
      }
      navigate('/'); // Redirect to the dashboard on successful login
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  return (
    <div className="register">
      <Card
        className="register-form"
        title="Register"
        subtitle={error && <div className="error-message">{error}</div>}
        body={
          <CardBody
            handleInputChange={handleInputChange}
            formData={formData}
            loading={loading}
            isFormValid={isFormValid}
            error={error}
            handleRegister={handleRegister}
          />
        }
        resizable={true}
      />
      
    </div>
  );
};

const Input = ({ label, name, value, onChange }) => {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}:</label>
      <input type="text" id={name} name={name} value={value} onChange={onChange} />
    </div>
  );
};

const PasswordInput = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" value={value} onChange={onChange} />
      <PasswordValidationRules password={value} />
    </div>
  );
};

const PasswordValidationRules = ({ password }) => {
  const passwordValidations = [
    { rule: /[A-Z]/, description: 'At least one uppercase letter' },
    { rule: /[a-z]/, description: 'At least one lowercase letter' },
    { rule: /[0-9]/, description: 'At least one number' },
    { rule: /.{6,}/, description: 'Minimum length of 6 characters' },
  ];

  const isPasswordValid = passwordValidations.every((validation) => validation.rule.test(password));

  return (
    <div className="validation-rule">
      {passwordValidations.map((validation, index) => (
        <p key={index} className={validation.rule.test(password) ? 'valid' : ''}>
          {validation.description}
        </p>
      ))}
      {!isPasswordValid && <p style={{ color: 'red' }}>Password does not meet all the requirements</p>}
    </div>
  );
};

const ConfirmPasswordInput = ({ value, onChange, password }) => {
  const isMatch = value === password;

  return (
    <div>
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" value={value} onChange={onChange} />
      {value && password && (
        <span className={`validation-rule ${isMatch ? 'valid' : ''}`}>
          {isMatch ? '✔' : '✘'} Passwords match
        </span>
      )}
    </div>
  );
};

const RegisterButton = ({ isFormValid, onClick, loading }) => {
  const handleRegisterClick = (e) => {
    if (isFormValid) {
      onClick(e);
    }
  };

  return (
    <Button type="submit" onClick={handleRegisterClick} disabled={!isFormValid} className={loading ? 'loading' : ''} text={loading ? 'Registering...' : 'Register'}>
    </Button>
  );
};

const CardBody = ({ handleInputChange, formData, loading, isFormValid, error, handleRegister }) => {
  return (
    <div>
      <Input label="Name" name="name" value={formData.name} onChange={handleInputChange} />
      <Input label="Email" name="email" value={formData.email} onChange={handleInputChange} />
      <PasswordInput value={formData.password} onChange={handleInputChange} />
      <ConfirmPasswordInput value={formData.confirmPassword} onChange={handleInputChange} password={formData.password} />
      <RegisterButton loading={loading} isFormValid={isFormValid} onClick={handleRegister} />
      <div className="login-link">
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default Register;
