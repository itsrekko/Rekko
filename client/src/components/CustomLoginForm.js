import {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import CustomStyler from "../util/CustomStyler";
import axios from 'axios';

class CustomRoundLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    handleChange = (username) => (event) => {
        this.setState({
          [username]: event.target.value,
        });
        console.log(this.state.username)
    };

    handleSubmit = async (event) => {
        await axios.post('check_and_create_new_user', {
            userLogin: this.state.username
        })
        .then(res => {
            console.log(res.data['data']);
            if (res.data['data']['existingUser']){
                console.log('old user');
                // take back to the search screen
            }
            else{
                console.log('new user');
                // show the product component
            }
        });
    }
    render(){
        const {classes} = this.props;
        return(
            <div>
                <TextField
                    id="standard-name"
                    label="Username"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('username')}
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
                        style: { textAlign: "left" },
                        },
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        },
                        inputMode: 'numeric',
                    }}
                    style={{
                        minHeight: '54px',
                        maxHeight: '54px',
                    }}
                />
                <Button 
                    id="login-submit-button"
                    variant="contained" 
                    className={classes.button}
                    style={{
                        textTransform: 'none',
                        marginTop: '15px',
                        minHeight: '54px',
                        maxHeight: '54px',
                    }}
                    onClick={this.handleSubmit}
                >
                    <Typography style={{
                        fontWeight: 400,
                        lineHeight: '40.95px',
                        fontSize: '17px'
                    }}>
                        Continue
                    </Typography>
                </Button>
            </div>
        );
    }
}

CustomRoundLoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(CustomStyler("left"))(CustomRoundLoginForm);
  