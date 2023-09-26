import React, { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ShopRoundedIcon from "@mui/icons-material/ShopRounded";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../images/page-logo-glow.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { UserContext } from "../context/user/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { signOut, jwt } = useContext(AuthContext);
  const { user, fetchUser } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  function refreshPage() {
    window.location.reload(false);
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <AppBar position="fixed" style={{ background: "#24022e", height: 85 }}>
      <Container maxWidth="xl">
        <Toolbar variant="dense">
          <Button
            sx={{ my: 2, display: "block" }}
            onClick={() => navigate("/home")}
          >
            <Box
              component="img"
              sx={{
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 100, md: 100 },
              }}
              alt="Reverb"
              src={logo}
            />
          </Button>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                key="home"
                onClick={() => {
                  navigate("/home");
                  refreshPage();
                }}
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>

              <MenuItem
                key="search"
                onClick={() => {
                  navigate("/search");
                  refreshPage();
                }}
              >
                <Typography textAlign="center">Search</Typography>
              </MenuItem>

              <MenuItem
                key="cart"
                onClick={() => {
                  navigate("/cart");
                  refreshPage();
                }}
              >
                <Typography textAlign="center">Cart</Typography>
              </MenuItem>

              <MenuItem
                key="cart"
                onClick={() => {
                  navigate("/musicplayer");
                  refreshPage();
                }}
              >
                <Typography textAlign="center">Library</Typography>
              </MenuItem>

              {user.role === "admin" ? (
                <MenuItem
                  key="admin"
                  onClick={() => {
                    navigate("/admin");
                    refreshPage();
                  }}
                >
                  <Typography textAlign="center">Admin</Typography>
                </MenuItem>
              ) : null}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="home"
              onClick={() => {
                navigate("/home");
                refreshPage();
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              key="search"
              onClick={() => {
                navigate("/search");
                refreshPage();
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Search
            </Button>

            <Button
              key="cart"
              onClick={() => {
                navigate("/cart");
                refreshPage();
              }}
              sx={{ my: 2, display: "block" }}
            >
              <Tooltip title="Cart">
                <ShopRoundedIcon
                  sx={{ flexGrow: 0, mx: 1, my: 1, color: "#b750d4" }}
                />
              </Tooltip>
            </Button>

            <Button
              key="cart"
              onClick={() => {
                navigate("/musicplayer");
                refreshPage();
              }}
              sx={{ my: 2, display: "block" }}
            >
              <Tooltip title="Your music library">
                <LibraryMusicRoundedIcon
                  sx={{ flexGrow: 0, my: 1, color: "#b750d4" }}
                />
              </Tooltip>
            </Button>

            {user.role === "admin" ? (
              <Button
                key="admin"
                onClick={() => {
                  navigate("/admin");
                  refreshPage();
                }}
                sx={{ my: 2, display: "block" }}
              >
                Admin
              </Button>
            ) : null}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user.firstName}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                key="profile"
                onClick={() => {
                  navigate("/user");
                  refreshPage();
                }}
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem key="profile" onClick={handleSignOut}>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
