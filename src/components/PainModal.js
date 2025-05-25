import React, { useState } from "react";
import { sendPainData } from "../api";

const PainModal = ({ point, onClose }) => {
  // Инициализация состояний всегда в начале, без условных return
  const painTypeToId = {
    "Острая": 1,
    "Тупая": 2,
    "Пульсирующая": 3,
    "Жгучая": 4,
    "Ноющая": 5,
    "Колючая": 6,
    "Стреляющая": 7,
    "Сжимающая": 8,
    "Давящая": 9,
  };

  const timeOfDayToId = {
    "Утро": 1,
    "День": 2,
    "Вечер": 3,
    "Ночь": 4,
    "Всегда": 5,
  };

  const [intensity, setIntensity] = useState("");
  const [character, setCharacter] = useState("Острая");
  const [timeOfDay, setTimeOfDay] = useState("Утро");
  const [triggers, setTriggers] = useState({
    position: false,
    breath: false,
    physical: false,
    stress: false,
  });

  // Если point или point.name отсутствуют — не рендерим ничего
  if (!point || !point.name) {
    return null;
  }

  const handleCheckboxChange = (key) => {
    setTriggers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    const data = {
      user_id: 1,
      pain_point_id: point.id ?? 1,
      pain_intensity_id: Math.min(Math.max(parseInt(intensity) || 1, 1), 10),
      pain_type_id: painTypeToId[character] ?? 1,
      time_of_day_id: timeOfDayToId[timeOfDay] ?? 5,
      body_position_id: triggers.position ? 1 : 2,
      breathing_relation_id: triggers.breath ? 1 : 2,
      physical_activity_relation_id: triggers.physical ? 1 : 2,
      stress_relation_id: triggers.stress ? 1 : 2,
      record_date: new Date().toISOString(),
    };

    try {
      await sendPainData(data);
      alert("Боль успешно отправлена!");
    } catch (err) {
      console.error("Ошибка при отправке:", err);
      alert("Ошибка при отправке");
    }

    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content border-0 shadow">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Характеристика боли</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Локализация</label>
                <input
                  type="text"
                  value={point.name}
                  disabled
                  className="form-control bg-light"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Интенсивность (1–10)</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Характер боли</label>
                <select
                  className="form-select"
                  value={character}
                  onChange={(e) =>
                    Object.keys(painTypeToId).includes(e.target.value) &&
                    setCharacter(e.target.value)
                  }
                >
                  {Object.keys(painTypeToId).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Время суток</label>
                <select
                  className="form-select"
                  value={timeOfDay}
                  onChange={(e) =>
                    Object.keys(timeOfDayToId).includes(e.target.value) &&
                    setTimeOfDay(e.target.value)
                  }
                >
                  {Object.keys(timeOfDayToId).map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label d-block">Связь с:</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={triggers.position}
                    onChange={() => handleCheckboxChange("position")}
                    id="trigger-position"
                  />
                  <label className="form-check-label" htmlFor="trigger-position">
                    Изменением положения тела
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={triggers.breath}
                    onChange={() => handleCheckboxChange("breath")}
                    id="trigger-breath"
                  />
                  <label className="form-check-label" htmlFor="trigger-breath">
                    Дыханием
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={triggers.physical}
                    onChange={() => handleCheckboxChange("physical")}
                    id="trigger-physical"
                  />
                  <label className="form-check-label" htmlFor="trigger-physical">
                    Физической активностью
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={triggers.stress}
                    onChange={() => handleCheckboxChange("stress")}
                    id="trigger-stress"
                  />
                  <label className="form-check-label" htmlFor="trigger-stress">
                    Стрессом
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Отмена
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainModal;
