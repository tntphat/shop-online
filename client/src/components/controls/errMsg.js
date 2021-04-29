import React from "react";

export default function ErrroMessage({ error, minL, params }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p className="error-msg">This is required</p>;
      case "minLength":
        return (
          <p className="error-msg">
            Your last name need minmium {minL || 2} charcaters
          </p>
        );
      case "pattern":
        return <p className="error-msg">Enter a valid email address</p>;
      case "min":
        return <p className="error-msg">Minmium age is 18</p>;
      case "validate":
        return <p className="error-msg">Username is already used</p>;
      case "myErr":
        return <p className="error-msg">{error.message}</p>;
      default:
        return null;
    }
  }

  return null;
}
