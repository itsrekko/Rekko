import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@mui/styles";

const useGridRekkoStyles = makeStyles(theme => ({
  rekkoContainer: {
    position: "relative",
    backgroundColor: 'rgb(var(38, 38, 38))',
    display: 'block',
    width: '100%',
  },
  rekkoOverlay: {
    [theme.breakpoints.down("xs")]: {
      gridAutoFlow: "row",
      alignContent: "space-evenly"
    },
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: "flex",
    placeItems: "center",
    gridAutoFlow: "column",
    justifyContent: "space-evenly",
    alignItems: 'center'
  },
  gridRekkoInfo: {
    color: "#ffffff",
    display: "grid",
    gridAutoFlow: "column",
    gridGap: 5,
    placeItems: "center",
    opacity: 0
  },
  
  comments: {
    backgroundSize: "355px 344px",
    height: 16,
    width: 18
  },
  overlayText: {
    height: 16,
    width: 16,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16

  },
  image: {
    width: "100%",
    userSelect: "none",
    height: "100%",
    overflow: "clip",
    objectFit: "cover",
    aspectRatio: 1,
    maxHeight: '400px',
    loading: "lazy",
    "&:hover": {
      opacity: 0.6,
    }
  },
}));

const ProfileRekko = ({ key, rekko }) => {
  const navigate = useNavigate();
  const classes = useGridRekkoStyles();

  console.log(rekko)
  const handleOpenRekkoModal = () => {
    navigate(`/p/${rekko.id}`,{ state: { modal: true }});
  }

  return (
    <Box className={classes.rekkoContainer}>
      <Box className={classes.rekkoOverlay} onClick={handleOpenRekkoModal}>
        <Box className={classes.gridRekkoInfo}>
          <Typography className={classes.overlayText}>{rekko.likes}</Typography>
        </Box>
        <Box className={classes.gridRekkoInfo}>
          <Typography className={classes.overlayText}>{rekko.comments.length}</Typography>
        </Box>
      </Box>
      <img
        src={rekko.media}
        alt='Post cover'
        className={classes.image}
      />
    </Box>
  )
}

export default ProfileRekko;
