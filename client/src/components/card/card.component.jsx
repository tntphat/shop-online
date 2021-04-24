import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    // marginBottom: 12,
  },
  img: {
    height: "150px",
    backgroundCover: "auto",
  },
});

export default function SimpleCard({ product }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card variant="outlined">
      <CardMedia
        className={classes.img}
        image="https://cdn.pixabay.com/photo/2021/02/21/07/42/easter-6035549__480.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body1" component="h2">
          {product.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          100.000
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">
          Mua ngay
        </Button>
      </CardActions>
    </Card>
  );
}
