import React, {useState, useEffect, useCallback, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextField, Button} from "@mui/material";
import { useGlobalState } from '../context/GlobalState';
import '../assets/css/reviewCard.css';
import axios from 'axios';
import Comment from './Comment';

const CommentInput = (props, {comments, setComments}) => {
    
    const [globalState, setGlobalState] = useGlobalState();
    const navigate = useNavigate();
    const [comment, setComment] = useState('');

    const postComment = async (event, getComments) => {
        if (globalState.userName !== '') {
            await axios.post(`${window.location.origin.toString()}/comment`, {
                userName: globalState.userName,
                reviewId: props.reviewId,
                commentText: comment
            })
            .then(
                res => {
                    getComments(res.data['data']);
                }
            )
        } else {
            console.error('User name is set to empty');
            navigate('/'); // Take users to the login page if userName not defined
        }
    }
    
    return (
        <div>
        <form className="reviewCard__inputCommentBox">
            <TextField
                className="comment__input"
                margin="normal"
                type="text"
                multiline
                variant="standard"
                value={comment}
                placeholder="Add a comment ..."
                onChange={(e) => setComment(e.target.value)}
            />
            <Button
                className="comment_button"
                onClick={(e) => postComment(e, props.getComments, props.getNumComments)}
            >
                Post
            </Button>
            </form>
        </div>
    )
}

CommentInput.propTypes = {
    reviewId: PropTypes.string.isRequired,
    getComments: PropTypes.func.isRequired
}

export default React.memo(CommentInput);