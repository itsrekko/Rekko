import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const styles = () => ({
  container: {
    marginTop: '25px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    backgroundColor: '#F5F5F7',
    width: '40vw',
    "@media (max-width: 1675px)": { width: "50vw" },
    "@media (max-width: 768px)": { width: "60vw" },
    "@media (max-width: 490px)": { width: "78vw" },
    borderRadius: '25px',
    "& label": {
      width: "100%",
      textAlign: "center",
      transformOrigin: "center",
        "&.Mui-focused": {
          transformOrigin: "center"
        }
     }
  },

  cssLabel: {
    color: '#A0A5BD',
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `#F5F5F7 !important`,
      borderRadius: '25px',
    },
  },

  cssFocused: {
    color: 'black',
  },

  notchedOutline: {
    borderRadius: '25px',
    borderWidth: '1px',
    borderColor: '#F5F5F7 !important',
  },
});

class CustomTextField extends React.Component {
  state = {
    name: '',
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

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

CustomTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomTextField);
