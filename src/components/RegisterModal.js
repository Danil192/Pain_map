import React, { useState } from "react";
import { registerUser } from "../api"; // твой API модуль

const RegisterModal = ({ onClose }) => {
  const [form, setForm] = useState({
    фамилия: "",
    имя: "",
    отчество: "",
    email: "",
    пароль: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (form.пароль !== form.confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    try {
      await registerUser(form);
      alert("Регистрация успешна!");
      onClose();
    } catch (err) {
      alert(err.message || "Ошибка при регистрации");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[400px]">
        <h2 className="text-2xl font-bold mb-4">Регистрация</h2>

        <input
          type="text"
          name="фамилия"
          placeholder="Фамилия"
          value={form.фамилия}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="имя"
          placeholder="Имя"
          value={form.имя}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="отчество"
          placeholder="Отчество"
          value={form.отчество}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          name="пароль"
          placeholder="Пароль"
          value={form.пароль}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Повторите пароль"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
