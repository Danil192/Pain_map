import React from "react";

const Legs = ({ setViewBox }) => {
  const zoomToLegs = () => {
    setViewBox("100 500 140 340"); // Приближаем к ногам
  };

  return (
    <rect
      x="100"
      y="500"
      width="140"
      height="340"
      fill="transparent"
      onClick={zoomToLegs}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Legs;
