import React, {useEffect} from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';
import {useGlobalState} from '../context/GlobalState';

const ReviewCardContainer = (props) => {
    const [state, setState] = useGlobalState({reviewCards: []});
    
    useEffect(async () => {
        await axios.get(`${window.location.origin.toString()}/review/getAllReviews`, {})
        .then(res => {
            console.log(res.data.data);
            let allReviews = [];
            res.data.data.forEach(x => allReviews.push(<ReviewCard heading={`${x['User']['UserLogin']}, ${(new Date(x['ReviwedAt'])).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric'})} at ${(new Date(x['ReviwedAt'])).toLocaleString('default', { timeStyle: 'long'})}`} brandName={x['Product']['ProductBrand']} productName={x['Product']['ProductName']} review={x['ReviewText']}/>));
            setState({...state, allReviewCards: allReviews});
        })
        .catch(error => {
            console.log (`Error fetching all the reviews while mounting the home page with error: ${error}`);
        })
    }, [])

    return(
        <div>
            {state.allReviewCards}
        </div>
    )
}

export default ReviewCardContainer;