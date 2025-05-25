// src/components/UserPage.js
import React from "react";

const UserPage = ({ user, onLogout }) => {
  return (
    <div className="container py-5">
      <h2>👤 Добро пожаловать, {user?.username || "пользователь"}!</h2>
      <p className="text-muted">Ваш email: {user?.email}</p>

      <button className="btn btn-danger mt-3" onClick={onLogout}>
        Выйти
      </button>
    </div>
  );
};

export default UserPage;
