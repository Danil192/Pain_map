// src/components/RegisterModal.js
import React, { useState } from "react";
import axios from "axios";

const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://51.250.4.123:8001/AccessPoints/RegisterUser", formData);
      setMessage("✅ Успешная регистрация!");
    } catch (error) {
      setMessage("❌ Ошибка: " + (error.response?.data?.detail?.[0]?.msg || error.message));
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border rounded shadow">
          <div className="modal-header border-bottom">
            <h5 className="modal-title">Регистрация</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Логин</label>
                <input
                  name="username"
                  className="form-control"
                  placeholder="Введите логин"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Введите email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Пароль</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Введите пароль"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {message && <div className="alert alert-info mt-2">{message}</div>}
            </div>

            <div className="modal-footer border-top">
              <button type="submit" className="btn btn-success">
                Зарегистрироваться
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Закрыть
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
