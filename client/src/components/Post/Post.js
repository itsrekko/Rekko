import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import UserCard from "../Shared/UserCard";

import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Hidden,
  Divider,
  TextField,
  Stack
} from '@mui/material';


// import OptionsDialog from "../shared/OptionsDialog";
import { defaultPost } from "../../data/igCloneData";
import PostSkeleton from "./PostSkeleton";
import { makeStyles } from "@mui/styles";

const Post = () => {
    const [loading, setLoading] = React.useState(true);
    const [showOptionsDialog, setOptionsDialog] = React.useState(false);
    const { id, media, likes, user, caption, comments } = defaultPost;

    const usePostStyles = makeStyles(theme => ({
        postContainer: {
            background: "#fff",
            width: "100%",
            [theme.breakpoints.only("xs")]: {
              marginTop: "-35px !important"
            }
        },
        postInformationContainer: {
            display: "flex",
            border: "1px solid rgba(var(--b6a,219,219,219),1)",
            borderBottomRightRadius: "3px",
            borderTopRightRadius: "3px",
            position: "relative",
            flexDirection: "column",
            width: "100%"
        },
        postHeader: {
            borderLeft: "1px solid rgba(var(--ce3,239,239,239),1)",
            borderBottom: "1px solid rgba(var(--ce3,239,239,239),1)",
            height: "72px",
            padding: "16px",
            right: "0",
            width: "335px",
            display: "flex",
            top: 0,
            position: "absolute",
            marginRight: "0px !important",
            alignItems: "center",
            [theme.breakpoints.only("xs")]: {
                width: "100% !important",
                position: "relative !important"
            }
        },
        postImage: {
            display: "flex",
            width: "calc(100% - 335px)",
            [theme.breakpoints.only("xs")]: {
                width: "initial !important",
                position: "relative !important",
                margin: "0 auto !important",
                textAlign: "center",
                "& img": {
                maxHeight: "200px !important",
                maxWidth: "200px !important",
                objectFit: "contain !important"
                }
            }
        },
        postButtonsWrapper: {
            borderLeft: "1px solid rgba(var(--ce3,239,239,239),1)",
            bottom: "0",
            boxSizing: "border-box",
            position: "absolute",
            flexDirection: "column",
            display: "flex",
            right: "0",
            top: "72px",
            width: "335px",
            [theme.breakpoints.only("xs")]: {
                width: "100% !important",
                position: "relative !important",
                top: "0px !important"
            }
        },
        postCaptionContainer: {
            display: "flex",
            margin: "0 0 auto !important",
            order: 1,
            overflowX: "hidden",
            flexGrow: 1,
            overflow: "hidden",
            [theme.breakpoints.only("xs")]: {
                display: "none !important"
            }
            },
            postCaption: {
            overflowY: "scroll",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "5px"
        },
        moreIcon: {
          height: 24,
          width: 18,
          justifySelf: "center",
          "&:hover": {
            cursor: "pointer"
          }
        },
        image: {
          width: "100%"
        },
        postButtons: {
          display: "grid",
          gridAutoFlow: "column",
          gridTemplateColumns: "24px 24px 24px minmax(24px, auto)",
          gridGap: 16,
          order: 2,
          padding: "6px 16px 0 !important"
        },
        container: {
          padding: "0px 16px 8px !important"
        },
        username: {
          fontWeight: "600 !important",
          marginRight: "5px !important"
        },
        datePosted: {
          fontSize: "10px !important",
          order: 4,
          padding: "6px 16px !important"
        },
        textField: {
          padding: "10px 0px !important"
        },
        moreButton: {
          color: "#999 !important",
          padding: "0px !important",
          "&:hover": {
            background: "transparent !important"
          }
        },
        
    }));

    const classes = usePostStyles();

    setTimeout(() => setLoading(false), 2000);
    if (loading) return <PostSkeleton />;

    return (
        <div className={classes.postContainer}>
            <Stack className={classes.postInformationContainer}>
            {/* Post Image */}
            <div className={classes.postImage}>
                <img src={media} alt="Post media" className={classes.image} />
            </div>
            <Stack>
                {/* Post Header */}
                <div className={classes.postHeader}>
                    <UserCard user={user} avatarSize={32} />
                    <MoreVertIcon
                        className={classes.moreIcon}
                        onClick={() => setOptionsDialog(true)}
                    />
                </div>
                
                {/* Post Buttons */}
                <div className={classes.postButtonsWrapper}>
                <div className={classes.postButtons}>
                    <LikeButton />
                    <Link to={`/p/${id}`}>
                    <ModeCommentOutlinedIcon />
                    </Link>
                    <SaveButton />
                </div>
                <Typography className={classes.likes} variant="subtitle2">
                    <span>{likes === 1 ? "1 like" : `${likes} likes`}</span>
                </Typography>
                <div className={classes.postCaptionContainer}>
                    <Typography
                    variant="body2"
                    component="span"
                    className={classes.postCaption}
                    dangerouslySetInnerHTML={{ __html: caption }}
                    />
                    {comments.map(comment => (
                    <div key={comment.id}>
                        <Link to={`/${comment.user.username}`}>
                        <Typography
                            variant="subtitle2"
                            component="span"
                            className={classes.commentUsername}
                        >
                            {comment.user.username}
                        </Typography>{" "}
                        <Typography variant="body2" component="span">
                            {comment.contet}
                        </Typography>
                        </Link>
                    </div>
                    ))}
                </div>
                <Typography color="textSecondary" className={classes.datePosted}>
                    5 DAYS AGO
                </Typography>
                <Hidden xsDown>
                    <div className={classes.comment}>
                    <Divider />
                    <Comment />
                    </div>
                </Hidden>
                </div>
            </Stack>
        </Stack>
        {/* {showOptionsDialog && (
            <OptionsDialog onClose={() => setOptionsDialog(false)} />
        )} */}
        </div>
    );
}

