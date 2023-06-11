import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Grid } from '@mui/material';
import PhotosCarousel from './PhotosCarousel';

const ProductImageGallery = () => {

  const useStyles = makeStyles(() => ({
    productImageGallery: {
        boxSizing: 'border-box',
        margin: '0px',
        minWidth: '0px',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
    },
    
    productMainImage: {
      boxSizing: 'border-box',
      margin: '0px 0px 16px 0px',
      minHeight: '0px',
      position: 'relative',
      width: '400px',
    },
    image: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'cover',
      overflow: 'hidden'
    }
  }))

  const classes = useStyles()

  return (
    <Box className={classes.ProductImageGallery}>
      <Box className={classes.productMainImage}>
        <img className={classes.image} src = 'https://picsum.photos/id/1018/1000/600/' alt='test' />
      </Box>
      <PhotosCarousel />
    </Box>
  )
}

export default ProductImageGallery