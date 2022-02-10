import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CustomStyler from "../util/CustomStyler";;


class CustomSearchBar extends React.Component {
  state = {
    name: '',
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {classes} = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Search for a product or friend"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
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
              <InputAdornment>
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
      </form>
    );
  }
}

CustomSearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(CustomStyler)(CustomSearchBar);
