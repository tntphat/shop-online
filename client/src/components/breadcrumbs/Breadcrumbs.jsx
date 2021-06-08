import React from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function handleClick(event, link, history) {
  event.preventDefault();
  history.push(link);
  console.info("You clicked a breadcrumb.");
}

export default function SimpleBreadcrumbs({ arr, present }) {
  const history = useHistory();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {arr.map((ele) => (
        <Link
          color="inherit"
          onClick={(e) => handleClick(e, ele.link, history)}
        >
          {ele.name}
        </Link>
      ))}
      <Typography color="textPrimary">{present}</Typography>
    </Breadcrumbs>
  );
}
