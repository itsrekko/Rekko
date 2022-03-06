import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import CustomSearchBar from '../components/CustomSearchBar';
import '../assets/css/home.css';
import ReviewCardContainer from "../components/ReviewCardContainer";
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@material-ui/core/IconButton";
import axios from 'axios';
import ReviewCard from '../components/ReviewCard';
import {useGlobalState} from '../context/GlobalState';

const Home = (props) => {
    const [state, setState] = useGlobalState({reviewCards: []});
    const navigate = useNavigate();

    useEffect(async () => {
        await axios.get(`${window.location.origin.toString()}/review/getAllReviews`, {})
        .then(res => {
            let allReviews = [];
            res.data.data.forEach(x => allReviews.push(
                <ReviewCard
                    id={x['_id']}
                    key={x['_id']}
                    timeStamp={`${(new Date(x['ReviwedAt'])).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric'})} at ${(new Date(x['ReviwedAt'])).toLocaleString('default', { timeStyle: 'long'})}`} 
                    brandName={x['Product']['ProductBrand']} 
                    productName={x['Product']['ProductName']} 
                    reviewText={x['ReviewText']}
                    likes={x['Likes']}
                    userName={x['User']['UserName']} 
                />));
            setState({...state, allReviewCards: allReviews});
        })
        .catch(error => {
            console.log (`Error fetching all the reviews while mounting the home page with error: ${error}`);
        })
    }, [])

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
                <IconButton aria-label="add" style={{marginTop: '18px'}} onClick={changeToReviewScreen}>
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