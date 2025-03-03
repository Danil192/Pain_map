import React from "react";

const Tors = ({ setViewBox }) => {
  const zoomToTorso = () => {
    setViewBox("80 200 180 300"); // Приближаем к торсу
  };

  return (
    <rect
      x="80"
      y="200"
      width="180"
      height="300"
      fill="transparent"
      onClick={zoomToTorso}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Tors;
