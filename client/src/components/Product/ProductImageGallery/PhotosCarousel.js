import React from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { makeStyles } from '@mui/styles';
import { Box, Grid } from '@mui/material';

const images = [
    {   
        key: 1,
        src: 'https://hips.hearstapps.com/hmg-prod/images/241400375-327257282527442-1338380145796027858-n-1639160533.jpg?crop=1xw:0.6xh;center,top&resize=1200:*'
    }
]

const responsive = {
    desktop: {
      breakpoint: { max: 10000, min: 1024 },
      items: 4,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
      slidesToSlide: 1
    }
};

const PhotosCarousel = (props) => {

    const useStyles = makeStyles(() => ({
        productImageCarousal: {
            width: '400px',
            height: '120px',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            '& .react-multi-carousel-track': {
                gap: '20px'
            } 
        },
        gridImage: {
            maxWidth: '100%',
            maxHeight: '100%',
            margin: '10px',
            gap: '25px'
        }
    }))
    const classes = useStyles()

    images.map((image) => console.log(image.key, image.src))
    
    return (
        <Carousel
            className={classes.productImageCarousal}
            responsive={responsive} 
            ssr 
            autoPlay={false} 
            focusOnSelect={false} 
            shouldResetAutoplay={false}
            keyBoardControl={true}>
            {images.map(image =>
                <img className={classes.gridImage} src={image.src} key={image.key} alt='test' />
            )}
        </Carousel>
    )
}


export default PhotosCarousel;
