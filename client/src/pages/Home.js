import React from "react";
import {useNavigate} from 'react-router-dom';
import CustomSearchBar from '../components/CustomSearchBar';
import '../assets/css/home.css';
import ReviewCardContainer from "../components/ReviewCardContainer";
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@material-ui/core/IconButton";

const Home = (props) => {
    const navigate = useNavigate();

    // Currently we are fetching all the data there exists for MVP. 
    // TODO: Modify this to include paged fetching
    // TODO: Fix getAllReviews to get from the path / and not /home
    const changeToReviewScreen = (event) => {
        navigate(`/review`);
    }

    return(
        <div>
             <Box sx={{ '& > button': { m: 1 } }} className="searchbar-container">
                <CustomSearchBar />
                <IconButton aria-label="add" size="large" style={{marginTop: '18px'}} onClick={changeToReviewScreen}>
                    <AddIcon />
                </IconButton>
             </Box>
            <div className = "card-container">
                <ReviewCardContainer />
            </div>
        </div>
        
    );
}

export default Home;