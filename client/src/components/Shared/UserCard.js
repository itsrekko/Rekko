import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";
import { defaultUser } from "../../data/igCloneData";
import { makeStyles } from "@mui/styles";

function UserCard({ user = defaultUser, avatarSize = 44 }) {
    
    const useUserCardStyles = makeStyles({
        avatar: {
          width: ({ avatarSize = 44 }) => avatarSize,
          height: ({ avatarSize = 44 }) => avatarSize
        },
        typography: {
          textOverflow: "ellipsis",
          overflow: "hidden"
        },
        wrapper: {
          display: "grid",
          gridAutoFlow: "column",
          gridTemplateColumns: "min-content auto",
          gridGap: 12,
          alignItems: "center",
          width: "100%"
        },
        nameWrapper: {
          overflow: "hidden",
          whiteSpace: "nowrap"
        }
      });
  
    const classes = useUserCardStyles({ avatarSize });
    const { username, name, profile_image } = user;


    return (
        <div className={classes.wrapper}>
        <Link to={`/${username}`}>
            <Avatar
            src={profile_image}
            alt="User avatar"
            className={classes.avatar}
            />
        </Link>
        <div className={classes.nameWrapper}>
            <Link to={`/${username}`}>
            <Typography variant="subtitle2" className={classes.typography}>
                {username}
            </Typography>
            </Link>
            <Typography
            color="textSecondary"
            variant="body2"
            className={classes.typography}
            >
            {name}
            </Typography>
        </div>
        </div>
    );
}

export default UserCard;