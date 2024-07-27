import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, Typography, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: 'Lato',
          backgroundColor: 'transparent',
          borderBottom: '1px solid #000000',
          marginBottom: '0px', // Increased margin for gap between text and input line
          '& .MuiInputBase-root': {
            height: '40px', // Single-line appearance
          },
          '& .MuiInputLabel-root': {
            fontSize: '14px',
            transform: 'translate(0, 1.5px) scale(1)',
            paddingLeft: '5px', 
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          }, 
          '& .MuiOutlinedInput-input': {
            padding: '2px 5px', // Consistent padding
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Lato',
          fontWeight: 'bold',
          color: '#565656',
          marginBottom: '0px',
          fontSize: '22.5px', // Adjusted font size
        },
      },
    },
  },
});

const SignupForm = ({ open, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log({ username, email, number, password });
    setUsername('');
    setEmail('');
    setNumber('');
    setPassword('');
    setConfirmPassword('');
    onClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '25px',
            borderRadius: '10px',
            padding: '15px',
            color: '#000000',
          }}
        >
          Sign in to MovieStreamer
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              width: '100%',
              padding: { xs: '10px', sm: '20px'},
              boxSizing: 'border-box',
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Typography>Username</Typography>
              <TextField
                placeholder=""
                type="text"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>

            <Box sx={{ width: '100%' }}>
              <Typography>Email</Typography>
              <TextField
                placeholder=""
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box sx={{ width: '100%' }}>
              <Typography>Phone Number</Typography>
              <TextField
                placeholder=""
                type="tel"
                fullWidth
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Box>

            <Box sx={{ width: '100%' }}>
              <Typography>Password</Typography>
              <TextField
                placeholder=""
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <Box sx={{ width: '100%' }}>
              <Typography>Confirm Password</Typography>
              <TextField
                placeholder=""
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Box>

            <Button
              type="submit"
              sx={{
                backgroundColor: '#D9D9D9',
                color: '#000000',
                fontWeight: 'bold',
                borderRadius: '10px',
                padding: '10px',
                alignSelf: 'center',
                width: '150px',
                textTransform: 'none',
                fontSize: '16px',
                '&:hover': {
                  backgroundColor: '#696969',
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default SignupForm;
