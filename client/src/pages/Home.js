import React, {useState} from "react";
import CustomSearchBar from '../components/CustomSearchBar';
import '../assets/css/home.css';
import ReviewCardContainer from "../components/ReviewCardContainer";
import Stack from "@mui/material/Stack";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@material-ui/core/IconButton";

const Home = (props) => {
    const [state, setState] = useState({reviews: []})

    // Currently we are fetching all the data there exists for MVP. 
    // TODO: Modify this to include paged fetching
    // TODO: Fix getAllReviews to get from the path / and not /home
    
    return(
        <div>
            <div className="searchbar-container">
                <div>
                    <CustomSearchBar />
                </div>
                <IconButton aria-label="add" size="large">
                    <AddIcon/>
                </IconButton>
            </div>
            <div className = "card-container">
                <ReviewCardContainer />
            </div>
        </div>
        
    );
}

export default Home;