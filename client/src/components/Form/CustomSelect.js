import React from 'react';
import PropTypes from 'prop-types';
import {TextField, MenuItem} from '@mui/material';
import { Controller} from "react-hook-form";

const CustomSelect = (props) => {

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
                    select
                    fullWidth
                    placeholder={props.placeholder}
                    label={props.label}
                    helperText={error ? error.message : null}
                    style={{
                        marginBottom: '20px',
                        minHeight: '56px',
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputProps: {
                        style: { textAlign: "left" },
                        },
                        inputMode: 'numeric',
                    }}
                    value={value}
                    error={(invalid && isTouched) || error}
                    onChange={onChange}
                >
                    {(props.options).map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
)}

CustomSelect.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.any.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.instanceOf(Array).isRequired,
};

export default CustomSelect;
