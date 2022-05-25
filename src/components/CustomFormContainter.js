import React, {useState}  from 'react';
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginFormStyler from "../utils/LoginFormStyler";
import Grid from '@mui/material/Grid';

import {useGlobalState} from '../context/GlobalState';

const CustomFormContainer = (props) => {
    const [state, setState] = useGlobalState({
        userName: '',
        userId: '',
        existingUser: false
    });

    const [localState, localSetState] = useState({
        email: undefined,
        emailHelperText: '',
        password: undefined,
        errorEmail: false,
        errorPassword: false,
        errorFound: false,
        errorText: ''
    });

    const validateEmail = (email) => {
        const emailValidatorRegex = /\S+@\S+\.\S+/;
        const isValidEmail = emailValidatorRegex.test(email);

        localSetState({
            ...localState,
            errorEmail: !isValidEmail,
            emailHelperText: isValidEmail ? '' : 'Please provide a valid email'
        });

        return isValidEmail;
    }

    const validatePassword = (password) => {
        let validPassword =  password !== undefined && password !== '';
        localSetState({
            ...localState,
            errorPassword: !validPassword
        });
        // add validation for 6 or more chars
        return validPassword;
    }

    const {classes} = props;

    const handleSubmit = async (event) => {

        // email and password validate
        const emailValidate = validateEmail(localState.email);
        const passwordValidate = validatePassword(localState.password);

        if (!emailValidate || !passwordValidate){
            return;
        }

        props.handleFormSubmitAction(localState, localSetState);
    }

    return (
            <Grid
                container
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
            <TextField
                    id="email"
                    label = "Email"
                    placeholder="Email"
                    helperText={localState.emailHelperText}
                    error={localState.errorEmail}
                    className={classes.textField}
                    value={localState.email || ''}
                    onBlur={(event) => validateEmail(event.target.value)}
                    onChange= {(event) =>{
                        localSetState({...localState, email: event.target.value});
                        setState({...state, userName: event.target.value});
                    }}
                    margin="normal"
                    variant="outlined"
                    required={true}
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
                <TextField
                    id="password"
                    label = "Password (6 or more characters)"
                    placeholder="Password (6 or more characters)"
                    type={"password"}
                    error={localState.errorPassword}
                    className={classes.textField}
                    value={localState.password || ''}
                    required={true}
                    onBlur = {(event) => validatePassword(event.target.value)}
                    onChange= {(event) => localSetState({...localState, password: event.target.value})}
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
                <Typography 
                    variant="subtitle1" 
                    color="red"
                    style={{
                        display: localState.errorFound ? '' : 'None'
                    }}
                > 
                    <b>Error - {localState.errorText}</b> 
                </Typography>
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

CustomFormContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    handleFormSubmitAction: PropTypes.func.isRequired
};

export default withStyles(LoginFormStyler("left"))(CustomFormContainer);
  