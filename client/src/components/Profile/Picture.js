import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const Picture = ({size, image , isOwner}) =>
  {
    const useProfilePictureStyles = makeStyles({
      person: {
        color: "#ffffff",
        height: ({ size = 150 }) => size,
        width: ({ size = 150 }) => size
      },
      profileImageWrapper: {
        background: "#dbdbdb",
        width: ({ size = 150 }) => size,
        height: ({ size = 150 }) => size,
        borderRadius: "50%",
        display: "grid",
        position: "relative",
        placeItems: "center",
        "&:hover": {
          cursor: ({ isOwner }) => (isOwner ? "pointer" : "default")
        }
      },
      image: {
        height: ({ size = 150 }) => size,
        width: ({ size = 150 }) => size,
        borderRadius: "50%"
      }
    });
  
    const classes = useProfilePictureStyles({ size, isOwner })

    return (
    <section>
      {image ? (
        <Box className={classes.profileImageWrapper}>
          <img src={image} alt='user profile' className={classes.image} />
        </Box>
      ) : (
        <Box className={classes.profileImageWrapper}>
          <PersonIcon className={classes.person} />
        </Box>
      )}
    </section>
  )
}

export default Picture;