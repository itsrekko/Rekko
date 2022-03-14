import React, { useState } from "react";
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import {TextField}  from '@mui/material';
import InputStyler from "../../assets/js/InputStyler";
import { Controller, useForm } from "react-hook-form";

const CustomInput = (props) => {
    const {handleSubmit, reset, control} = useForm();

    const onSubmit = (data) => console.log(data);

    // These style classes come from the forward Ref from styler
    const {classes} = props;

    return (
        <Controller
            control={control}
            name="test"
            render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
            }) => (
        <TextField
            id={props.id}
            label={props.label}
            value={value}
            required
            onChange={onChange}
            onBlur={onBlur}
            className={classes.textField}
            variant="outlined"
            style={{
                marginBottom: '20px',
                minHeight: '56px',
                maxHeight: '56px',
            }}
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
        />
        )}
        />
    );
}

CustomInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    onBlurCallbackFunc: PropTypes.func.required
};

export default withStyles(InputStyler)(CustomInput);