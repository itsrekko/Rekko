import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, TextField, Grid, Typography, withStyles} from '@material-ui/core';
import LoginFormStyler from "../utils/LoginFormStyler";
import {validateEmail, MIN_PASSWORD_LENGTH} from '../utils/validation';
import axios from 'axios';

const CustomRegisterForm = (props) => {

    const [state, setState] = useState({
        userName: '',
        email: '',
        password: '',
        repeatPassword: '',
        onUserNameError: false,
        onEmailError: false,
        onPasswordError: false,
        onRepeatPassword: false,
        onSubmitError: false,
        userNameErrorMessage: 'SUCCESS',
        emailErrorMessage: 'SUCCESS',
        passwordErrorMessage: 'SUCCESS',
        repeatPasswordEmailMessage: 'SUCCESS',
        formErrorMessage: 'SUCCESS'
    });

    const {classes} = props;

    const validateLoginEmail = (email) => {
        if (email.length === 0) {
            setState({...state, onEmailError: true, emailErrorMessage: "Email is required"})
        } else if (!validateEmail(email)) {
            setState({...state, onEmailError: true, emailErrorMessage: "Invalid email syntax"})
        } else {
            setState({...state, onEmailError: false, emailErrorMessage: "SUCCESS"})
        }
    }

    const validatePassword = (password) => {
        if (password.length === 0) {
            setState({...state, onPasswordError: true, passwordErrorMessage: "Password is required"})
        } else if (password.length < MIN_PASSWORD_LENGTH){
            setState({...state, onPasswordError: true, passwordErrorMessage: "Password must be greater than 8 characters"})
        } else {
            setState({...state, onPasswordError: false, passwordErrorMessage: "SUCCESS"})
        }
    }

    const handleSubmit = async (event) => {
        // axios to create a new user 
        
    }

    const renderCustomTextField = (id, label, placeholder, type, validateFunction, value, onError, errorMessage) => {
        
        return(
        <TextField
            id={id}
            label = {label}
            placeholder={placeholder}
            type={type}
            className={classes.textField}
            value={value}
            error={onError}
            helperText={onError ? errorMessage : ' '}
            required
            autoFocus
            fullWidth
            onChange= {(event) => setState({...state,[id]: event.target.value})}
            onBlur = {(event) => validateFunction(event.target.value)}
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
        />)
    }

    return (
    <div>
    <Grid
        container
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
    >
    {renderCustomTextField(
        "email", 
        "Email",
        "Please input email address",
        "text",
        validateLoginEmail,
        state.email,
        state.onEmailError,
        state.emailErrorMessage)}
    {renderCustomTextField(
        "password",
        "Password",
        "Enter password more than 8 characters",
        "password",
        validatePassword,
        state.password,
        state.onPasswordError,
        state.passwordErrorMessage)}
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
                Sign In
            </Typography>
        </Button>
    </Grid>
    </div>
    )
}

CustomRegisterForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LoginFormStyler("left"))(CustomRegisterForm);