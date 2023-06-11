import React, { useState } from "react";
import {CardContent, CardMedia, CardActionArea, Typography, Card, Box, Stack, Avatar, AvatarGroup} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from 'react-router-dom';
import '../../../assets/css/constants.css';
import PropTypes from 'prop-types';
import pillowTalk from '../../../pillow-talk-packshot.jpeg';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,        
        border: "none",
        boxShadow: "none",
        margin: '10px',
    },
    cardHovered: {
        transform: "scale3d(1.05, 1.05, 1)"
    },
    cardActionArea: {
        flexGrow: 1,
        flexDirection: 'column',
        align: 'stretch',
    }
});

const ProductCard = ({id, imageAlt, brandName, productName, productType, numLikes}) => {
    const classes = useStyles();
    const [state, setState] = useState({
        raised:false,
        shadow:1,
    });
    
    return (
        <Card   
            className={classes.root} 
            classes={{root: state.raised ? classes.cardHovered : ""}}
            onMouseOver={()=>setState({ raised: true, shadow:3})}
            onMouseOut={()=>setState({ raised:false, shadow:1 })}
            raised={state.raised} 
            zdepth={state.shadow}
            id={id}
        >
            <CardActionArea className={classes.cardActionArea} component={RouterLink} to={"/product/" + id} >
                <CardMedia
                        component="img"
                        image={pillowTalk}
                        alt={imageAlt}
                        loading="lazy"
                />
                <CardContent>
                <Typography variant="body2" align='left' component="p" className="roboto-semi-bold-pine-cone-18px">
                    {brandName}
                </Typography>
                <Typography variant="body2" align='left' component="p" className="roboto-semi-bold-pine-cone-15px">
                    {productName}
                </Typography>
                <Stack pt={1} direction="row" align="center">
                    <Box mr={1} sx={{ width: 13, height: 13, borderRadius: 6.5,  backgroundColor: 'var(--perano)'}} />
                    <Typography variant="body2" align='left' component="p" className="roboto-normal-pine-cone-14px">
                        {productType}
                    </Typography>
                </Stack>
            <Stack direction="row" sx={{alignItems: "center", textAlign: "center", justifyContent: 'flex-start'}} pt={2}>
                <AvatarGroup max={3} align='left' spacing='small'>
                    <Avatar alt="Remy Sharp"/>
                    <Avatar alt="Travis Howard"/>
                </AvatarGroup>
                <Typography variant="body2" alignItems='center' component="p" className="roboto-bold-pine-cone-15px">
                    2,273 people rekko'd
                </Typography>
            </Stack>
            </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ProductCard;