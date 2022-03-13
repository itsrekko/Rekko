import React, {useState, useEffect, useCallback, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextField, Button} from "@mui/material";
import { useGlobalState } from '../../context/GlobalState';
import '../../assets/css/reviewCard.css';
import axios from 'axios';
import Comment from './Comment';
import CommentInput from './CommentInput';

const CommentContainer = (props) => {
    const [comments, setComments] = useState([]);

    useEffect(async () => {
        await axios.get(`${window.location.origin.toString()}/comment`, {
            params: {
                reviewId: props.reviewId
            }
        }).then(
            res=> {
                if (res.data['data'] !== null && res.data['data'] !== undefined) {
                    setComments(res.data['data'])
                }
            }
        )
    }, []);

    useEffect(async () => {
        props.getCommentCount(comments.length);
    }, [comments]);

    const RenderComments = () => {
        let commentList = []
        comments.forEach(comment => {
            commentList.push(
                <Comment key={comment['_id']} likes={comment['Likes']} userName={comment['UserName']} text={comment['Text']} id={comment['_id']} reviewId={props.reviewId}/>
        )})
        return commentList;      
    }
    
    return (
        <div>
        <CommentInput reviewId={props.reviewId} getComments={useCallback((comments)=>setComments(comments))}/>
        {props.hideComments && <RenderComments/>}
        </div>
    )
}

CommentContainer.propTypes = {
    reviewId: PropTypes.string.isRequired,
    getCommentCountCallback: PropTypes.func,
    hideComments: PropTypes.bool
}

export default React.memo(CommentContainer);