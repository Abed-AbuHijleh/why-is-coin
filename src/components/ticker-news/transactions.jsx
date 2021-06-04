import React from "react";

import imgSrc from "../../resources/images/coming-soon.png";

const Component = info => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <img
        alt="Coming Soon"
        src={imgSrc}
        style={
          info.colors[0] === "#f3f3f3"
            ? { width: "min(100%, 400px)", filter: "invert(100%)" }
            : { width: "min(100%, 400px)" }
        }
      />
    </div>
  );
};

export default Component;
