import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LoginFormStyler from "../utils/LoginFormStyler";
import Grid from '@material-ui/core/Grid';

import {useGlobalState} from '../context/GlobalState';

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
            userLogin: state.userName
        })
        .then(res => {
            console.log(res.data);
            if (res.data['data']['existingUser']){
                setState({
                    ...state,
                    userId: res.data['data']['_id'],
                    existingUser: true
                })
                navigate(`/home/${state.userName}`);
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
                alignItems={'center'}
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
  