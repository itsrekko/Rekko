import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import '../../assets/css/MainNavbar/MainNav.css';

/*Used from: https://mui.com/material-ui/react-app-bar/#PrimarySearchAppBar.js */

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  transition: theme.transitions.create('width'),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  align: 'left',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
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
                <IconButton 
                  size="large" 
                  aria-label="Search" 
                  color="inherit" 
                  sx={{
                    padding: 0, 
                    minHeight: 0, 
                    minWidth: 0, 
                    display: 'inline-block', 
                    height: '100%',
                    width: '100%'
                  }} 
                >
                  <SearchIcon className="header__inputButton"/>
                </IconButton>
            </Box>
        </Search>

        <Box className="header__icons">
          <MenuItem>
            <IconButton 
              size="large" 
              aria-label="add new reivew" 
              color="inherit" 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
            >
              <Avatar sx={{objectFit: 'cover'}}/>
            </IconButton>
        </MenuItem>
      </Box>
    </Box>
  );
}

export default MainNav;
