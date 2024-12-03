import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./NavBar.css";
import ModeToggle from "../modeToggle/ModeToggle";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, TextField } from "@mui/material";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState(null);
  const loggedInEmail = localStorage.getItem("loggedInEmail");
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeContext);

  const users = React.useMemo(
    () => JSON.parse(localStorage.getItem("users")) || [],
    []
  );

  React.useEffect(() => {
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
    navigate("/"); // Redirect to the home page
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate("/products", {
        state: { searchQuery: searchQuery.toLowerCase() },
      });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    navigate("/products", { state: { searchQuery: "" } });
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
            </Menu>
          </Box>
          <div className="search">
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ marginLeft: 1 }}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearSearch}
              sx={{ marginLeft: 1 }}
            >
              Clear
            </Button>
          </div>
          <Box
            sx={{
              flexGrow: 0.05,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "space-between",
              },
            }}
          >
            <Button
              className="button"
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
          </Box>

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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
