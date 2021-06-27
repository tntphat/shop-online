import React from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { formatDateByString } from "../../helpers/date-time";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.text.main}`,
    padding: "10px",
    borderRadius: "10px",
  },
}));

export default function Rate({ user, rating }) {
  const classes = useStyles();
  return (
    <>
      <Box
        className={classes.root}
        component="fieldset"
        mb={2}
        borderColor="transparent"
      >
        <Box display="flex" flexDirection="row">
          <Typography component="span">
            {user.firstName} {user.lastName}
          </Typography>
          <Box mx={3}>
            <Rating
              precision={0.5}
              name="read-only"
              value={rating.star}
              readOnly
            />
          </Box>
          <Typography component="span">
            {formatDateByString(rating.createdAt, "YYYY-MM-DD")}
          </Typography>
        </Box>
        <Typography variant="subtitle2">{rating.detail}</Typography>
      </Box>
    </>
  );
}
