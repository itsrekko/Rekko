import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Typography, Avatar} from "@material-ui/core";
import '../assets/css/reviewCard.css';

const Comment = (props) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [state, setState] = useState(
        {   
            likes: props.likes,
            hasLiked: props.likes.includes(globalState.userName)
        });

    const handleLikeButton = async (event) => {
        if (globalState.userName !== '') {
            await axios.put(`${window.location.origin.toString()}/comment/likes`, {
                userName: globalState.userName,
                id: props.id,
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
        return(
            <div className="reviewCard__commentBox">
                    <Avatar 
                        aria-label="recipe"
                        className="reviewCard__avatar"
                        alt={props.userName}
                    >
                        {props.userName.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" align='left' component="p">{props.text}</Typography>
            </div>
    )
}

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired
}

export default Comment;
