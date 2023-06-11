import React from 'react'
import { Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";

const SavedRekkos = () => {
    const useSavedRekkosStyles = makeStyles((theme) => ({
        savedRekkosSection: {
            paddingTop: 60,
            display: "grid",
            justifyContent: "center"
          },
        noContent: {
            display: "grid",
            placeItems: "center",
            gridTemplateColumns: "minmax(auto, 345px)",
            "& *": {
              marginBottom: 16
            }
        },
    }))
    const classes = useSavedRekkosStyles()

    return (
      <section className={classes.savedRekkosSection}>
        <div className={classes.noContent}>
          <Typography variant="h4">Save</Typography>
          <Typography align="center">
            Save rekkos that you would like to save. No one else can view it again.
          </Typography>
        </div>
      </section>
    );
}

export default SavedRekkos