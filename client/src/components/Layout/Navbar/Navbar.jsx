import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import WeatherIcon from '../../../assets/images/weather-icon.png';

export const Navbar = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	// Get current login user
	const { user } = useContext(AuthContext);

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

	// Clear user token
	const handleLogout = () => {
		window.localStorage.removeItem('weatherapp_user');
		window.location.reload();
	};

  return (
    <AppBar position="static">
      <Container maxWidth="xl"  style={{ height: "60px" }}>
        <Toolbar disableGutters>
          <RouterLink to="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "inline-flex" }}>
              <Box
                component="img"
                alt="app icon"
                src={WeatherIcon}
                sx={{
                  height: "55px",
                  width: "auto",
                  padding: "5px",
                }}
              />
            </div>
          </RouterLink>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {user.isAdmin && (
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
            )}
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
              {user.isAdmin && (
                <MenuItem component={RouterLink} to="/cms" style={{padding:"5px 30px"}} >
                  <Typography textAlign="center">Admin Page</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user.isAdmin && (
              <Button
                component={RouterLink}
                to="/cms"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  padding: "5px",
                  borderRadius: "11%",
                  margin: "5px",
                  "&:hover": { color: "otherColor.dark" },
                }}
              >
                ADMIN PAGE
              </Button>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="View User Settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  padding: "5px",
                  borderRadius: "11%",
                  "&:hover": { color: "otherColor.dark" },
                  margin: "5px",
                }}
                color="inherit"
              >
                {user.username}
                <AccountCircle
                  sx={{ width: "35px", height: "35px", marginLeft: "5px" }}
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
              <MenuItem onClick={handleLogout} style={{padding:"5px 50px"}}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
