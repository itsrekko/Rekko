import React, {useState, useEffect, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import '../assets/css/reviewCard.css';
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
                setComments(res.data['data'])
            }
        )
    }, []);

    useEffect(async () => {
        if (comments === null || comments === undefined) { 
            props.getCommentCount(0);
        } else {
            props.getCommentCount(comments.length);
        }
    }, [comments]);

    const RenderComments = () => {
        let commentList = []
        if (comments === null || comments === undefined) { 
            
        } else {
            comments.forEach(comment => {
                commentList.push(
                    <Comment key={comment['_id']} likes={comment['Likes']} userName={comment['UserName']} text={comment['Text']} id={comment['_id']} reviewId={props.reviewId}/>
            )})
        }
        return commentList;      
    }
    
    return (
        <div>
        <CommentInput reviewId={props.reviewId} getComments={useCallback((comments)=>setComments(comments))}/>
        <RenderComments/>
        </div>
    )
}

CommentContainer.propTypes = {
    reviewId: PropTypes.string.isRequired,
    getCommentCount: PropTypes.func
}

export default useMemo(CommentContainer);