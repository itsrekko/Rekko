import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import LoginFormStyler from '../utils/LoginFormStyler';
import axios from 'axios';
import {useGlobalState} from '../context/GlobalState';

const CustomSearchBar = (props) => {
  const [state, setState] = useState({ searchVal: ''});
  const {classes} = props;
  
  const handleSubmit = async (event) => {
    await axios.get(`${window.location.origin.toString()}/review/searchByReviewText`, {
      params: {
        reviewRegex: state.searchVal
      }
    })
    .then(res => {
      console.log(res.data.data);
    })
    .catch(error => {
        console.log (`Error fetching all the reviews while mounting the home page with error: ${error}`);
    });
  }

  return (
      <TextField
        id="home-search-bar"
        placeholder="Search for a product or friend"
        className={classes.searchTextField}
        value={state.searchVal}
        onChange={(event) => setState({...state, searchVal: event.target.value})}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          inputProps: {
            style: { textAlign: "center" },
          },
          endAdornment: (
            <InputAdornment position="start">
                <IconButton onClick={handleSubmit}>
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