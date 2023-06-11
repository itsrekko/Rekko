import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginFormStyler from "../assets/js/LoginFormStyler";
import Grid from '@mui/material/Grid';

import {useGlobalState} from '../context/UserContext';

const CustomLoginForm = (props) => {
    const [state, setState] = useGlobalState({
            userName: '',
            userId: '',
            existingUser: false
    });

    const {classes} = props;
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        await axios.post(`${window.location.origin.toString()}/user/checkAndCreateNewUser`, {
            userName: state.userName
        })
        .then(res => {
            if (res.data['data']['existingUser']){
                setState({
                    ...state,
                    userId: res.data['data']['_id'],
                    existingUser: true
                })
                navigate(`/home`);
            }
            else{
                setState({
                    ...state,
                    userId: res.data['data']['_id'],
                    existingUser: false
                })
                navigate('/welcome');
            }
        });
    }

    return (
            <Grid
                container
                direction={'column'}
                justifyContent={'center'}
                align={'center'}
            >
            <TextField
                    id="username"
                    label = "Your first name and last initial (e.g. Meg M)"
                    placeholder="Your first name and last initial (e.g. Meg M)"
                    className={classes.textField}
                    value={state.userName}
                    onChange= {(event) => setState({...state, userName: event.target.value})}
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
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            handleSubmit();
                            event.preventDefault();
                        }
                    }}
                    InputProps={{
                        inputProps: {
                            style: { 
                                textAlign: "left",
                                fontSize: '13px'
                            },
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
                    onClick={() => handleSubmit()}
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
    )
}

CustomLoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LoginFormStyler("left"))(CustomLoginForm);
  