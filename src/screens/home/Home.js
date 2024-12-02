import React, { useContext } from "react";
import "./Home.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Container } from "@mui/material";

function Home() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="home" id={theme}>
      <div className="text-area">
        <h1>URBAN CULT</h1>
        <h4>Make your everyday look prettier with our clothing</h4>
      </div>
    </div>
  );
}

export default Home;
