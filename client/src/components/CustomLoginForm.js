import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CustomStyler from "../util/CustomStyler";
import WelcomeUser from '../pages/WelcomeUser';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

class CustomRoundLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userid: ''
        }
    }

    handleChange = (username) => (event) => {
        this.setState({
          [username]: event.target.value,
        });
    };

    handleSubmit = async (event) => {
        await axios.post('check_and_create_new_user', {
            userLogin: this.state.username
        })
        .then(res => {            
            this.setState({
                userid: res.data['data']['_id']
            });

            if (res.data['data']['existingUser']){
                console.log('old user');
                // take back to the search screen
            }
            else{
                console.log('new user');
            }
            
            this.props.appContext.setState({
                username: this.state.username,
                userid: res.data['data']['_id'],
                currentScreen: <WelcomeUser appContext={this.props.appContext}/>
            })
        });
    }
    render(){
        const {classes} = this.props;
        return(
            <Grid
                container
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
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
                        fontWeight: 550,
                        lineHeight: '21.47px',
                        fontSize: '17px',
                        color: '#FFFFFF'
                    }}>
                        Continue
                    </Typography>
                </Button>
            </Grid>
        );
    }
}

CustomRoundLoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(CustomStyler("left"))(CustomRoundLoginForm);
  