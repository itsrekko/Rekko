import React from "react";
import PropTypes from 'prop-types';
import {Autocomplete, TextField}  from '@mui/material';
import { Controller} from "react-hook-form";

const CustomAutocomplete = (props) => {
    
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
        <Autocomplete
            id={props.name}
            clearOnEscape
            disablePortal
            freeSolo
            fullWidth
            options={props.options}
            onChange={onChange}
            renderInput={(params) => 
                <TextField 
                    {...params}
                    placeholder={props.placeholder}
                    label={props.label}
                    helperText={error ? error.message : null}
                    error={(invalid && isTouched) || error}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />}
        />)}
        />
    );
}

CustomAutocomplete.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.any.isRequired,
    options: PropTypes.instanceOf(Array).isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string
};

export default CustomAutocomplete;