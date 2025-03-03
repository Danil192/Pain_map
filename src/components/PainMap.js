import React, { useState } from "react";
import { ReactComponent as BodySvg } from "../assets/body.svg"; // Импорт SVG

const PainMap = () => {
  const [zoom, setZoom] = useState({ scale: 1, translateX: 0, translateY: 0 });
  const [highlight, setHighlight] = useState(null);

  const zoomTo = (scale, translateX, translateY, part) => {
    if (zoom.scale === scale) {
      console.log(`Отдаление от ${part}`);
      setZoom({ scale: 1, translateX: 0, translateY: 0 });
    } else {
      console.log(`Приближение к ${part}`);
      setZoom({ scale, translateX, translateY });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100 relative">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 2000"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100vw",
          height: "100vh",
          transition: "transform 0.5s ease-in-out",
          transformOrigin: "center",
          transform: `scale(${zoom.scale}) translate(${zoom.translateX}px, ${zoom.translateY}px)`,
        }}
      >
        <g transform="translate(50, 25)">
          <BodySvg />
        </g>

        {/* Стили для эффектов */}
        <defs>
          <filter id="blurEffect" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* ГОЛОВА */}
        <rect
          x="470"
          y="50"
          width="160"
          height="160"
          rx="50"
          ry="50"
          fill="orange"
          opacity={highlight === "Голова" ? 0.4 : 0}
          filter="url(#blurEffect)"
          style={{
            transition: "opacity 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHighlight("Голова")}
          onMouseLeave={() => setHighlight(null)}
          onClick={() => zoomTo(2.5, 0, 400, "Голова")}
        />

        {/* ТУЛОВИЩЕ */}
        <rect
          x="400"
          y="300"
          width="300"
          height="600"
          rx="100"
          ry="100"
          fill="orange"
          opacity={highlight === "Туловище" ? 0.4 : 0}
          filter="url(#blurEffect)"
          style={{
            transition: "opacity 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHighlight("Туловище")}
          onMouseLeave={() => setHighlight(null)}
          onClick={() => zoomTo(2, 0, 100, "Туловище")}
        />

        {/* НОГИ */}
        <rect
          x="350"
          y="1100"
          width="400"
          height="800"
          rx="80"
          ry="80"
          fill="orange"
          opacity={highlight === "Ноги" ? 0.4 : 0}
          filter="url(#blurEffect)"
          style={{
            transition: "opacity 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHighlight("Ноги")}
          onMouseLeave={() => setHighlight(null)}
          onClick={() => zoomTo(2, 0, -200, "Ноги")}
        />
      </svg>
    </div>
  );
};

export default PainMap;
