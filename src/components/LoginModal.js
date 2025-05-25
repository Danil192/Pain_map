import React, { useState } from "react";
import axios from "axios";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://51.250.4.123:8001/AccessPoints/LoginUser", formData);
    setMessage("Успешный вход");

    // Передаем наружу данные пользователя (можно просто логин)
    if (typeof onLoginSuccess === "function") {
      onLoginSuccess({ username: formData.login });
    }

  } catch (error) {
    setMessage("Ошибка: " + (error.response?.data?.detail?.[0]?.msg || error.message));
  }
};

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Вход</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input name="login" className="form-control mb-2" placeholder="Логин" value={formData.login} onChange={handleChange} required />
              <input name="password" type="password" className="form-control mb-2" placeholder="Пароль" value={formData.password} onChange={handleChange} required />
              {message && <div className="alert alert-info mt-2">{message}</div>}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-dark">Войти</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Закрыть</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
