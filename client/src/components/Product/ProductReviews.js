import React from 'react'
import { makeStyles } from "@mui/styles";
import { Box } from '@mui/material';
import ProductReview from './ProductReview';

const ProductReviews = () => {
    const useStyles = makeStyles(() => ({
        productReviewContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '90%',
        }

    }))
    const classes = useStyles()
  return (
    <Box className={classes.productReviewContainer}>
        <ProductReview />
        <ProductReview />
        <ProductReview />
        <ProductReview />
    </Box>
  )
}

export default ProductReviews