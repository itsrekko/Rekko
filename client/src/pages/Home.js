import React, {useState, useEffect} from "react";
import CustomSearchBar from '../components/CustomSearchBar';
import '../assets/css/home.css';
import ReviewCardContainer from "../components/ReviewCardContainer";
import axios from 'axios';

const Home = (props) => {
    const [state, setState] = useState({reviews: []})

    // Currently we are fetching all the data there exists for MVP. 
    // TODO: Modify this to include paged fetching
    useEffect(() => {
        axios.get('review/getAllReviews', {})
        .then(res => {
            console.log(res);
            setState({
                reviews: res.data.data
            });
        })
        .catch(error => {
            console.log (`Error fetching all the reviews while mounting the home page with error: ${error}`);
        })
    })
    
    return(
        <div>
            <div className="searchbar-container">
                <CustomSearchBar />
            </div>
            <div className = "card-container">
                <ReviewCardContainer
                    reviews = {state.reviews}
                />
            </div>
        </div>
        
    );
}

export default Home;