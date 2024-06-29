import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isBefore, subYears } from 'date-fns';
import './LoginRegisterStyles.css';

function Register({ toggleForm }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState(null);
  const { login } = useContext(AuthContext);

  const is21OrOlder = (date) => {
    return isBefore(date, subYears(new Date(), 21));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!is21OrOlder(birthdate)) {
      alert('You must be 21 years or older to register.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/auth/register', { username, password, birthdate });
      login(response.data.token, username);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === 'Username already exists') {
        alert('Username already exists');
      } else {
        alert('Registration failed');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div>
            <label>Birthdate:</label>
            <DatePicker 
              selected={birthdate} 
              onChange={(date) => setBirthdate(date)} 
              dateFormat="yyyy/MM/dd"
              placeholderText="Select your birthdate" 
              showYearDropdown
              scrollableYearDropdown
              className="react-datepicker-wrapper"
            />
          </div>
          <p>You must be 21 years or older to register.</p>
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <span onClick={toggleForm} className="auth-link">Login</span></p>
      </div>
    </div>
  );
}

export default Register;
