import React, { useState } from "react";
import { sendPainData } from "../api";

const PainModal = ({ point, onClose }) => {
  const [intensity, setIntensity] = useState("");
  const [character, setCharacter] = useState("Острая"); // пока заглушка (ID = 1)
  const [timeOfDay, setTimeOfDay] = useState("Утро");    // пока заглушка (ID = 1)
  const [triggers, setTriggers] = useState({
    position: false,
    breath: false,
    physical: false,
    stress: false,
  });

  const handleCheckboxChange = (key) => {
    setTriggers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const painTypeToId = {
    "Острая": 1,
    "Тупая": 2,
    "Пульсирующая": 3,
    "Жгучая": 4,
    "Ноющая": 5,
    "Колючая": 6,
    "Стреляющая": 7,
    "Сжимающая": 8,
    "Давящая": 9
  };

  const timeOfDayToId = {
    "Утро": 1,
    "День": 2,
    "Вечер": 3,
    "Ночь": 4,
    "Всегда": 5
  };

const handleSave = async () => {
  const data = {
    user_id: 1,
    pain_point_id: point.id ?? 1,
    pain_intensity_id: Math.min(Math.max(parseInt(intensity), 1), 10),
    pain_type_id: painTypeToId[character] ?? 1,
    time_of_day_id: timeOfDayToId[timeOfDay] ?? 5,
    body_position_id: triggers.position ? 1 : 2,
    breathing_relation_id: triggers.breath ? 1 : 2,
    physical_activity_relation_id: triggers.physical ? 1 : 2,
    stress_relation_id: triggers.stress ? 1 : 2,
    record_date: new Date().toISOString(),
  };

  console.log("Отправка данных:", data);

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
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-300 w-[500px]">
      <h2 className="text-2xl font-bold mb-4">Характеристика боли</h2>

      <div className="mb-4">
        <label className="font-semibold">Локализация:</label>
        <input
          type="text"
          value={point.name}
          disabled
          className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold">Интенсивность (1–10):</label>
        <input
          type="number"
          min="1"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold">Характер боли:</label>
        <select
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        >
          <option>Острая</option>
          <option>Тупая</option>
          <option>Жгучая</option>
          <option>Пульсирующая</option>
          <option>Ноющая</option>
          <option>Колючая</option>
          <option>Стреляющая</option>
          <option>Сжимающая</option>
          <option>Давящая</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="font-semibold">Время суток:</label>
        <select
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        >
          <option>Всегда</option>
          <option>Утро</option>
          <option>День</option>
          <option>Вечер</option>
          <option>Ночь</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="font-semibold block">Связь с:</label>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={triggers.position}
              onChange={() => handleCheckboxChange("position")}
            />
            Изменением положения
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={triggers.breath}
              onChange={() => handleCheckboxChange("breath")}
            />
            Вдохом / выдохом
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={triggers.physical}
              onChange={() => handleCheckboxChange("physical")}
            />
            Физической нагрузкой
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={triggers.stress}
              onChange={() => handleCheckboxChange("stress")}
            />
            Стрессом
          </label>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Отмена
        </button>
        <button
          onClick={handleSave}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default PainModal;
