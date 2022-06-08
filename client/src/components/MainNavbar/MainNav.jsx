import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import '../../assets/css/MainNavbar/MainNav.css';

/*Used from: https://mui.com/material-ui/react-app-bar/#PrimarySearchAppBar.js */

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  transition: theme.transitions.create('width'),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '12ch',
    '&:focus': {
      width: '20ch',
    },
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  align: 'left',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
    },
  },
}));

const MainNav = () => {
  return (
    <Box className="main__nav">
        <Box className="header__left">
            <img className="header__logo" src="rekkoColorLogoNoBackground.png"/>
        </Box>

        <Search className="header__input">
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
            <Box className="header__inputButtonDiv">
                <IconButton size="large" aria-label="Search" color="inherit" sx={{padding: 0, minHeight: 0, minWidth: 0, display: 'inline-block'}} >
                    <SearchIcon className="header__inputButton"/>
                </IconButton>
            </Box>
        </Search>

        <Box className="header__icons">
            <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
                <IconButton size="large" aria-label="add new reivew" color="inherit">
                    <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
                <IconButton
                    size="large"
                    aria-label="show new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Box>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
            >
                <Avatar sx={{width: 50, height: 50, objectFit: 'cover'}}/>
            </IconButton>
        </Box>
    </Box>
  );
}

export default MainNav;
