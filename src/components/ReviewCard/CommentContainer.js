import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/reviewCard.css';
import axios from 'axios';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { API_URLs } from '../../consts/awsConsts';

const CommentContainer = (props) => {
    const [comments, setComments] = useState([]);

    useEffect(async () => {
        await axios.get(`${API_URLs.REKKO_REST_API}/comment/getCommentsForReview`, {
            params: {
                reviewId: props.reviewId
            }
        }).then(
            res=> {
                if (res.data !== null && res.data !== undefined) {
                    setComments(res.data)
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