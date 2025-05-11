import React, { useState } from "react";
import { ReactComponent as FaceSvg } from "../assets/svg/face.svg";
import painPointsData from "../data/painPointsData.json";
import PainModal from "./PaintModal";

const headPoints = painPointsData["Голова"];

const HeadView = ({
  onBack,
  facePosition = { x: 0, y: 200 },
  buttonPosition = { x: 50, y: 50 },
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
        {/* Лицо */}
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

        {/* Назад */}
        <g onClick={onBack} style={{ cursor: "pointer" }}>
          <rect
            x={buttonPosition.x}
            y={buttonPosition.y}
            width="200"
            height="80"
            rx="10"
            fill="black"
          />
          <text
            x={buttonPosition.x + 15}
            y={buttonPosition.y + 50}
            fill="white"
            fontSize="50"
            fontWeight="bold"
          >
            Назад
          </text>
        </g>
      </g>

      {/* Модалка поверх, вне SVG */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            backgroundColor: "white",
            padding: "20px",
            border: "2px solid black",
            borderRadius: "12px",
            boxShadow: "0 0 15px rgba(0,0,0,0.3)"
          }}
        >
          <PainModal point={selectedPoint} onClose={() => setShowModal(false)} />
        </div>
      )}
    </>
  );
};

export default HeadView;
