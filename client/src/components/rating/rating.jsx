import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { formatDateByString } from "../../helpers/date-time";

export default function Rate({ user, rating }) {
  console.log(user, rating);
  return (
    <>
      <Box component="fieldset" mb={5} borderColor="transparent">
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
        <Typography>{rating.detail}</Typography>
      </Box>
    </>
  );
}
