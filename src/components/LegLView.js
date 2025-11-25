import React, { useState } from "react";
import { ReactComponent as LegSvg } from "../assets/svg/Leg_L.svg";
import painPointsData from "../data/painPointsData.json";
import PainModal from "./PainModal";

const legPoints = painPointsData["Нога_Левая"] || {};

const LegLView = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setShowModal(true);
  };

  // Размеры контейнера для расчета координат
  const containerWidth = 700;
  const containerHeight = 700;
  const scale = 0.7;

  return (
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: "transparent" }}>
      {/* Контейнер */}
      <div
        className="relative"
        style={{
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
          margin: "0 auto",
        }}
      >
        {/* SVG ноги */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transform: "scale(0.7)",
            transformOrigin: "center center",
            zIndex: 10,
          }}
        >
          <LegSvg
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        {/* Точки боли */}
        {Object.entries(legPoints).map(([name, point], index) => {
          // Координаты из JSON в системе 0-1024
          const scaledWidth = containerWidth * scale;
          const scaledHeight = containerHeight * scale;
          const offsetX = (containerWidth - scaledWidth) / 2;
          const offsetY = (containerHeight - scaledHeight) / 2;
          
          // Нормализуем координаты с учетом scale
          const normalizedX = (point.x / 1024) * scaledWidth + offsetX;
          const normalizedY = (point.y / 1024) * scaledHeight + offsetY;
          
          return (
            <div
              key={index}
              title={name}
              onClick={() => handlePointClick({ ...point, name })}
              style={{
                position: "absolute",
                top: `${(normalizedY / containerHeight) * 100}%`,
                left: `${(normalizedX / containerWidth) * 100}%`,
                width: "20px",
                height: "20px",
                backgroundColor: "red",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 30,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>

      {/* Модалка */}
      {showModal && selectedPoint && (
        <PainModal point={selectedPoint} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default LegLView;
