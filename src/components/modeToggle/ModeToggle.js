import React, { useContext } from "react";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Button } from "@mui/material";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./ModeToggle.css";

function ModeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      {theme === "light" ? (
        <Button variant="text" sx={{ color: "#000000" }} onClick={toggleTheme}>
          <LightModeIcon size={"20px"} />
        </Button>
      ) : (
        <Button variant="text" sx={{ color: "#ffffff" }} onClick={toggleTheme}>
          <NightlightRoundIcon size={"20px"} />
        </Button>
      )}
    </div>
  );
}
export default ModeToggle;
