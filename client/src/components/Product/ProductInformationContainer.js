import React from 'react'
import { makeStyles } from "@mui/styles";
import { Box, Typography } from '@mui/material';
import styled from "styled-components";
import ProductReviews from './ProductReviews';

const Circle = styled.div`
width: 15px;
height: 15px;
border-radius: 50%;
background-color: black;
margin: 2px;
`;

const ProductInformationContainer = () => {
    const useStyles = makeStyles(() => ({
        productInfoContainer: {
            backgroundColor: '#efefef',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            minHeight: '100vw'
        },
        productHeading: {
            fontWeight: 'bold',
            fontFamily: 'var(--primaryFont)',
            marginBottom: '1rem',
        },
        productDescription: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'space-around',
            justifyContent: 'space-around',
        },
        productType: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginRight: '40px',
        }
    }));

    const classes = useStyles();

    return (
    <Box id = 'ProductDescriptionContainer' className={classes.productInfoContainer}>
        <Typography variant='h3' className={classes.productHeading}>ILIA</Typography>
        <Typography variant='h5' className={classes.productHeading}>MultiStick</Typography>
        <Box className={classes.productDescription}>
            <Box className={classes.productType}>
                <Circle />
                <Typography variant='p'>Blush</Typography>
            </Box>
            <Box className={classes.priceContainer}>
                <Typography variant='p'>$53</Typography>
            </Box>
        </Box>
        <Typography variant='h4' className={classes.productHeading}>Browse Recommendations</Typography>
        <Typography variant='p' className={classes.productHeading}>2,101 recommend this product</Typography>
        <ProductReviews />
    </Box>
  )
}

export default ProductInformationContainer