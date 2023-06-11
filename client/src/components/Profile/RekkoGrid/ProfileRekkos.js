import React from "react";
import styled from "styled-components";
import { ImageList, Typography, Box  } from "@mui/material";
import GridItem from "./ProfileRekko";
import { makeStyles } from '@mui/styles'

const ProfileRekkos = ({ user, isOwner }) => {
  
  const useProfileRekkos = makeStyles((theme) => ({
    article: {
      flexGrow: 1,
      overflowY: 'visible',
    },
    rekkoGridContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '0px'
    },
    rekkoGrid: {
      alignItems: 'stretch',
      boxSizing: 'border-box',
      position: 'relative',
      gap: '1vw !important' ,
    }

  }))
  const classes = useProfileRekkos()
  console.log(user)
  if (user.rekkos.length === 0) {
    return (
      <section className={classes.profilePostsSection}>
        <Box className={classes.noContent}>
          <Box className={classes.uploadPhotoIcon} />
          <Typography variant="h4">
            {isOwner ? "Upload a Rekko" : "No Rekkos"}
          </Typography>
        </Box>
      </section>
    );
  }

  return (
    <article className={classes.article}>
      <Box className={classes.rekkoGridContainer}>
        <ImageList className={classes.rekkoGrid} cols={3}>
          {user.rekkos.map((rekko) => (
            <GridItem key={rekko.id} rekko={rekko}/>
          ))}
        </ImageList>
      </Box>
    </article>
  )
}

export default ProfileRekkos