import "./App.css";
import Home from "./screens/home/Home";
import { ThemeContext } from "./contexts/ThemeContext";
import { useState } from "react";
import NavBar from "./components/navBar/NavBar";
import SignIn from "./screens/signIn/SignIn";
import Products from "./screens/products/Products";

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme == "light" ? "dark" : "light"));
    console.log({ theme });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <NavBar />
        <Home />
        <SignIn />
        <Products />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
