import React, { useState } from "react";
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import {Button, Typography}  from '@mui/material';
import {ButtonStyler} from '../../assets/js/ButtonStyler';

const CustomButton = (props) => {
    // These style classes come from the forward Ref from styler
    const {classes} = props;

    return (
        <Button 
            id={props.id}
            variant="contained"
            style={{
                textTransform: 'none',
                minHeight: '54px',
                maxHeight: '54px',
                marginBottom: '30px'
            }}
            type={props.type}
            className={classes.button}>
            <Typography style={{
                fontWeight: 550,
                lineHeight: '21.47px',
                fontSize: '17px',
                color: '#FFFFFF'
            }}>
                {props.text}
            </Typography>
        </Button>
    );
}

CustomButton.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string
};

export default withStyles(ButtonStyler)(CustomButton);