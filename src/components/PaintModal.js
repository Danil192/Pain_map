import React, { useState } from "react";
import { sendPainData } from "../api";

const PainModal = ({ point, onClose }) => {
  const [intensity, setIntensity] = useState("");
  const [character, setCharacter] = useState("Острая");
  const [timeOfDay, setTimeOfDay] = useState("Утро");
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

  const handleSave = async () => {
    const data = {
      localization: point.name,
      intensity: parseInt(intensity),
      character,
      timeOfDay,
      triggers: {
        position: triggers.position,
        breath: triggers.breath,
        physical: triggers.physical,
        stress: triggers.stress,
      },
    };
  
    try {
      const result = await sendPainData(data);
      alert("Боль успешно отправлена!");
    } catch (error) {
      alert("Ошибка при отправке.");
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
  <div className="mt-2">
  <label style={{ display: "block", marginBottom: "8px" }}>
    <input
      type="checkbox"
      className="mr-2"
      checked={triggers.position}
      onChange={() => handleCheckboxChange("position")}
    />
    Изменением положения
  </label>
  <label style={{ display: "block", marginBottom: "8px" }}>
    <input
      type="checkbox"
      className="mr-2"
      checked={triggers.breath}
      onChange={() => handleCheckboxChange("breath")}
    />
    Вдохом / выдохом
  </label>
  <label style={{ display: "block", marginBottom: "8px" }}>
    <input
      type="checkbox"
      className="mr-2"
      checked={triggers.physical}
      onChange={() => handleCheckboxChange("physical")}
    />
    Физической нагрузкой
  </label>
  <label style={{ display: "block", marginBottom: "8px" }}>
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
