import React from 'react'
import { makeStyles } from "@mui/styles";
import {
  Hidden,
  Button,
  Typography,

} from "@mui/material"
import { Link } from "react-router-dom";
import UnfollowDialog from './UnfollowDialog';

const UserSection = ({user, isOwner }) => {

  const useProfileUserSection = makeStyles(() => ({
    button: {
      lineHeight: "unset !important",
      height: "30px !important"
    }, 
    username: {
      fontSize: "28px !important",
      fontWeight: "300 !important"
    },
    usernameSection: {
      display: 'flex',
      gridGap: 10,
      gridAutoFlow: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    usernameDivSmall: {
      display: "grid",
      // gridGap: 20,
      gridAutoFlow: "column",
      // gridTemplateColumns: "minmax(auto, max-content) minmax(auto, 112px) 30px",
      alignItems: "center",
      gridTemplateColumns: "minmax(auto, max-content) 30px",
      gridGap: 10
    },

  }))
  
  const classes = useProfileUserSection();

  const [showUnfollowDialog, setUnfollowDialog] = React.useState(false);

  let followButton;
  const isFollowing = true;
  const isFollower = false;

  if (isFollowing) {
    followButton = (
      <Button
        onClick={() => setUnfollowDialog(true)}
        variant="outlined"
        className={classes.button}
      >
        Following
      </Button>
    );
  } 
  else if (isFollower) {
    followButton = (
      <Button variant="contained" color="primary" className={classes.button}>
        Follow Back
      </Button>
    );
  } 
  else {
    followButton = (
      <Button variant="contained" color="primary" className={classes.button}>
        Follow
      </Button>
    );
  }

  return (
    <>
      <Hidden xsDown>
        <section className={classes.usernameSection}>
          <Typography className={classes.username}>{user.username}</Typography>
        </section>
      </Hidden>
      <Hidden smUp>
        <section>
          <div className={classes.usernameDivSmall}>
            <Typography className={classes.username}>
              {user.username}
            </Typography>
          </div>
          {isOwner ? (
            <Link to="/accounts/edit">
              <Button variant="outlined" style={{ width: "100%" }}>
                Edit Profile
              </Button>
            </Link>
          ) : (
            followButton
          )}
        </section>
      </Hidden>
      {showUnfollowDialog && (
        <UnfollowDialog user={user} onClose={() => setUnfollowDialog(false)} />
      )}
    </>
  );
}

export default UserSection