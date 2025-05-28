import React, { useState } from "react";
import { savePainPoint, saveUserPainRecord } from "../api";

const PainModal = ({ point, onClose, user }) => {
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
    try {
      const savedPoint = await savePainPoint({
        platform_id: 1,
        X_coord: point.x,
        Y_coord: point.y,
        body_part_id: point.bodyPartId || 1,
        pain_point_name: point.name,
        pain_point_id: point.id || 1,
      });

      const payload = {
        user_id: user?.id || 1,
        body_position_id: triggers.position ? 1 : 2,
        breathing_relation_id: triggers.breath ? 1 : 2,
        pain_point_id: savedPoint.pain_point_id || point.id || 1,
        pain_intensity_id: parseInt(intensity) || 1,
        pain_type_id: painTypeToId[character] || 1,
        time_of_day_id: timeOfDayToId[timeOfDay] || 1,
        stress_relation_id: triggers.stress ? 1 : 2,
        physical_activity_relation_id: triggers.physical ? 1 : 2,
        record_date: new Date().toISOString(),
      };

      await saveUserPainRecord(payload);
      alert("Боль успешно сохранена!");
      onClose();
    } catch (err) {
      console.error("Ошибка при сохранении боли:", err);
      alert("Ошибка при отправке данных");
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
