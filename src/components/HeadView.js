import React, { useState } from "react";
import { ReactComponent as FaceSvg } from "../assets/svg/face.svg";
import painPointsData from "../data/painPointsData.json";
import PainModal from "./PainModal";

const headPoints = painPointsData["Голова"] || {};

const HeadView = ({ onBack }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setShowModal(true);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Контейнер SVG + точки */}
      <div
        className="relative"
        style={{
          width: "500px",
          height: "500px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* SVG головы */}
          <FaceSvg
            className="pointer-events-none"
            style={{
              width: "100%",
              height: "100%",
              transform: "scale(0.75)",
              transformOrigin: "center center",
              zIndex: 10,
            }}
          />

          {/* Точки боли из JSON */}
          {Object.entries(headPoints).map(([name, point], index) => (
            <div
              key={index}
              title={name}
              onClick={() => handlePointClick({ ...point, name })}
              style={{
                position: "absolute",
                top: `${(point.y / 1024) * 100}%`,
                left: `${(point.x / 1024) * 100}%`,
                width: "20px",
                height: "20px",
                backgroundColor: "red",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 20,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* Модалка */}
      {showModal && selectedPoint && (
        <PainModal point={selectedPoint} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default HeadView;
