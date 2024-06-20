import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isBefore, subYears } from 'date-fns';
import './RegisterStyles.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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
      login(response.data.token);
      navigate('/home');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
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
              dateFormat="MM/dd/yyyy"
              placeholderText="Select your birthdate" 
              showYearDropdown
              scrollableYearDropdown
              className="react-datepicker-wrapper"
            />
          </div>
          <p>You must be 21 years or older to register.</p>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
