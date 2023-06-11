import React from "react";

import { Typography, Box } from "@mui/material";
import { getDefaultRekko, defaultUser } from "../../data/igCloneData";
import ProfileRekko from "../Profile/RekkoGrid/ProfileRekko";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const CircularIndeterminate = () => {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
}

const MorePostsFromUser = () => {

    const useMorePostsFromUserStyles = makeStyles(theme => ({
        article: {
          display: "grid",
          gridTemplateColumns: "minmax(auto, 935px)",
          width: "100vw"
        },
        postContainer: {
          [theme.breakpoints.down("sm")]: {
            gridGap: 2
          },
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: 20
        },
        typography: {
          fontWeight: "bold !important",
          marginBottom: `${theme.spacing(2)} !important`,
          marginLeft: `${theme.spacing(1)} !important`
        },
        container: {
          paddingTop: "6vh"
        },
        link: {
          color: "#262626",
          "&:hover": {
            textDecoration: "none"
          }
        }
    }));
    const classes = useMorePostsFromUserStyles();

    let loading = false;

    return (
        <Box className={classes.container}>
        <Typography
            color="textSecondary"
            variant="subtitle2"
            component="h2"
            gutterBottom
            className={classes.typography}
        >
            More Posts from{" "}
            <Link to={`/${defaultUser.username}`} className={classes.link}>
            @{defaultUser.username}
            </Link>
        </Typography>
        {loading ? (
            <CircularIndeterminate />
        ) : (
            <article className={classes.article}>
            <Box className={classes.postContainer}>
                {Array.from({ length: 6 }, () => getDefaultRekko()).map(post => (
                <ProfileRekko key={post.id} rekko={post} />
                ))}
            </Box>
            </article>
        )}
        </Box>
    );
}

export default MorePostsFromUser;