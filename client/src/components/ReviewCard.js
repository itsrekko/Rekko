import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, Button, Typography, TextField, Avatar, IconButton} from "@material-ui/core";
import { red } from '@mui/material/colors';
import '../assets/css/reviewCard.css';
import axios from 'axios';
import { useGlobalState } from '../context/GlobalState';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Comment from './Comment';

const ReviewCard = (props) => {

    const [globalState, setGlobalState] = useGlobalState();
    const [comment, setComment] = useState('');
    const [state, setState] = useState(
        {   
            likes: props.likes,
            comments: [],
            hasLiked: props.likes.includes(globalState.userName)
        });
    
    const navigate = useNavigate();
    
    const handleLikeButton = async (event) => {
        if (globalState.userName !== '') {
            await axios.put(`${window.location.origin.toString()}/review/likes`, {
                userName: globalState.userName,
                reviewId: props.id,
                hasUserLiked: state.hasLiked
            })
            .then(res => {
                console.log(res.data['data'])
                setState(prevState => ({
                    ...prevState,
                    likes: JSON.parse(res.data['data']),
                    hasLiked: !prevState.hasLiked}));
            });
        } else {
            console.error('User name is set to empty');
            navigate('/'); // Take them to the login page
        }
    }

    const postComment = async (event) => {
        if (globalState.userName !== '') {
            await axios.post(`${window.location.origin.toString()}/comment`, {
                userName: globalState.userName,
                reviewId: props.id,
                commentText: comment
            })
            .then(
                res => {
                    setState(prevState => ({
                        ...prevState,
                        comments: res.data['data'],
                    }));
                }
            )
        } else {
            console.error('User name is set to empty');
            navigate('/'); // Take them to the login page
        }
    }

    const RenderComments = () => {
        let commentList = []
        
        state.comments.forEach(comment => {
            commentList.push(
                <Comment likes={comment['Likes']} userName={comment['UserName']} text={comment['Text']} id={comment['_id']}/>
        )})
        return commentList;      
    }

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
                {/* Insert a picture over here */}
            </CardContent>
            <CardContent>
            <Typography variant="body2" align='left' component="p">
                <strong>{props.userName}</strong> {props.reviewText}
            </Typography>
            </CardContent>
            <IconButton aria-label="Like" onClick={() => handleLikeButton()}>
                {state.hasLiked === true ?<FavoriteIcon className="reviewCard_likeButton"/>:  <FavoriteBorderIcon style={{color: red}}/>}
                
            </IconButton>
            <div className='reviewCard__actionContainer'>
            <Typography className='reviewCard__actionText' variant="body2" align='left' color="textSecondary" component="p">
                {state.likes.length} likes 
            </Typography>
            <Typography className='reviewCard__actionText' variant="body2" align='left' color="textSecondary" component="p">
                {state.comments.length} comments 
            </Typography>
            </div>
            <form className="reviewCard__inputCommentBox">
            <TextField
                className="comment__input"
                margin="normal"
                type="text"
                multiline
                value={comment}
                placeholder="Add a comment ..."
                onChange={(e) => setComment(e.target.value)}
            />
            <Button
                className="comment_button"
                onClick={(e) => postComment(e)}
            >
                Post
            </Button>
            </form>
            <RenderComments/>
        </Card>
    )
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
