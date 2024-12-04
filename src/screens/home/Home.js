import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ThemeContext } from '../../contexts/ThemeContext';
import './Home.css';

function Home() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div>
      <div className="home">
        <div className="text-area">
          <h1>URBAN CULT</h1>
          <h4>Make your everyday look prettier with our clothing</h4>
        </div>
      </div>
      <Button
        className="explore-button"
        variant="contained"
        sx={{
          borderRadius: '20px',
          padding: '10px 20px',
          backgroundColor: theme === 'light' ? '#000000' : '#ffffff',
          color: theme === 'dark' ? '#000000' : '#ffffff',
          '&:hover': {
            backgroundColor: '#b98aac',
            color: '#000000',
          },
        }}
        onClick={() => navigate('/products')}
      >
        Explore shop
      </Button>
    </div>
  );
}

export default Home;
