import { useState } from 'react';
import { toast } from 'react-toastify';
import config from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SignUp = () => {
  const [Name, setFirstName] = useState('');
  const [Last_Name, setLastName] = useState('');
  const [Address, setaddress] = useState('');
  const [Contact, setmobileNo] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setSelected] = useState('');
  const [optionList, setOptionList] = useState([]);
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!Name || !Last_Name || !Address || !Contact || !Email || !Password || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (Password !== confirmPassword) {
      toast.error('Password does not match');
      return;
    }

    // API call for registration
    axios.post(config.serverURL + '/user/SignUp', {
      Name,
      Last_Name,
      Address,
      Contact,
  
      Email,
      Password
    })
    .then((response) => {
      const result = response.data;
      if (result.status === 'error') {
        toast.error(result.message);
      } else {
        toast.success('Successfully registered a new user');
        // You can redirect or perform other actions after successful registration
        navigate('/signin');
      }
    })
    .catch((error) => {
      console.log('Error:', error);
      toast.error('Registration failed. Please try again.');
    });
  };

  return (
    <>
      <div className="card" style={{ width: '30%', margin: 'auto' }}>
        <div className="card-body">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              '& .MuiTextField-root': { mb: 2 },
              width: '300px',
              margin: 'auto',
              mt: 5,
            }}
            noValidate
            autoComplete="off"
          >
            <Typography variant="h3" sx={{ padding: '10px' }} gutterBottom>
              Register
            </Typography>

            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              size="small"
              required
              value={Name}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              size="small"
              required
              value={Last_Name}
              onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              required
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              required
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              required
              value={Password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default SignUp;
