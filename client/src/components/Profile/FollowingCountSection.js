import React from 'react'
import {
    Hidden,
    Typography,
    Divider,
  } from "@mui/material"
import { makeStyles } from '@mui/styles'

const FollowingCountSection = ({user}) => {
    const useCountSectionStyles = makeStyles((theme) => ({
        followingSection: {
            [theme.breakpoints.up("sm")]: {
              display: "grid",
              gridAutoFlow: "column",
              gridGap: 40,
              gridTemplateColumns:
                "minmax(auto, max-content) minmax(auto, max-content) minmax(auto, max-content)"
            },
            [theme.breakpoints.down("xs")]: {
              display: "grid",
              gridAutoFlow: "column",
              padding: "10px 0"
            }
          },
          followingText: {
            [theme.breakpoints.up("sm")]: {
              display: "grid",
              gridGap: 5,
              gridAutoFlow: "column",
              gridTemplateColumns: "minmax(auto, max-content) minmax(auto, max-content)"
            },
            [theme.breakpoints.down("xs")]: {
              display: "grid",
              justifyItems: "center",
              "& p": {
                fontSize: "0.9rem"
              }
            }
          },
          followingCount: {
            fontWeight: "600 !important"
          },
    }))
    const classes = useCountSectionStyles();
    const options = ["rekkos", "followers", "following"];

    return (
        <>
        <section className={classes.followingSection}>
            {options.map(option => (
            <div key={option} className={classes.followingText}>
                <Typography className={classes.followingCount}>
                {user[option].length}
                </Typography>
                <Hidden xsDown>
                <Typography>{option}</Typography>
                </Hidden>
                <Hidden smUp>
                <Typography color="textSecondary">{option}</Typography>
                </Hidden>
            </div>
            ))}
        </section>
        <Hidden smUp>
            <Divider />
        </Hidden>
        
        <Hidden smUp>
            <Divider />
        </Hidden>
        </>
    );
}

export default FollowingCountSection