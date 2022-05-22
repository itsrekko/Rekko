import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Typography, Avatar, IconButton, ListItemAvatar, ListItemText} from "@mui/material";
import {API_URLs} from '../../consts/awsConsts';
import '../../assets/css/reviewCard.css';
import { useGlobalState } from '../../context/GlobalState';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Comment = (props) => {
    const navigate = useNavigate();
    const [globalState, setGlobalState] = useGlobalState();
    const [state, setState] = useState(
        {   
            likes: props.likes,
            hasLiked: props.likes.includes(globalState.userName)
        });
    
    const handleLikeButton = async (event) => {
        if (globalState.userName !== '') {
            await axios.put(`${API_URLs.REKKO_REST_API}/likes/updateCommentLikes`, {
                userName: globalState.userName,
                commentId: props.id,
                hasUserLiked: state.hasLiked
            })
            .then(res => {
                setState(prevState => ({
                    likes: JSON.parse(res.data),
                    hasLiked: !prevState.hasLiked}));
            });
        } else {
            console.error('User name is set to empty');
            navigate('/'); // Take them to the login page
        }
    }
        return (
            <div className="reviewCard__commentBox">
                <ListItemAvatar>
                    <Avatar 
                        aria-label="recipe"
                        className="reviewCard__avatar"
                        alt={props.userName}
                    >
                        {props.userName.charAt(0)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText 
                    primary ={<Typography variant="body2" align='left' component="p"> {props.text}</Typography>}
                    secondary = {<Typography variant="body2" align='left' component="p" color="textSecondary">{state.likes.length} likes</Typography>}
                />
                <IconButton
                    aria-label="Like"
                    onClick={() => handleLikeButton()}
                    edge="end"
                    size="large">
                    {state.hasLiked === true ?<FavoriteIcon className='reviewCard__likeButton'/>: <FavoriteBorderIcon/>}
                </IconButton>
            </div>
        );
}

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired
}

Comment.defaultProps = {
    likes: []
}

export default React.memo(Comment);
