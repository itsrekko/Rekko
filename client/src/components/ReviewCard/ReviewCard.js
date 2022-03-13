import React, {useState, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from "@mui/material/Card";
import {CardContent, CardHeader, Button, Typography, TextField, Avatar, IconButton, CardActions} from "@mui/material";
import '../../assets/css/reviewCard.css';
import axios from 'axios';
import { useGlobalState } from '../../context/GlobalState';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentContainer from './CommentContainer';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

const ReviewCard = (props) => {

    const [globalState, setGlobalState] = useGlobalState();
    
    const navigate = useNavigate();
    const [numComments, setNumComments] = useState(0);
    const [hideComments, setHideComments] = useState(false);
    const [state, setState] = useState(
        {   
            likes: props.likes,
            hasLiked: props.likes.includes(globalState.userName)
        });

    useEffect(async () => {
            const imgObj = await props.imageObj;
            console.log(imgObj);
            setState({...state, imageURL: imgObj.data});
    }, []);
    
    const handleLikeButton = async (event) => {
        if (globalState.userName !== '') {
            await axios.put(`${window.location.origin.toString()}/review/likes`, {
                userName: globalState.userName,
                reviewId: props.id,
                hasUserLiked: state.hasLiked
            })
            .then(res => {
                setState(prevState => ({
                    ...state,
                    likes: JSON.parse(res.data['data']),
                    hasLiked: !prevState.hasLiked}));
            });
        } else {
            console.error('User name is set to empty');
            navigate('/'); // Take users to the login page if userName not defined
        }
    }

    const toggleHideComments = () => {
        setHideComments(prevHideComments => !prevHideComments);
    }

    useEffect(async () => {
        await axios.get(`${window.location.origin.toString()}/comment`, {
            params: {
                reviewId: props.id
            }
        }).then(
            res=> {
                setNumComments(res.data['data'].length)
            }
        )
    }, []);

    return (
        <Card className="reviewCard">
            <CardHeader
                avatar={
                <Avatar 
                    aria-label="recipe"
                    className="reviewCard__avatar"
                    alt={props.userName}
                >
                    {props.userName.charAt(0)}
                </Avatar>
                }
                title={<Typography variant={"h6"}>{props.brandName}</Typography>}
                subheader={props.productName}
            >
            </CardHeader>
            
            <CardContent>
                <CardMedia
                    component="img"
                    image={state.imageURL}
                    alt={state.imageAlt}
                    sx={{

                    }}
                />
            </CardContent>
            <CardContent>
            <Typography variant="body2" align='left' component="p">
                <strong>{props.userName}</strong> {props.reviewText}
            </Typography>
            </CardContent>
            <IconButton aria-label="Like" onClick={() => handleLikeButton()} size="large">
                {state.hasLiked === true ? <FavoriteIcon className='reviewCard__likeButton'/>: <FavoriteBorderIcon/>}
            </IconButton>
            <IconButton aria-label="Comment" onClick={() => toggleHideComments()} size="large">
                {<ModeCommentOutlinedIcon />}
            </IconButton>
            <div className='reviewCard__actionContainer'>
            <Typography className='reviewCard__actionText' variant="body2" align='left' color="textSecondary" component="p">
                {state.likes.length} likes 
            </Typography>
            <Typography className='reviewCard__actionText' variant="body2" align='left' color="textSecondary" component="p">
                {numComments} comments 
            </Typography>
            </div>
            <CommentContainer hideComments={hideComments} reviewId={props.id} getCommentCount={useCallback((count) => setNumComments(count), [numComments])}/>
        </Card>
    );
}

ReviewCard.propTypes = {
    id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    brandName: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    reviewText: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    timeStamp: PropTypes.string.isRequired
}

export default ReviewCard;
