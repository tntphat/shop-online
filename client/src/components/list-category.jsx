import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.5em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "2px solid slategrey",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxHeight: "90vh",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  lisItem: {
    "&:hover ": {
      "& $accordion": {
        backgroundColor: "#515151",
      },
    },
  },
  accordion: {
    width: "100%",
    boxShadow: "unset",
    backgroundColor: "unset",
  },

  text: {
    paddingLeft: theme.spacing(4),
  },
}));

function NestedList({ categories }) {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          className={classes.text}
          component="div"
          id="nested-list-subheader"
        >
          Danh sách sản phẫm
        </ListSubheader>
      }
      className={classes.root}
    >
      {categories.map((category) => (
        <ListItem className={classes.lisItem} key={category._id}>
          <Accordion className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {category.name}
            </AccordionSummary>
            {category.sub_categories.map((sub_category) => (
              <AccordionDetails key={sub_category._id}>
                {sub_category.name}
              </AccordionDetails>
            ))}
          </Accordion>
        </ListItem>
      ))}
    </List>
  );
}

export default withStyles(styles)(NestedList);
