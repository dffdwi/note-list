import React from "react";
import PropTypes from "prop-types";

function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loading-text">Loading...</div>
    </div>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
