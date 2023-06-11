import React from "react";
import { Divider, Tabs, Tab} from "@mui/material";
import GridOnIcon from '@mui/icons-material/GridOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import GridItem from "./RekkoGrid/ProfileRekko";
import ProfileRekkos from "./RekkoGrid/ProfileRekkos";
import SavedRekkos from "./RekkoGrid/SavedRekkos";

import { makeStyles } from "@mui/styles";

const commonIconProps = {
  // backgroundImage: `url(${IconSheet2})`,
  backgroundRepeat: "no-repeat",
  height: 12
};

const useProfileTabsStyles = makeStyles(theme => {
  const rekkosIconSmallGrey = {
    ...commonIconProps,
    // backgroundImage: `url(${IconSheet})`,
    backgroundPosition: "-331px -199px",
    backgroundSize: "355px 344px",
    height: 24,
    width: 24
  };

  const savedIconSmallGrey = {
    ...commonIconProps,
    // backgroundImage: `url(${IconSheet})`,
    backgroundPosition: "-50px -320px",
    backgroundSize: "355px 344px",
    height: 24,
    width: 24
  };
  return {
    tabs: {
      borderBottom: "1px solid rgba(var(--b38,219,219,219),1)"
    },
    section: {
      [theme.breakpoints.up("sm")]: {
        marginTop: 24
      }
    },
    tabsIndicator: {
      [theme.breakpoints.down("xs")]: {
        display: "none"
      },
      top: 0,
      backgroundColor: "#000000 !important"
    },
    tabRoot: {
      margin: "0px 20px",
      opacity: 0.5
    },
    tabLabelIcon: {
      minHeight: "unset !important"
    },
    tabWrapper: {
      flexDirection: "row !important"
    },
    rekkosIconLarge: {
      ...commonIconProps,
      backgroundSize: "410px 396px",
      width: 12
    },
    savedIconLarge: {
      ...commonIconProps,
      backgroundSize: "410px 396px",
      width: 10
    },
    rekkosIconSmall: rekkosIconSmallGrey,
    rekkossIconSmallBlue: {
      ...rekkosIconSmallGrey,
    },
    savedIconSmall: savedIconSmallGrey,
    savedIconSmallBlue: {
      ...savedIconSmallGrey,
    },
    
    image: {
      width: "100%",
      userSelect: "none"
    },
    imageWrapper: {
      position: "relative"
    },
    rekkoMeta: {
      [theme.breakpoints.down("xs")]: {
        gridAutoFlow: "row",
        alignContent: "space-evenly"
      },
      position: "absolute",
      display: "grid",
      placeItems: "center",
      gridAutoFlow: "column",
      width: "100%",
      height: "100%",
      justifyContent: "space-evenly",
      "&:hover": {
        background: "rgba(0,0,0,0.6)",
        cursor: "pointer",
        "& > div": {
          opacity: 1
        }
      }
    },
    rekkoMetaItems: {
      color: "#ffffff",
      display: "grid",
      gridAutoFlow: "column",
      gridGap: 5,
      placeItems: "center",
      opacity: 0
    },
    likes: {
      ...commonIconProps,
      backgroundPosition: "-328px -239px",
      backgroundSize: "355px 344px",
      height: 16,
      width: 16
    },
    comments: {
      ...commonIconProps,
      backgroundPosition: "-327px -203px",
      backgroundSize: "355px 344px",
      height: 16,
      width: 18
    },
    profilePostsSection: {
      paddingTop: 60
    },
    noPicDivAlt: {
      display: "grid",
      placeItems: "center",
      "& div": {
        marginBottom: 16
      }
    },
    uploadPhotoIcon: {
      ...commonIconProps,
      backgroundSize: "410px 396px",
      backgroundPosition: "0px -273px",
      height: 62,
      width: 62
    },
    article: {
      display: "grid",
      gridTemplateColumns: "minmax(auto, 935px)"
    },
    rekkoContainer: {
      [theme.breakpoints.down("sm")]: {
        gridGap: 2
      },
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridGap: 20
    }
  };
});

function ProfileTabs({ user, isOwner }) {
  const classes = useProfileTabsStyles();
  const [value, setValue] = React.useState(0);

  return (
    <section className={classes.section}>
        <Tabs
          value={value}
          onChange={(_, value) => setValue(value)}
          centered
          classes={{ indicator: classes.tabsIndicator }}
        >
          <Tab
            icon={<GridOnIcon fill={value === 1 ? "#3897f0" : undefined}/>}
            iconPosition="start"
            label="REKKOS"
            classes={{
              root: classes.tabRoot,
              labelIcon: classes.tabLabelIcon,
              wrapper: classes.tabWrapper
            }}
          />
          {isOwner && (
            <Tab
              icon={<BookmarkBorderIcon fill={value === 1 ? "#3897f0" : undefined} />}
              iconPosition="start"
              label="SAVED"
              classes={{
                root: classes.tabRoot,
                labelIcon: classes.tabLabelIcon,
                wrapper: classes.tabWrapper
              }}
            />
          )}
        </Tabs>
      {user.rekkos.length === 0 && <Divider />}
      {value === 0 && <ProfileRekkos user={user} isOwner={isOwner} />}
      {value === 1 && <SavedRekkos />}
    </section>
  );
}

export default ProfileTabs;