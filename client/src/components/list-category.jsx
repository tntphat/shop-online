import React from "react";
import { useLocation, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
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
  link: {
    color: theme.palette.text.main,
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.navBar.main,
    },
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function NestedList(props) {
  const classes = useStyles();
  let query = useQuery();
  const { categories, history, match } = props;
  const handleCLick = (e) => {
    e.stopPropagation();
  };
  const clearQuery = (e) => {
    e.stopPropagation();
    query.delete("sub");
  };
  const handleNavigate = (field, value, e) => {
    e.stopPropagation();
    query.set(field, value);
    history.replace({
      search: query.toString(),
    });
  };
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
              {/* <Link
                className={classes.link}
                to={`/products/filter/${category.slug}?kw=helo`}
                onClick={(e) => handleCLick(e)}
              > */}
              <span
                className={classes.link}
                onClick={(e) => {
                  clearQuery(e);
                  handleNavigate("category", category.slug, e);
                }}
              >
                {category.name}
              </span>
              {/* // </Link> */}
            </AccordionSummary>
            {category.sub_categories.map((sub_category) => (
              <AccordionDetails key={sub_category._id}>
                <span
                  className={classes.link}
                  onClick={(e) => handleNavigate("sub", sub_category.slug, e)}
                >
                  {sub_category.name}
                </span>
              </AccordionDetails>
            ))}
          </Accordion>
        </ListItem>
      ))}
    </List>
  );
}

export default withStyles(styles)(withRouter(NestedList));
