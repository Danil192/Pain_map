import React, { useState } from "react";
import { ReactComponent as BodySvg } from "../assets/svg/full_body.svg";
import HeadView from "./HeadView";
import HandRView from "./HandRView";
import HandLView from "./HandLView";
import LegRView from "./LegRView";
import LegLView from "./LegLView";
import PainHistoryModal from "./PainHistoryModal";
import PainModal from "./PainModal";
import Navbar from "./ui/Navbar";
import Button from "./ui/Button";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import UserProfile from "./UserProfile";
import { useUser } from "../context/UserContext";


const PainMap = () => {
  const { user, setUser } = useUser();
  const [highlight, setHighlight] = useState(null);
  const [activePart, setActivePart] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [painTypesMap, setPainTypesMap] = useState({});
  const [painRecords, setPainRecords] = useState([]);
  const [showRecords, setShowRecords] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPainModal, setShowPainModal] = useState(false);

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

  const handleDeleteAll = async () => {
    try {
      setPainRecords([]);
      setShowRecords(false);
      alert("Все записи успешно удалены!");
    } catch (err) {
      alert("Ошибка при удалении: " + err.message);
    }
  };

  const loadPainRecords = () => {
    // Проверка авторизации
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    try {
      // Получаем записи из localStorage
      const records = JSON.parse(localStorage.getItem('painRecords') || '[]');
      
      // Фильтруем записи текущего пользователя
      const userRecords = records.filter(record => record.user_id === user.id);

      const hardcodedPainTypesMap = {
        1: "Острая",
        2: "Тупая",
        3: "Пульсирующая",
        4: "Жгучая",
        5: "Ноющая",
        6: "Колючая",
        7: "Стреляющая",
        8: "Сжимающая",
        9: "Давящая"
      };

      setPainTypesMap(hardcodedPainTypesMap);
      setPainRecords(userRecords);
      setShowRecords(true);
    } catch (err) {
      console.error("Ошибка при получении данных:", err);
      setPainRecords([]);
      setShowRecords(true);
    }
  };

  return (
    <div className="container-fluid p-0">
      <Navbar
      onGoHome={() => {
        setShowPainModal(false);
        setShowRecords(false);
        setActivePart(null); // сброс деталей
      }}
      onShowHistory={() => {
        loadPainRecords();
      }}
      onRegister={() => {
        // Регистрация отключена, показываем сообщение
        alert("Регистрация временно отключена. Используйте демо-доступ: user@example.com / 12345");
        setShowLoginModal(true);
        setShowRegisterModal(false);
      }}
      onLogin={() => {
        setShowLoginModal(true);
        setShowRegisterModal(false);
      }}
      onLogout={() => {
          setUser(null);
          setShowProfile(false);
        }}
      user={user}                     // имя пользователя

    />

    {showProfile && user && <UserProfile user={user} painRecords={painRecords} />}  

    {showLoginModal && (
      <LoginModal
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={(userData) => {
          setUser(userData);         
          setShowLoginModal(false);
        }}
      />
    )}

      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}

      {showRecords && (
      <PainHistoryModal
        records={painRecords}
        onClose={() => setShowRecords(false)}
  />
      )}

      <div className="d-flex justify-content-center align-items-center vh-100">

                    {showPainModal && (
              <PainModal
                onClose={() => setShowPainModal(false)}
                // ...передай всё нужное внутрь
              />
            )}

        {activePart === "Рука_Правая" ? (
          <HandRView onBack={handleBack} />
        ) : activePart === "Рука_Левая" ? (
          <HandLView onBack={handleBack} />
        ) : activePart === "Нога_Правая" ? (
          <LegRView onBack={handleBack} />
        ) : activePart === "Нога_Левая" ? (
          <LegLView onBack={handleBack} />
        ) : activePart === "Голова" ? (
          <HeadView onBack={handleBack} />
        ) : (
          <svg
            viewBox="0 -65 1300 2000"
            preserveAspectRatio="xMidYMid meet"
            style={{ height: "100vh", width: "auto", display: "block" }}
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

                {/* Правая рука */}
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

                {/* Левая рука */}
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

                {/* Правая нога */}
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

                {/* Левая нога */}
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

          </svg>
        )}
      </div>
    </div>
  );
};

export default PainMap;
