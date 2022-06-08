import * as React from 'react';
import PropTypes from 'prop-types';
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography} from '@mui/material';

const CustomRadio = (props) => {
  return (
        <RadioGroup
            row
            name={props.name}
        >
        {(props.options).map((option) => (
            <FormControlLabel
                key={option.label} 
                value={<Typography variant={"body1"}>{option.value}</Typography>} 
                control={<Radio />} 
                label={option.label} />
        ))}
      </RadioGroup>
  );
}

CustomRadio.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.instanceOf(Array).isRequired,
};

export default CustomRadio;
