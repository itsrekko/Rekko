import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import CustomSearchBar from '../components/CustomSearchBar';
import '../assets/css/home.css';
import ReviewCardContainer from "../components/ReviewCardContainer";
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import axios from 'axios';
import ReviewCard from '../components/ReviewCard';
import {PICTURES_API} from '../consts/awsConsts';
import {useGlobalState} from '../context/GlobalState';

const Home = (props) => {
    const [state, setState] = useGlobalState({reviewCards: []});
    const navigate = useNavigate();

    useEffect(async () => {
        await axios.get(`${window.location.origin.toString()}/review/getAllReviews`, {})
        .then(res => {
            let allReviews = [];
            res.data.data.forEach(x => {
                // fetch the particular picture from s3 here
                // get pre-signed URL using APIGateway
                const pictureName = x['ImageName'];
                var data = JSON.stringify({
                    "fileName": pictureName
                });

                var config = {
                    method: 'post',
                    url: PICTURES_API.GET_PICTURE_URL,
                    data : data
                };

                var imgObj = axios(config);
                allReviews.push(
                    <ReviewCard
                        id={x['_id']}
                        key={x['_id']}
                        timeStamp={`${(new Date(x['ReviwedAt'])).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric'})} at ${(new Date(x['ReviwedAt'])).toLocaleString('default', { timeStyle: 'long'})}`} 
                        brandName={x['Product']['ProductBrand']} 
                        productName={x['Product']['ProductName']} 
                        reviewText={x['ReviewText']}
                        likes={x['Likes']}
                        userName={x['User']['UserName']}
                        imageObj={imgObj}
                    />
                )
            });
            setState({...state, allReviewCards: allReviews});
        })
        .catch(error => {
            console.error(`Error fetching all the reviews while mounting the home page with error: ${error}`);
        })
    }, [])

    // Currently we are fetching all the data there exists for MVP. 
    // TODO: Modify this to include paged fetching
    // TODO: Fix getAllReviews to get from the path / and not /home
    const changeToReviewScreen = (event) => {
        navigate(`/review`);
    }

    return (
        <div>
             <Box sx={{ '& > button': { m: 1 } }} className="searchbar-container">
                <CustomSearchBar />
                <IconButton
                    aria-label="add"
                    style={{marginTop: '18px'}}
                    onClick={changeToReviewScreen}
                    size="large">
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