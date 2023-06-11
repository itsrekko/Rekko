import React from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import ProductCard from './ProductCard';
import Header from "./Header";
import { propTypes } from "react-bootstrap/esm/Image";
import {productData } from '../../../data/testData/productData';
import { Box } from "@mui/material";
const responsive = {
    desktop: {
      breakpoint: { max: 10000, min: 1024 },
      items: 5,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1
    }
};

const ProductCardCarousal = (props) => {
    return (
        <Box id={props.id}>
          <Header> {'Rekko: ' + props.label} </Header>
        <Carousel 
          responsive={responsive} 
          ssr 
          autoPlay={false} 
          focusOnSelect={false} 
          shouldResetAutoplay={false}
          keyBoardControl={true}>
          
          {productData.map(data => (<ProductCard id={data.id} key={data.id} brandName={data.brandName} productName={data.productName} productType={data.productType} />))}
        </Carousel>
        </Box>
    )
}

ProductCard.propTypes = {
  id: propTypes.string,
  label: propTypes.string
}

export default ProductCardCarousal;
