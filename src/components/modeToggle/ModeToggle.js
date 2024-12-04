import React, { useContext } from 'react';
import { Button } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import { ThemeContext } from '../../contexts/ThemeContext';
import './ModeToggle.css';

function ModeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      variant="text"
      sx={{ color: theme === 'light' ? '#000000' : '#ffffff' }}
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <LightModeIcon size="20px" />
      ) : (
        <NightlightRoundIcon size="20px" />
      )}
    </Button>
  );
}

export default ModeToggle;
