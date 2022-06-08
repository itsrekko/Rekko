import React from "react";
import '../assets/css/home.css';
import MainNav from '../components/MainNavbar/MainNav';
import ProductCardCarousal from '../components/ProductCardCarousal';
import RekkoTagContainer from "../components/RekkoTagContainer";
import {Stack} from "@mui/material";

// fetch all the tags and then create the carousal from the product

const Home = () => {
    return(
        <Stack>
            <MainNav />
            <RekkoTagContainer />
            <Stack spacing={2}>
                <ProductCardCarousal />
                <ProductCardCarousal />
                <ProductCardCarousal />
                <ProductCardCarousal />
            </Stack>
        </Stack>
    );
}

export default Home;