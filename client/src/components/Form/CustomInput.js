import React from "react";
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import {TextField}  from '@mui/material';
import {InputStyler} from "../../assets/js/InputStyler";
import { Controller} from "react-hook-form";

const CustomInput = (props) => {
    
    const {classes} = props;

    return (
        <Controller
            control={props.control}
            name={props.name}
            rules={{
                required:{
                    value: true,
                    message: `${props.name} value is required`
                }
            }}
            render={({
                field: { onChange, value},
                fieldState: { invalid, isTouched, error }
            }) => (
        <TextField
            id={props.name}
            label={props.label}
            placeholder={props.placeholder}
            value={value}
            multiline={props.isMultiline}
            helperText={error ? error.message : null}
            onChange={onChange}
            fullWidth
            rows={4}
            error={(invalid && isTouched) || error}
            InputLabelProps={{
                shrink: true
            }}
            InputProps={{
                inputProps: {
                style: { textAlign: "left" },
                },
                inputMode: 'numeric',
            }}
        />
        )}
        />
    );
}

CustomInput.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.any,
    label: PropTypes.string,
    isMultiline: PropTypes.bool
};

export default withStyles(InputStyler)(CustomInput);