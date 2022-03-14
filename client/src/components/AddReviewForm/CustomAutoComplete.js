import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Autocomplete, TextField}  from '@mui/material';

const CustomAutoComplete = (props) => {

    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleBlur = (event) => {
        props.onBlurCallbackFunc(value);
    }

    return (
        <Autocomplete
            id="combo-box-demo"
            disablePortal
            freeSolo
            options={props.options}
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={props.label} />}
        />
    );
}

CustomAutoComplete.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.instanceOf(Array),
    callbackFcn: PropTypes.func
};

export default CustomAutoComplete;