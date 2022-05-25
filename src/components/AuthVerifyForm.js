import React, {useState}  from 'react';
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginFormStyler from "../utils/LoginFormStyler";
import Grid from '@mui/material/Grid';

const AuthVerifyForm = (props) => {
    const [localState, localSetState] = useState({
        code: undefined,
        errorCode: false,
        errorFound: false,
        errorText: '',
        helperText: 'Please enter your verification code'
    });

    const validateCode = (code) => {
        let validCode = code !== undefined && code  !== '';
        localSetState({
            ...localState,
            errorCode: !validCode
        });
        // add validation for 6 or more chars
        return validCode;
    }

    const {classes} = props;

    const handleSubmit = async (event) => {

        const codeValidate = validateCode(localState.code);
        if (!codeValidate) return;
        
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
                    id="authCode"
                    label = "Verification Code"
                    placeholder="Verification Code"
                    helperText={localState.helperText}
                    error={localState.errorCode}
                    className={classes.textField}
                    value={localState.code || ''}
                    onBlur={(event) => validateCode(event.target.value)}
                    onChange= {(event) =>{
                        localSetState({...localState, code: event.target.value});
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

AuthVerifyForm.propTypes = {
    classes: PropTypes.object.isRequired,
    handleFormSubmitAction: PropTypes.func.isRequired
};

export default withStyles(LoginFormStyler("left"))(AuthVerifyForm);
  