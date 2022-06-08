import React from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import { makeStyles } from "@mui/styles";
import Header from "./Header";

// Get the top 20 results here
// Return the 
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

const ProductCardCarousal = () => {
    return (
        <div>
          <Header> Test Header </Header>
        <Carousel 
          responsive={responsive} 
          ssr 
          autoPlay={false} 
          focusOnSelect={false} 
          shouldResetAutoplay={false}
          keyBoardControl={true}>
            <ProductCard brandName="TestBrand1" productName="TestProduct1" productType="TestType"/>
            <ProductCard brandName="TestBrand2" productName="TestProduct2" productType="TestType"/>
            <ProductCard brandName="TestBrand3" productName="TestProduct3" productType="TestType"/>
            <ProductCard brandName="TestBrand4" productName="TestProduct4" productType="TestType"/>
            <ProductCard brandName="TestBrand5" productName="TestProduct5" productType="TestType"/>
            <ProductCard brandName="TestBrand6" productName="TestProduct6" productType="TestType"/>
            <ProductCard brandName="TestBrand7" productName="TestProduct7" productType="TestType"/>
            <ProductCard brandName="TestBrand8" productName="TestProduct8" productType="TestType"/>
            <ProductCard brandName="TestBrand9" productName="TestProduct9" productType="TestType"/>
            <ProductCard brandName="TestBrand10" productName="TestProduct10" productType="TestType"/> 
        </Carousel>
        </div>
    )
}

export default ProductCardCarousal;