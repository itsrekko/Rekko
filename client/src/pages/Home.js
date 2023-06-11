import React, {useState} from "react";
import '../assets/css/home.css';
import MainNav from '../components/MainNavbar/MainNav';
import ProductCardCarousal from '../components/Home/Section/ProductCardCarousal';
import RekkoTagContainer from "../components/Home/SectionFilterContainer";
import {Stack} from "@mui/material";
import tags from "../data/tagsData";

// fetch all the tags and then create the carousal from the product

const Home = () => {
    const [currentCarousal, setCurrentCarousal] = useState(0)
    return(
        <Stack>
            <MainNav />
            <RekkoTagContainer />
            <Stack spacing={2}>
                {tags.map(tag => <ProductCardCarousal {...tag}/>)}
            </Stack>
        </Stack>
    );
}

export default Home;