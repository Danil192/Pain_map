import React, { useState } from "react";
import { ReactComponent as BodySvg } from "../assets/svg/full_body.svg";
import HeadView from "./HeadView";
import HandRView from "./HandRView";
import HandLView from "./HandLView";
import LegRView from "./LegRView";
import LegLView from "./LegLView";

const PainMap = () => {
  const [highlight, setHighlight] = useState(null);
  const [activePart, setActivePart] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);

  const handleClick = (part) => {
    setFadeOut(true);
    setTimeout(() => {
      setActivePart(part);
      setFadeOut(false);
    }, 500);
  };

  const handleBack = () => {
    setFadeOut(true);
    setTimeout(() => {
      setActivePart(null);
      setFadeOut(false);
    }, 500);
  };



  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white overflow-hidden">
      {activePart === "Рука_Правая" ? (
        <HandRView onBack={handleBack} />
      ) : activePart === "Рука_Левая" ? (
        <HandLView onBack={handleBack} />
      ) : (
        <svg
          viewBox="0 0 1300 2000"
          preserveAspectRatio="xMidYMid meet"
          style={{
            height: "100vh",
            width: "auto",
            display: "block"
          }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {!activePart && (
            <g
              style={{
                opacity: fadeOut ? 0 : 1,
                transition: "opacity 0.5s ease-in-out"
              }}
            >
              <BodySvg />

              {/* Голова */}
              <rect
                x="550"
                y="90"
                width="260"
                height="260"
                rx="50"
                ry="50"
                fill="orange"
                opacity={highlight === "Голова" ? 0.4 : 0}
                style={{
                  transition: "opacity 0.3s ease-in-out",
                  cursor: "pointer",
                  filter: highlight === "Голова" ? "url(#glow)" : "none"
                }}
                onMouseEnter={() => setHighlight("Голова")}
                onMouseLeave={() => setHighlight(null)}
                onClick={() => handleClick("Голова")}
              />

              {/* Рука (правая) */}
              <rect
                x="250"
                y="500"
                width="260"
                height="660"
                rx="50"
                ry="70"
                fill="orange"
                opacity={highlight === "Рука_правая" ? 0.4 : 0}
                style={{
                  transition: "opacity 0.3s ease-in-out",
                  cursor: "pointer",
                  filter: highlight === "Рука_правая" ? "url(#glow)" : "none"
                }}
                onMouseEnter={() => setHighlight("Рука_правая")}
                onMouseLeave={() => setHighlight(null)}
                onClick={() => handleClick("Рука_Правая")}
              />

              {/* Рука (левая) */}
              <rect
                x="850"
                y="500"
                width="260"
                height="660"
                rx="50"
                ry="70"
                fill="orange"
                opacity={highlight === "Рука_левая" ? 0.4 : 0}
                style={{
                  transition: "opacity 0.3s ease-in-out",
                  cursor: "pointer",
                  filter: highlight === "Рука_левая" ? "url(#glow)" : "none"
                }}
                onMouseEnter={() => setHighlight("Рука_левая")}
                onMouseLeave={() => setHighlight(null)}
                onClick={() => handleClick("Рука_Левая")}
              />

              {/* Нога (правая) */}
              <rect
                x="470"
                y="1050"
                width="200"
                height="860"
                rx="50"
                ry="70"
                fill="orange"
                opacity={highlight === "Нога_правая" ? 0.4 : 0}
                style={{
                  transition: "opacity 0.3s ease-in-out",
                  cursor: "pointer",
                  filter: highlight === "Нога_правая" ? "url(#glow)" : "none"
                }}
                onMouseEnter={() => setHighlight("Нога_правая")}
                onMouseLeave={() => setHighlight(null)}
                onClick={() => handleClick("Нога_Правая")}
              />

              {/* Нога (левая) */}
              <rect
                x="690"
                y="1050"
                width="200"
                height="860"
                rx="50"
                ry="70"
                fill="orange"
                opacity={highlight === "Нога_левая" ? 0.4 : 0}
                style={{
                  transition: "opacity 0.3s ease-in-out",
                  cursor: "pointer",
                  filter: highlight === "Нога_левая" ? "url(#glow)" : "none"
                }}
                onMouseEnter={() => setHighlight("Нога_левая")}
                onMouseLeave={() => setHighlight(null)}
                onClick={() => handleClick("Нога_Левая")}

              />

              {/* Торс */}
              <rect
                x="515"
                y="390"
                width="330"
                height="660"
                rx="50"
                ry="70"
                fill="orange"
                opacity={highlight === "Торс" ? 0.4 : 0}
                style={{
                  transition: "opacity 0.3s ease-in-out",
                  cursor: "pointer",
                  filter: highlight === "Торс" ? "url(#glow)" : "none"
                }}
                onMouseEnter={() => setHighlight("Торс")}
                onMouseLeave={() => setHighlight(null)}
                onClick={() => console.log("Нажали на торс")}
              />
            </g>
          )}

          {activePart === "Голова" && <HeadView onBack={handleBack} />}
          {activePart === "Нога_Правая" && <LegRView onBack={handleBack} />}
          {activePart === "Нога_Левая" && <LegLView onBack={handleBack} />}

        </svg>
      )}
    </div>
  );
};

export default PainMap;
