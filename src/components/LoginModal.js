// src/components/LoginModal.js
import React, { useState } from "react";

// Простой пользователь для демо (без БД)
const DEMO_USER = {
  email: "user@example.com",
  password: "12345",
  username: "Пользователь",
  id: 1
};

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Простая проверка без БД
    if (formData.email === DEMO_USER.email && formData.password === DEMO_USER.password) {
      setMessage("✅ Успешный вход!");
      
      if (onLoginSuccess) {
        onLoginSuccess({
          username: DEMO_USER.username,
          email: DEMO_USER.email,
          id: DEMO_USER.id
        });
      }
      
      // Закрываем модалку через 1 секунду после успешного входа
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setMessage("❌ Неверный email или пароль. Используйте: user@example.com / 12345");
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
            <h5 className="modal-title">Вход</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="user@example.com"
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
                  placeholder="12345"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="alert alert-info">
                <small>Демо-доступ: user@example.com / 12345</small>
              </div>

              {message && <div className="alert alert-info mt-2">{message}</div>}
            </div>

            <div className="modal-footer border-top">
              <button type="submit" className="btn btn-dark">
                Войти
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

export default LoginModal;
