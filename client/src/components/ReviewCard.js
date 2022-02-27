import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from '@mui/material/Box';
import {makeStyles} from "@material-ui/core/styles";
import '../assets/css/home.css';
import axios from 'axios';
import { useGlobalState } from '../context/GlobalState';

const useStyles = makeStyles(() => ({
    button: {
        "&.MuiButton-root": {
          backgroundColor: '#6C5B57',
          width: "200px",
          "@media (max-width: 420px)": { width: "100px" },
          outerHeight: '30px',
          '&:hover': {
            backgroundColor: '#5e4f4b',
          }
        },
        "&.MuiButton-sizeLarge": "56px",
        marginLeft: '10px',
        marginRight: '10px'
      },
    }));

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

const ReviewCard = (props) => {

    const [globalState, setGlobalState] = useGlobalState();
    const [state, setState] = useState(
        {   likes: props.likes,
            hasLiked: props.likes.includes(globalState.userName)
        });
    
    const navigate = useNavigate();
    const classes = props.classes;
    
    let buttonText = state.hasLiked === true ? 'Unlike' : 'Like';

    const handleLikeButton = async (event) => {
        if (globalState.userName !== '') {
            await axios.put(`${window.location.origin.toString()}/review/likes`, {
                userName: globalState.userName,
                reviewId: props.id,
                hasUserLiked: state.hasLiked
            })
            .then(res => {
                setState(prevState => ({
                    likes: JSON.parse(res.data['data']),
                    hasLiked: !prevState.hasLiked}));
            });
        } else {
            console.error('User name is set to empty');
            navigate('/'); // Take them to the login page
        }
    }

    return (
        <div className='card-row'>
            <Card className='card'>
            <CardContent>
                <Typography gutterBottom fontStyle='italic' align='left' color="textSecondary" component="h5">
                    <Box sx={{ fontStyle: 'italic', fontSize: '18px' }}>{props.heading}</Box>
                </Typography>
                <Typography gutterBottom align='left' component="h6">
                    {props.brandName}
                </Typography>
                <Typography gutterBottom align='left' variant="h5" component="h5">
                    {props.productName}
                </Typography>
                <Typography variant="body2" align='left' color="textSecondary" component="p">
                    {props.reviewText}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button
                    id="like"
                    variant="contained" 
                    size="medium"
                    className={classes.button}
                    style={{
                        textTransform: 'none',
                        marginTop: '15px',
                        minHeight: '45px',
                        maxHeight: '45px',
                    }}
                    onClick={() => handleLikeButton()}
                >
                <Typography style={{
                        fontWeight: 550,
                        lineHeight: '21.47px',
                        fontSize: '17px',
                        color: '#FFFFFF'
                }}>
                        {buttonText}
                    </Typography>
                </Button>
                <Typography variant="body2" align='left' color="textSecondary" component="p">
                    Liked By {state.likes.length} users
                </Typography>
            </CardActions>
        </Card>
    </div>
    )
}

ReviewCard.propTypes = {
    id: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    brandName: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    reviewText: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired
}

export default withMyHook(ReviewCard);
