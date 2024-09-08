import { useState, useEffect, useRef } from 'react'; 
import { AppBar, Toolbar, Typography, Button, TextField, InputAdornment, IconButton, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ setContent, setShowSignUp }) => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const searchContainerRef = useRef(null); 
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Movies', content: 'movies' },
    { text: 'Series', content: 'series' },
    { text: 'Contact', content: 'contact' },
    { text: 'About Us', content: 'about' },
  ];

  const handleSearchClick = () => {
    setShowSearchOverlay(true);
  };

  const handleSearchChange = async (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm.trim() !== '') {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=81f382d33088c6d52099a62eab51d967&query=${newSearchTerm}`);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      if (!recentSearches.includes(searchTerm.trim())) {
        setRecentSearches([...recentSearches, searchTerm.trim()]);
      }
      if (searchResults.length > 0) { 
        const movieId = searchResults[0].id;
        navigate(`/movie/${movieId}`);
      }
      setSearchTerm('');
      setShowSearchOverlay(false);
    }
  };

  const handleClearSearch = (index) => {
    setRecentSearches(recentSearches.filter((_, i) => i !== index));
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  const handleClickOutside = (event) => { 
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
      setShowSearchOverlay(false);
    }
  };

  useEffect(() => { 
    if (showSearchOverlay) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchOverlay]);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#ffffff',
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          flexDirection: { xs: 'column', sm: 'row'},
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography
          variant="h6"
          onClick={handleTitleClick}
          sx={{
            fontFamily: 'Lato',
            fontWeight: 1000,
            fontSize: 'clamp(18px, 3vw, 24px)',
            lineHeight: '25.2px',
            color: '#000000',
            marginRight: '110px',
            cursor: 'pointer',
          }}
        >
          MovieStreamer
        </Typography>
        <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
          {menuItems.map((item) => (
            <Button
              onClick={() => setContent(item.content)}
              color="inherit"
              sx={{
                fontFamily: 'Segoe UI',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: '26.6px',
                textAlign: 'left',
                color: '#000000',
                background: 'none',
                border: 'none',
                padding: '0',
                marginRight: '50px',
                textTransform: 'none',
                '&:hover': {
                  color: '#000000',
                },
              }}
              key={item.text}
            >
              {item.text}
            </Button>
          ))}
        </div>
        <div style={{ position: 'relative' }} ref={searchContainerRef}> 
          <TextField
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            onClick={handleSearchClick}
            onKeyPress={handleSearchSubmit}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon style={{ color: '#686868' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: '100%', sm: '300px', },
              height: '25px',
              padding: '7px 10px 10px 15px',
              borderRadius: '25px',
              background: '#E6E6E6',
              opacity: showSearchOverlay ? 1 : 0.8,
              transition: 'opacity 300ms',
              marginRight: '15px',
              '& .MuiInputBase-root': {
                borderRadius: '25px',
                color: '#686868',
              },
              '& .MuiInputAdornment-root': {
                marginRight: '8px',
              },
              '& .MuiInputBase-input': {
                padding: '0',
                color: '#686868',
                '&::placeholder': {
                  color: '#686868',
                  opacity: 1,
                  fontWeight: 545,
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          />
          {showSearchOverlay && recentSearches.length > 0 && (
            <List
              sx={{
                position: 'absolute',
                top: '125%',
                left: 0,
                width: { xs: '100%', sm: '300px' },
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '0 0 10px 10px',
                zIndex: 10,
              }}
            >
              <ListItem>
                <ListItemText 
                  primary={
                    <Typography sx={{
                      fontFamily: 'Source Sans Pro',  
                      color: '#cccccc', 
                      fontSize: '16px', 
                      fontWeight: 'bold', 
                    }}>
                      Recent Searches
                    </Typography>
                  } 
                />
              </ListItem>
              {recentSearches.map((search, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="clear" onClick={() => handleClearSearch(index)}>
                      <ClearIcon sx={{ color: '#2B2B2B' }} />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <SearchIcon sx={{ color: '#cccccc' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography sx={{ 
                        color: '#2b2b2b', 
                        fontSize: '16px', 
                        fontWeight: 700, 
                      }}>
                        {search}
                      </Typography>
                    } 
                  />
                </ListItem>
              ))}
            </List>
          )}
        </div>
        <Button
          color="inherit"
          onClick={() => setShowSignUp(true)}
          sx={{
            border: '1px solid #000000',
            borderRadius: '10px',
            padding: '5px 15px',
            fontFamily: 'Lato, sans-serif',
            fontSize: 'clamp(14px, 2vw, 16px)',
            color: '#000000',
            background: 'none',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              color: '#000000',
            },
          }}
        >
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
 
  );
};

export default NavBar;