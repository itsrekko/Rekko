import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Stack }from "@mui/material"

import Picture from "../components/Profile/Picture";
import BioSection from "../components/Profile/BioSection";
import UserSection from "../components/Profile/UserSection";
import FollowingCountSection from "../components/Profile/FollowingCountSection";
import ProfileTabs from "../components/Profile/ProfileTabs";

import { defaultCurrentUser } from '../data/igCloneData';

const ProfilePage = () => {

  const isOwner = true;

  return (
    <Stack alignItems='center'>
      <Picture isOwner={isOwner} />
      <UserSection
        user={defaultCurrentUser}
        isOwner={isOwner}
      />
      <FollowingCountSection user={defaultCurrentUser} />
      <BioSection user={defaultCurrentUser} />
      <ProfileTabs user={defaultCurrentUser} isOwner={isOwner} />
    </Stack>
  );
}

export default ProfilePage;