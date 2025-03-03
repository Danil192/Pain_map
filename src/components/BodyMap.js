import React, { useState } from "react";
import "./BodyMap.css"; // Стили
import { ReactComponent as BodySvg } from "../assets/body.svg"; // Импорт SVG
import Head from "./Head";
import Torso from "./Torso";
import Legs from "./Legs";

const BodyMap = () => {
  const [viewBox, setViewBox] = useState("0 0 338.64 839.2"); // Обычный масштаб

  return (
    <div className="svg-container">
      <svg width="100%" height="100%" viewBox={viewBox} style={{ transition: "all 0.5s ease-in-out" }}>
        <BodySvg />
        <Head setViewBox={setViewBox} />
        <Torso setViewBox={setViewBox} />
        <Legs setViewBox={setViewBox} />
      </svg>
      <button onClick={() => setViewBox("0 0 338.64 839.2")} className="reset-btn">Сбросить</button>
    </div>
  );
};

export default BodyMap;
