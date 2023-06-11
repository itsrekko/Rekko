import React from 'react'
import { makeStyles } from "@mui/styles";
import { Avatar, Box, Typography } from '@mui/material'

const ProductReview = () => {
  const useStyles = makeStyles(() => ({
    reviewContainer: {
      width: '100%',
      boxSizing: 'border-box',
      margin: '10px',
    },
    reviewHeaderContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    rightContainer: {
      marginLeft: '10px'
    },
    reviewDescriptionContainer: {
      marginLeft: '50px'
    },
    textDescription: {
      gutterBottom: true,
      width: '100%',
      textAlign: 'left',
      paragraph: true,
      display: 'block'
    }
  }));
  const classes = useStyles();
  return (
    <Box className={classes.reviewContainer}>
      <Box className={classes.reviewHeaderContainer}>
        <Box className={classes.leftContainer}>
          <Avatar sx={{width: '40px', height: '40px'}}/>
        </Box>
        <Box className={classes.rightContainer}>
          <Typography variant='p' sx={{fontWeight: 'bold'}}>surbj</Typography>
        </Box>
      </Box>
      <Box className={classes.reviewDescriptionContainer}>
      <Typography className={classes.textDescription} variant='p'>
        Prettiest colours. Super versatile and has lasted me a long time. I use on my cheeks, lips, bridge of my nose and sometimes eyes. Love it.
      </Typography>
      </Box>
    </Box>
  )
}

export default ProductReview