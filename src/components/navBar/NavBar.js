import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, TextField } from '@mui/material';
import { ThemeContext } from '../../contexts/ThemeContext';
import ModeToggle from '../modeToggle/ModeToggle';
import SearchIcon from '@mui/icons-material/Search';

import './NavBar.css';
import toast from 'react-hot-toast';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const loggedInEmail = localStorage.getItem('loggedInEmail');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const users = useMemo(
    () => JSON.parse(localStorage.getItem('users')) || [],
    [],
  );

  useEffect(() => {
    if (loggedInEmail) {
      const user = users.find((user) => user.email === loggedInEmail);
      setLoggedInUser(user);
    }
  }, [loggedInEmail, users]);

  const userName = loggedInUser ? loggedInUser.name : null;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInEmail');
    setLoggedInUser(null);
    setUserMenuAnchorEl(null);
    navigate('/');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/products', { state: { searchQuery } });
      setIsSearchOpen(false);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchOpen(true);
  };

  const handleSearchBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsSearchOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCartClick = () => {
    if (loggedInUser) {
      navigate('/cart');
    } else {
      toast.error('Please log in to access the cart');
    }
  };

  const handleFavoriteClick = () => {
    if (loggedInUser) {
      navigate('/favorites');
    } else {
      toast.error('Please log in to access the favorites page');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
      <AppBar position="relative" className="nav-bar" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, paddingLeft: 5 }}
            className="logo"
            textAlign={'left'}
            onClick={() => navigate('/')}
          >
            URBAN CULT
          </Typography>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              sx={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  navigate('/');
                  handleMenuClose();
                }}
              >
                HOME
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/products');
                  handleMenuClose();
                }}
              >
                PRODUCTS
              </MenuItem>
              <MenuItem onClick={handleFavoriteClick}>FAVORITES</MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button
                variant="text"
                sx={{
                  color: theme === 'dark' ? '#ffffff' : '#000000',
                  fontSize: 14,
                }}
                onClick={() => navigate('/')}
              >
                HOME
              </Button>
              <Button
                variant="text"
                sx={{
                  color: theme === 'dark' ? '#ffffff' : '#000000',
                  fontSize: 14,
                }}
                onClick={() => navigate('/products')}
              >
                PRODUCTS
              </Button>
              <Button
                variant="text"
                sx={{
                  color: theme === 'dark' ? '#ffffff' : '#000000',
                  fontSize: 14,
                }}
                onClick={() => navigate('/favorite')}
              >
                FAVORITES
              </Button>
            </Box>
          </Box>
          <Box
            className="nav-btn"
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexDirection: { xs: 'row', md: 'row' },
            }}
          >
            <ModeToggle />
            <IconButton
              onClick={handleSearchFocus}
              sx={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
            >
              <SearchIcon />
            </IconButton>
            {isSearchOpen && (
              <TextField
                variant="outlined"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={handleSearchBlur}
                onKeyDown={handleKeyDown}
                sx={{
                  width: '300px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '30px',
                  padding: '2px 10px',
                }}
              />
            )}
            <Button
              variant="text"
              sx={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
              onClick={handleCartClick}
            >
              <ShoppingCartIcon size={'20px'} />
            </Button>
            {userName ? (
              <>
                <Button
                  variant="text"
                  sx={{
                    color: theme === 'dark' ? '#ffffff' : '#000000',
                    fontSize: 14,
                  }}
                  onClick={handleUserMenuOpen}
                >
                  Hi, {userName}
                </Button>
                <Menu
                  anchorEl={userMenuAnchorEl}
                  open={Boolean(userMenuAnchorEl)}
                  onClose={handleUserMenuClose}
                >
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="text"
                sx={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
                onClick={() => navigate('/signIn')}
              >
                <AccountCircleIcon size={'20px'} />
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
