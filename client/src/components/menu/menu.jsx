import React from "react";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  floatRight: {
    float: "right",
  },
}));

export default function SimpleMenu({ title, array, onChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let query = new URLSearchParams(useLocation().search);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.target.value) onChange(e);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="outlined"
        className={classes.floatRight}
      >
        {(query.get("sort") && array[+query.get("sort") - 1]) || title}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {array.map((element, index) => (
          <MenuItem key={index} value={index + 1} onClick={handleClose}>
            {element}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
