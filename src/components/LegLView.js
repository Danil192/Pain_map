import React from "react";
import { ReactComponent as LegSvg } from "../assets/svg/Leg_L.svg"; // убедись, что путь совпадает

const LegLView = () => {
  return (
    <div
      style={{
        width: "600px",
        height: "600px",
        margin: "0 auto",
        border: "2px dashed red",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LegSvg
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default LegLView;
