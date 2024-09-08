import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, Typography, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: 'Lato',
          backgroundColor: '#F7F7F7',
          borderRadius: '8px',
          borderBottom: '1px solid #F7F7F7',
          marginBottom: '0px', 
          '& .MuiInputBase-root': {
            height: '40px',
            padding: '0px 10px', 
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
            padding: '2px 5px', 
            backgroundColor: '#F7F7F7',
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
          fontSize: '22.5px', 
        },
      },
    },
  },
});

const SignupForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log(formData);
    // Reset the form data
    setFormData({
      username: '',
      email: '',
      number: '',
      password: '',
      confirmPassword: ''
    });
    onClose();
  };

  const renderTextField = (label, name, type = 'text') => (
    <Box sx={{ width: '100%' }}>
      <Typography>{label}</Typography>
      <TextField
        name={name}
        type={type}
        fullWidth
        value={formData[name]}
        onChange={handleInputChange}
      />
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="sm" 
        fullWidth 
        PaperProps={{
          style: { 
            maxWidth: '700px',
            width: '100%',
            borderRadius: '20px',
            minHeight: '630px',
          },
        }}
      >
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
        <DialogContent
          sx={{
            borderRadius: '20px',
          }}
        >
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
            {renderTextField('Username', 'username')}
            {renderTextField('Email', 'email', 'email')}
            {renderTextField('Phone Number', 'number', 'tel')}
            {renderTextField('Password', 'password', 'password')}
            {renderTextField('Confirm Password', 'confirmPassword', 'password')}

            <Button
              type="submit"
              sx={{
                backgroundColor: '#D9D9D9',
                color: '#000000',
                fontWeight: '550',
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
