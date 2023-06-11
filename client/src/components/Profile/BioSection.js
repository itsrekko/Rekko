import React from 'react'
import { makeStyles } from "@mui/styles";
import {Typography} from "@mui/material"

const BioSection = ({user}) => {
    return (
      <section>
        <Typography sx={{fontWeight: 600}}>{user.name}</Typography>
        <Typography>{user.bio}</Typography>
      </section>
  )
}

export default BioSection