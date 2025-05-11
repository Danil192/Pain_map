import React, { useState } from "react";
import { ReactComponent as LegSvg } from "../assets/svg/Leg_R.svg";
import painPointsData from "../data/painPointsData.json";
import PainModal from "./PaintModal";
import legImage from "../assets/svg/LegR.png";


const legPoints = painPointsData["Нога_Правая"] || {};

const LegRView = ({ onBack }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setShowModal(true);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Кнопка Назад */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 bg-black text-white px-4 py-2 rounded text-xl z-50"
      >
        ← Назад
      </button>

      {/* Контейнер */}
      <div
        className="relative"
        style={{
          width: "700px",
          height: "700px",
          transform: "translate(-30px, -20px)",
        }}
      >
        {/* SVG ноги СНИЗУ */}
        <img
          src={legImage}
          alt="Нога"
          className="absolute top-0 left-0 w-full h-full"
          style={{
            transform: "scale(0.7)",
            transformOrigin: "top left",
            zIndex: 10,
          }}
        />

        {/* Точки боли СВЕРХУ */}
        {Object.entries(legPoints).map(([name, point], index) => (
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
              zIndex: 30, 
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* Модалка */}
      {showModal && selectedPoint && (
        <div
          style={{
            position: "fixed",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            backgroundColor: "white",
            padding: "20px",
            border: "2px solid black",
            borderRadius: "12px",
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          }}
        >
          <PainModal point={selectedPoint} onClose={() => setShowModal(false)} />
        </div>
      )}
    </div>
  );
};

export default LegRView;
