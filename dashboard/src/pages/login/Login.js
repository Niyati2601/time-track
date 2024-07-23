import { useState } from 'react';
import './Login.scss';
import apiUrl from '../../api/ApiUrl';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdminDetails } from '../../redux/adminSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const res = await fetch(apiUrl.login.url, {
        method: apiUrl.login.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Clear input fields
        setEmail('');
        setPassword('');
        
        // Fetch admin details if login is successful
        fetchAdminDetails();

        // Navigate to the home page or dashboard
        navigate('/');
      } else {
        // Handle login failure (e.g., show an error message)
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const fetchAdminDetails = async () => {
    try {
      const res = await fetch(apiUrl.adminDetails.url, {
        method: apiUrl.adminDetails.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (data.success) {
        // Dispatch action to set admin details in Redux store
        dispatch(setAdminDetails(data.data));
      } else {
        // Handle failure to fetch admin details
        console.error('Failed to fetch admin details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching admin details:', error);
    }
  };

  return (
    <div className='login'>
      <form className='form' onSubmit={handleSubmit}>
        <h4>Time-Track</h4>
        <p>Login</p>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='off'
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type='submit' value='Login' />
      </form>
    </div>
  );
};

export default Login;
