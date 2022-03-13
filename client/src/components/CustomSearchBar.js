import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import LoginFormStyler from '../utils/LoginFormStyler';
import axios from 'axios';
import {useGlobalState} from '../context/GlobalState';
import {PICTURES_API} from '../consts/awsConsts';
import ReviewCard from './ReviewCard/ReviewCard';

const CustomSearchBar = (props) => {
  const [globalState, globalSetState] = useGlobalState();
  const [state, setState] = useState({ searchVal: ''});
  const {classes} = props;
  let currentReviews = globalState.allReviewCards;

  const refreshAllReviews = async (event) => {
    await axios.get(`${window.location.origin.toString()}/review/getAllReviews`, {})
      .then(res => 
        {
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
                  key={x['_id']}
                  id={x['_id']}
                  timeStamp={`${(new Date(x['ReviwedAt'])).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric'})} at ${(new Date(x['ReviwedAt'])).toLocaleString('default', { timeStyle: 'long'})}`} 
                  brandName={x['Product']['ProductBrand']} 
                  productName={x['Product']['ProductName']} 
                  reviewText={x['ReviewText']}
                  imageAlt = {pictureName}
                  imageObj = {imgObj}
                  likes={x['Likes']}
                  userName={x['User']['UserName']}
              />);
          currentReviews = allReviews;
          globalSetState({...globalState, allReviewCards: allReviews});
      })})
      .catch(error => {
          console.error(`Error fetching all the reviews while mounting the home page with error: ${error}`);
      })
  }

  const handleSubmit = async (event) => {
    if (state.searchVal === ''){
      await refreshAllReviews();
      return;
    }
    await axios.get(`${window.location.origin.toString()}/review/searchThroughEntireReview`, {
      params: {
        reviewRegex: state.searchVal
      }
    })
    .then(res => {
      let allFetchedReviews = [];
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
          allFetchedReviews.push(
          <ReviewCard 
            key={x['_id']}
            id={x['_id']}
            timeStamp={`${(new Date(x['ReviwedAt'])).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric'})} at ${(new Date(x['ReviwedAt'])).toLocaleString('default', { timeStyle: 'long'})}`} 
            brandName={x['Product']['ProductBrand']} 
            productName={x['Product']['ProductName']}
            reviewText={x['ReviewText']}
            likes={x['Likes']}
            userName={x['User']['UserName']}
            imageObj={imgObj}
          />)}
        );
      globalSetState({...globalState, allReviewCards: allFetchedReviews});
    })
    .catch(error => {
        console.error(`Error fetching all the reviews while mounting the home page with error: ${error}`);
    });
  }

  return (
    <TextField
      id="home-search-bar"
      placeholder="Search by category, product or reviewer"
      className={classes.searchTextField}
      value={state.searchVal}
      onChange={(event) => {
          setState({...state, searchVal: event.target.value})
          if (event.target.value === ''){
            refreshAllReviews();
            return;
          }
        }
      }
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          handleSubmit();
          event.preventDefault();
        }
      }}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        style: {
          fontSize: '13px'
        },
        classes: {
          root: classes.cssLabel,
          focused: classes.cssFocused,
        },
      }}
      InputProps={{
        inputProps: {
          style: { textAlign: "center", fontSize: '13px' },
        },
        endAdornment: (
          <InputAdornment position="start">
              <IconButton onClick={handleSubmit} size="large">
                <SearchIcon />
              </IconButton>
          </InputAdornment>
          ),
        classes: {
          root: classes.cssOutlinedInput,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
        },
        inputMode: 'numeric',
      }}
    />
  );
}

CustomSearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(LoginFormStyler("center"))(CustomSearchBar);