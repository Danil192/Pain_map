import React from "react";

const Navbar = ({ onShowHistory, onGoHome, onRegister, onLogin, onLogout, user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Слева — кнопки */}
        <div className="d-flex align-items-center gap-3">
          <span
            className="navbar-brand fw-bold text-primary"
            style={{ cursor: "pointer" }}
            onClick={onGoHome}
          >
            🩺 Карта Болей
          </span>

          <button className="btn btn-outline-primary" onClick={onGoHome}>
            Главная
          </button>

          <button className="btn btn-outline-secondary" onClick={onShowHistory}>
            История болей
          </button>
        </div>

        {/* Справа — в зависимости от авторизации */}
        <div className="d-flex align-items-center gap-2">
          {user ? (
            <>
              <span className="text-dark fw-semibold">👋 {user.username}</span>
              <button className="btn btn-outline-danger" onClick={onLogout}>Выйти</button>
            </>
          ) : (
            <>
              <button className="btn btn-outline-success" onClick={onRegister}>
                Зарегистрироваться
              </button>
              <button className="btn btn-outline-dark" onClick={onLogin}>
                Войти
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
