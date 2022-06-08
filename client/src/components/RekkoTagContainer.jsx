import React, {useState, useEffect} from "react";
import '../assets/css/constants.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../assets/css/RekkoTagContainer.css';
import tags from '../testData/tagsData';
import { Container, makeStyles } from '@material-ui/core';
import { Chip } from "@material-ui/core";

const responsive = {
  desktop: {
    breakpoint: { max: 10000, min: 1024 },
    items: 9,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 8,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
    slidesToSlide: 1
  }
};

const useStyles = makeStyles((theme) => ({
  chip: {
    // backgroundColor: var(--bone),
    display: "flex",
    height: "31px",
    borderRadius: "40px",
    justifyContent: "center",
    flexWrap: "nowrap",
    margin: theme.spacing(0.5),
    overflow: "auto",
  },
}));


const RekkoTagContainer = () => {
  const classes = useStyles();
  const [selectedChip, setSelectedChip] = useState("chip_id_1");

  const handleClickOnTag = (tagKey) => {
    console.log("Clicked on tagKey: ", tagKey);
    setSelectedChip(tagKey);
  }

  useEffect(() => {
    let storedSelectedChipOnMount;
    try {
      storedSelectedChipOnMount = JSON.parse(window.localStorage.getItem('selectedChip'));
    } catch (err) {
      // 👇️ This runs
      console.log('Error: ', err.message);
    }
    console.log(storedSelectedChipOnMount);
    if (storedSelectedChipOnMount !== undefined) {
      setSelectedChip(storedSelectedChipOnMount);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('selectedChip', selectedChip);
  }, [selectedChip]);

  return (
      <Carousel className="container-center-horizontal" 
                containerClass="container-with-dots"
                responsive={responsive} 
                centerMode={true}
                additionalTransfrom={0}
                autoPlay={false} 
                focusOnSelect={false} 
                shouldResetAutoplay={false} 
                keyBoardControl={true}
                renderButtonGroupOutside={true}
      >

      { tags.map(
        tag => 
        <Chip
          key={tag.key}
          onClick={() => handleClickOnTag(tag.key)}
          size="small"
          label={<span className="roboto-medium-pine-cone-20px">{tag.label}</span>}
          className={classes.chip}
        />)
      }
    </Carousel>
      
  );
}

export default RekkoTagContainer;