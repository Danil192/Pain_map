import React, { useState } from "react";
import { useUser } from "../context/UserContext";

const PainModal = ({ point, onClose }) => {
  const { user } = useUser();
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

  const [intensity, setIntensity] = useState(1);
  const [character, setCharacter] = useState("Острая");
  const [timeOfDay, setTimeOfDay] = useState("Утро");
  const [triggers, setTriggers] = useState({
    position: false,
    breath: false,
    physical: false,
    stress: false,
  });

  if (!point || !point.name) return null;

  const handleCheckboxChange = (key) => {
    setTriggers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    // Проверка авторизации
    if (!user) {
      alert("Войдите, чтобы сохранить точку боли");
      onClose();
      return;
    }

    try {
      // Упрощенное сохранение без БД - просто сохраняем в localStorage
      const painRecord = {
        id: Date.now(),
        pain_point_name: point.name || "Не указано",
        pain_intensity: intensity,
        pain_type: character,
        time_of_day: timeOfDay,
        body_position: triggers.position ? "Да" : "Нет",
        breathing_relation: triggers.breath ? "Да" : "Нет",
        physical_activity_relation: triggers.physical ? "Да" : "Нет",
        stress_relation: triggers.stress ? "Да" : "Нет",
        record_date: new Date().toISOString(),
        user_id: user.id
      };

      // Получаем существующие записи из localStorage
      const existingRecords = JSON.parse(localStorage.getItem('painRecords') || '[]');
      existingRecords.push(painRecord);
      localStorage.setItem('painRecords', JSON.stringify(existingRecords));

      alert("Боль успешно сохранена!");
      onClose();
    } catch (err) {
      console.error("Ошибка при сохранении боли:", err);
      alert("Ошибка при сохранении данных");
    }
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Характеристика боли</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Локализация</label>
                <input type="text" className="form-control" value={point.name} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label">Интенсивность (1-10)</label>
                <input type="number" className="form-control" value={intensity} onChange={(e) => setIntensity(e.target.value)} min={1} max={10} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Характер боли</label>
                <select className="form-select" value={character} onChange={(e) => setCharacter(e.target.value)}>
                  {Object.keys(painTypeToId).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Время суток</label>
                <select className="form-select" value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
                  {Object.keys(timeOfDayToId).map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Связь с:</label>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={triggers.position} onChange={() => handleCheckboxChange("position")} />
                  <label className="form-check-label">Положением тела</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={triggers.breath} onChange={() => handleCheckboxChange("breath")} />
                  <label className="form-check-label">Дыханием</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={triggers.physical} onChange={() => handleCheckboxChange("physical")} />
                  <label className="form-check-label">Физнагрузкой</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={triggers.stress} onChange={() => handleCheckboxChange("stress")} />
                  <label className="form-check-label">Стрессом</label>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Отмена</button>
              <button className="btn btn-primary" onClick={handleSave}>Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainModal;
