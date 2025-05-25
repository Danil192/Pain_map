import React, { useState } from "react";
import { ReactComponent as HandSvg } from "../assets/svg/hand_R.svg";
import painPointsData from "../data/painPointsData.json";
import PainModal from "./PainModal";

const handPoints = painPointsData["Рука_Правая"];

const HandRView = () => {
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
          width: "700px",
          height: "700px",
          transform: "translate(-20px, -30px)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {/* SVG руки */}
          <HandSvg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              transform: "scale(0.57)",
              transformOrigin: "top left",
              zIndex: 10,
            }}
          />

          {/* Точки боли */}
          {Object.entries(handPoints).map(([name, point], index) => (
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

export default HandRView;
