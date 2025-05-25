import React, { useState } from "react";
import { ReactComponent as FaceSvg } from "../assets/svg/face.svg";
import painPointsData from "../data/painPointsData.json";
import PainModal from "./PainModal";

const headPoints = painPointsData["Голова"];

const HeadView = ({
  facePosition = { x: 0, y: 200 },
  painPoints = []
}) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setShowModal(true);
  };

  return (
    <>
      {/* SVG часть */}
      <g style={{ opacity: 1, transition: "opacity 0.5s ease-in-out" }}>
        <g transform={`translate(${facePosition.x}, ${facePosition.y})`}>
          <FaceSvg />

          {/* Точки из props */}
          {painPoints.map((point, index) => (
            <circle
              key={`custom-${index}`}
              cx={point.x}
              cy={point.y}
              r="20"
              fill="red"
              style={{ cursor: "pointer" }}
              onClick={() => handlePointClick(point)}
            />
          ))}

          {/* Точки из JSON */}
          {Object.entries(headPoints).map(([name, point], index) => (
            <circle
              key={`json-${index}`}
              cx={point.x}
              cy={point.y}
              r="20"
              fill="red"
              style={{ cursor: "pointer" }}
              onClick={() => handlePointClick({ ...point, name })}
            />
          ))}
        </g>
      </g>

      {/* Модалка Bootstrap поверх */}
      {showModal && selectedPoint && (
        <PainModal point={selectedPoint} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default HeadView;
