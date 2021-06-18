import React from "react";

import { Paper, Box, Typography, CardMedia } from "@material-ui/core";
import "./error-boundary.styles.css";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored)
      return (
        <div className="box">
          <CardMedia
            image="https://i.imgur.com/lKJiT77.png"
            title="A dog"
            className="img"
          />
          <Typography className="text">A Dog ate this Page</Typography>
        </div>
      );

    return this.props.children;
  }
}

export default ErrorBoundary;