const LikeButton = () => {
    const useLikeButtonStyles = makeStyles(theme => ({
        likes: {
            fontWeight: "600 !important",
            order: 3,
            padding: "0 16px !important",
            "&:hover": {
              cursor: "pointer"
            }
        },

        like: {
            animation: "$like-button-animation 0.45s",
            animationTimingFunction: "ease-in-out",
            transform: "scale(1)"
        },
        liked: {
            animation: "$liked-button-animation 0.45s",
            animationTimingFunction: "ease-in-out",
            transform: "scale(1)"
        },
        "@keyframes like-button-animation": {
            "0%": { transform: "scale(1)" },
            "25%": { transform: "scale(1.2)" },
            "50%": { transform: "scale(0.95)" },
            "100%": { transform: "scale(1)" }
        },
        "@keyframes liked-button-animation": {
            "0%": { transform: "scale(1)" },
            "25%": { transform: "scale(1.2)" },
            "50%": { transform: "scale(0.95)" },
            "100%": { transform: "scale(1)" }
        },
    }))
    const classes = useLikeButtonStyles();
    const [liked, setLiked] = React.useState(false);
    const Icon = liked ? ThumbDownOutlinedIcon : ThumbUpOutlinedIcon;
    const className = liked ? classes.liked : classes.like;

    function handleLike() {
        setLiked(true);
    }

    function handleUnlike() {
        setLiked(false);
    }
    const onClick = liked ? handleUnlike : handleLike;

    return <Icon className={className} onClick={onClick} />;
}

const SaveButton = () => {
    const [saved, setSaved] = React.useState(false);
    const Icon = saved ? CloseOutlinedIcon : BookmarkBorderOutlinedIcon;
    const onClick = saved ? handleRemove : handleSave;

    function handleSave() {
        console.log("save");
        setSaved(true);
    }

    function handleRemove() {
        console.log("remove");
        setSaved(false);
    }

    return <Icon sx={{justifySelf: "right"}} onClick={onClick} />;
}

function Comment() {

    const useCommentStyles = makeStyles(theme => ({
        comment: {
            order: 5
        },
        commentContainer: {
            display: "grid",
            gridAutoFlow: "column",
            gridTemplateColumns: "auto minmax(auto, 56px)",
            padding: "0px 0px 0px 16px !important"
        },
        commentButton: {
            width: "48px !important",
            padding: "unset !important"
        },
        root: {
            fontSize: "14px !important"
        },
        underline: {
            "&::before": {
                border: "none !important"
            },
            "&::after": {
                border: "none !important"
            },
            "&:hover&:before": {
                border: "none !important"
            }
        },
    }))
  const classes = useCommentStyles();
  const [content, setContent] = React.useState("");

  return (
    <div className={classes.comment}>
        <Divider />
        <div className={classes.commentContainer}>
        <TextField
            fullWidth
            value={content}
            placeholder="Add a comment..."
            multiline
            rowsMax={2}
            rows={1}
            onChange={event => setContent(event.target.value)}
            className={classes.textField}
            InputProps={{
            classes: {
                root: classes.root,
                underline: classes.underline
            }
            }}
        />
        <Button
            color="primary"
            className={classes.commentButton}
            disabled={!content.trim()}
        >
            Post
        </Button>
        </div>
    </div>
  );
}

export default Post;