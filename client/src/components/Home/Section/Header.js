import React from "react";
import { makeStyles } from "@mui/styles";
import '../../../assets/css/constants.css';
import {Typography} from "@mui/material";

const Header = (props) => {
    const useStyles = makeStyles(() => ({
        sectionHeader: {
            color: 'var(--pine-cone)',
            fontFamily: 'var(--font-family-roboto)',
            fontSize: '36px',
            fontWeight: 500,
            fontStyle: 'normal',
            letterSpacing: 0,
            paddingBottom: '0.5rem'
        },
    }))

    const classes = useStyles()

    if (props === undefined || props === null) return "";
    const {children} = props;
    
    return (
        <Typography align='left' variant="h1" className= {classes.sectionHeader}>
            {children}
        </Typography>
    );
}

export default Header;