import React from "react";

const Gameboard = () => {
  return (
    <div>
      {" "}
      <canvas
        width="720"
        height="528"
        style={{
          imageRendering: "pixelated",
          marginLeft: "8px",
          marginTop: "6px",
        }}
      ></canvas>
      gameboard


    </div>
  );
};

export default Gameboard;
