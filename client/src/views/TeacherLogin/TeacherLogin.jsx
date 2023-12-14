import { message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUser, setUserSession } from '../../Utils/AuthRequests';

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default function TeacherLogin() {
  const email = useFormInput('');
  const password = useFormInput('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    let body = { identifier: email.value, password: password.value };

    postUser(body)
      .then((response) => {
        setUserSession(response.data.jwt, JSON.stringify(response.data.user));
        setLoading(false);
        if (response.data.user.role.name === 'Content Creator') {
          navigate('/ccdashboard');
        } else if (response.data.user.role.name === 'Researcher') {
          navigate('/report');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setLoading(false);
        message.error('Login failed. Please input a valid email and password.');
      });
  };

  return (
      <div 
        id='box'
        onKeyUp={(e) => {
          if (e.key === 'Enter') handleLogin();
        }}
      tabIndex="-1"
      >
         <h2 className='login-text'>PARENT / EDUCATOR</h2>
          <input
            type='email'
            {...email}
            placeholder='Email'
            autoComplete='username'
            tabIndex="0"
          />
          <input
            type='password'
            {...password}
            placeholder='Password'
            autoComplete='current-password'
            tabIndex="0"
          />
          <p id='forgot-password' onClick={() => navigate('/forgot-password')} tabIndex="0">
            Forgot Password?
          </p>
          <input
            type='button'
            value={loading ? 'LOADING...' : 'LOGIN'}
            onClick={handleLogin}
            disabled={loading}
            tabIndex="0"
          />
      </div>
  );
}
