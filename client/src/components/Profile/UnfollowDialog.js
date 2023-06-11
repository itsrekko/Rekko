import React from 'react'
import { makeStyles } from "@mui/styles";
import {
    Box,
    Button,
    Typography,
    Dialog,
    Zoom,
    Divider,
    Avatar
  } from "@mui/material"

const UnfollowDialog = ({onClose, user}) => {
    
    const useProfilePageStyles = makeStyles(theme => ({
        unfollowDialogScrollPaper: {
            display: "grid",
            gridTemplateColumns: "minmax(auto, 496px)"
        },
        cancelButton: {
            padding: "12px 8px !important"
        },
        unfollowButton: {
            color: `${theme.palette.error.main} !important`,
            padding: "12px 8px !important"
        },
    }))

    const classes = useProfilePageStyles()

    return (
      <Dialog
        open
        classes={{
          scrollPaper: classes.unfollowDialogScrollPaper
        }}
        onClose
        TransitionComponent={Zoom}
      >
        <Box className={classes.wrapper}>
          <Avatar
            src={user.profile_image}
            alt={`${user.username}'s avatar`}
            className={classes.avatar}
          />
        </Box>
        <Typography
          align="center"
          variant="body2"
          padding= "16px 16px 32px !important"
        >
          Unfollow @{user.username}?
        </Typography>
        <Divider />
        <Button className={classes.unfollowButton}>Unfollow</Button>
        <Divider />
        <Button onClick={onClose} className={classes.cancelButton}>
            Cancel
        </Button>
      </Dialog>
    );
}

export default UnfollowDialog