import * as React from "react";
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

export default function NavBar() {
  const { theme } = React.useContext(ThemeContext);

  // Get the users array from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if a user is logged in by email
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  // Fetch the logged-in email from localStorage
  const loggedInEmail = localStorage.getItem("loggedInEmail");

  React.useEffect(() => {
    if (loggedInEmail) {
      const user = users.find((user) => user.email === loggedInEmail);
      setLoggedInUser(user);
    }
  }, [loggedInEmail, users]);

  const userName = loggedInUser ? loggedInUser.name : null;

  return (
    <Box sx={{ flexGrow: 1, alignItems: "center" }}>
      <AppBar position="relative" className="nav-bar" id={theme} elevation={0}>
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
            >
              HOME
            </Button>
            <Button
              variant="text"
              sx={{
                color: theme === "dark" ? "#ffffff" : "#000000",
                fontSize: 14,
              }}
            >
              PRODUCTS
            </Button>
            <Button
              variant="text"
              sx={{
                color: theme === "dark" ? "#ffffff" : "#000000",
                fontSize: 14,
              }}
            >
              CATEGORIES
            </Button>
          </Box>

          <ModeToggle />
          <Button
            variant="text"
            sx={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
          >
            <ShoppingCartIcon size={"20px"} />
          </Button>

          {/* Display Hi, Name if user is logged in */}
          {userName ? (
            <Typography
              variant="body1"
              sx={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
            >
              Hi, {userName}
            </Typography>
          ) : (
            <Button
              variant="text"
              sx={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
            >
              <AccountCircleIcon size={"20px"} />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
