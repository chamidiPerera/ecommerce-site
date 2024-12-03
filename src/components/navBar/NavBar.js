import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
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
  const [searchQuery, setSearchQuery] = React.useState("");
  const loggedInEmail = localStorage.getItem("loggedInEmail");
  const [loggedInUser, setLoggedInUser] = React.useState(null);
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
              <MenuItem onClick={() => {navigate("/"); handleMenuClose();}}>HOME</MenuItem>
              <MenuItem onClick={() => {navigate("/products"); handleMenuClose();}}>PRODUCTS</MenuItem>
              <MenuItem onClick={() => {navigate("/favorites"); handleMenuClose();}}>FAVORITES</MenuItem>
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
          <Box
            className="nav-btn"
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexDirection: { xs: "row", md: "row" },
            }}
          >
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
