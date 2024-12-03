import React, { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, TextField } from "@mui/material";
import { ThemeContext } from "../../contexts/ThemeContext";
import ModeToggle from "../modeToggle/ModeToggle";
import "./NavBar.css";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const loggedInEmail = localStorage.getItem("loggedInEmail");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const users = useMemo(
    () => JSON.parse(localStorage.getItem("users")) || [],
    []
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
    localStorage.removeItem("loggedInEmail");
    setLoggedInUser(null);
    setUserMenuAnchorEl(null);
    navigate("/");
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate("/products", {
        state: { searchQuery: searchQuery.toLowerCase() },
      });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, alignItems: "center" }}>
      <AppBar position="relative" className="nav-bar" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, paddingLeft: 5 }}
            className="logo"
            textAlign={"left"}
            onClick={() => navigate("./")}
          >
            URBAN CULT
          </Typography>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              sx={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>HOME</MenuItem>
              <MenuItem onClick={handleMenuClose}>PRODUCTS</MenuItem>
              <MenuItem onClick={handleMenuClose}>FAVORITES</MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <div className="search">
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="gray"
                label="Search"
                size="small"
                value={searchQuery}
                onChange={(text) => setSearchQuery(text.target.value)}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  height: "36px",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  "& input": {
                    paddingLeft: "12px",
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSearch}
                disabled={!searchQuery}
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  height: "36px",
                  minWidth: "36px",
                  transition: "background-color 0.5s ease",
                  "&:disabled": {
                    backgroundColor: "#dcdcdc",
                  },
                  "&:not(:disabled)": {
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    },
                  },
                }}
              >
                <SearchIcon />
              </Button>
            </div>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Button
                variant="text"
                sx={{
                  color: theme === "dark" ? "#ffffff" : "#000000",
                  fontSize: 14,
                }}
                onClick={() => navigate("/")}
              >
                HOME
              </Button>
              <Button
                variant="text"
                sx={{
                  color: theme === "dark" ? "#ffffff" : "#000000",
                  fontSize: 14,
                }}
                onClick={() => navigate("/products")}
              >
                PRODUCTS
              </Button>
              <Button
                variant="text"
                sx={{
                  color: theme === "dark" ? "#ffffff" : "#000000",
                  fontSize: 14,
                }}
                onClick={() => navigate("/favorite")}
              >
                FAVORITES
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ModeToggle />
            <Button
              variant="text"
              sx={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartIcon size={"20px"} />
            </Button>

            {userName ? (
              <>
                <Button
                  variant="text"
                  sx={{
                    color: theme === "dark" ? "#ffffff" : "#000000",
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
                sx={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
                onClick={() => navigate("/signIn")}
              >
                <AccountCircleIcon size={"20px"} />
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
