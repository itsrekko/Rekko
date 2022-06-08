import React from "react";
import '../assets/css/constants.css';
import '../assets/css/Header.css';
import {Typography} from "@mui/material";

const Header = (props) => {
    if (props === undefined || props === null) return "";
    const {children} = props;
    return (
        <Typography align='left' variant="h1" className= "home__header roboto-medium-pine-cone-36px">
            <span className="roboto-medium-pine-cone-36px">{children}</span>
        </Typography>
    );
}

export default Header;