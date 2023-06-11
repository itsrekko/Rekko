import React, {useState, useEffect} from "react";
import '../../assets/css/constants.css';
import "react-multi-carousel/lib/styles.css";
import '../../assets/css/RekkoTagContainer.css';
import tags from '../../data/tagsData';
import { Stack, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  chip: {
    backgroundColor: 'var(--bone)',
    display: "flex",
    height: "31px",
    borderRadius: "40px",
    justifyContent: "center",
    flexWrap: "nowrap",
    margin: theme.spacing(0.5),
    overflow: "auto",
    minWidth: '100px',
    hover: {

    }
  },
  tagContainer: {
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'row',
    width: '100%',
    borderBottom: '1px solid var(--cadet-blue)',
    height: '56px',
    marginBottom: '10px',
    justifyContent: "space-between",
    alignItems: 'center',
    flexShrink: 0,
    padding: '0 12px 0 12px',
  },
}));



const SectionFilterContainer = () => {
  const classes = useStyles();
  const [selectedButton, setSelectedButton] = useState("chip_id_1");

  const handleClickOnTag = (key) => {
    console.log("Clicked on key: ", key);
    setSelectedButton(key);
  }

  useEffect(() => {
    let selectedButtonOnMount;
    try {
      selectedButtonOnMount = JSON.parse(window.localStorage.getItem('selectedButton'));
    } catch (err) {
      window.localStorage.setItem('selectedButton', selectedButton);
    } finally {
      console.log(selectedButtonOnMount);
      if (selectedButtonOnMount !== undefined) {
        setSelectedButton(selectedButtonOnMount);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('selectedButton', selectedButton);
  }, [selectedButton]);

  return (
    <Stack direction="row" spacing={1} className={classes.tagContainer}>
      <Chip
          key="test"
          component="a"
          href="#test"
          clickable
          onClick={() => handleClickOnTag("test")}
          size="small"
          label={<span className="roboto-medium-pine-cone-20px">Test</span>}
          className={classes.chip}
      />
      { tags.map(
        tag => 
        <Chip
          key={tag.id}
          component="a"
          href={tag.href}
          clickable
          onClick={() => handleClickOnTag(tag.id)}
          size="small"
          label={<span className="roboto-medium-pine-cone-20px">{tag.label}</span>}
          className={classes.chip}
          
        />)
      }
    </Stack>
      
  );
}

export default SectionFilterContainer;