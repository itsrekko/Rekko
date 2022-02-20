import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import LoginFormStyler from '../utils/LoginFormStyler';
;

const CustomSearchBar = (props) => {
  const [state, setState] = useState({ name: ''});
  const {classes} = props;
  
  return (
      <TextField
        id="home-search-bar"
        placeholder="Search for a product or friend"
        className={classes.textField}
        value={state.name}
        onChange={(event) => setState({...state, name: event.target.value})}
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
                <IconButton>
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