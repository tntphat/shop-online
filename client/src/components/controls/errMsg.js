import React from "react";

export default function ErrroMessage({ error, minL, params }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <span className="error-msg">This is required</span>;
      case "minLength":
        return (
          <span className="error-msg">
            Your last name need minmium {minL || 2} charcaters
          </span>
        );
      case "pattern":
        return <span className="error-msg">Enter a valid email address</span>;
      case "min":
        return <span className="error-msg">Minmium age is 18</span>;
      case "validate":
        return <span className="error-msg">Username is already used</span>;
      case "myErr":
        return <span className="error-msg">{error.message}</span>;
      default:
        return null;
    }
  }

  return null;
}
