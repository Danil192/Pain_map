import React from "react";

const Head = ({ setViewBox }) => {
  const zoomToHead = () => {
    setViewBox("120 0 100 100"); // Приближаем к голове
  };

  return (
    <rect
      x="130"
      y="20"
      width="80"
      height="80"
      fill="transparent"
      onClick={zoomToHead}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Head;
