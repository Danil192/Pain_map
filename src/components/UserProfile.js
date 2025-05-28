// src/components/UserProfile.js
import React from "react";

const UserProfile = ({ user, painRecords }) => {
  console.log("👤 user =", user);

  return (
    <div className="container mt-5 pt-5">
      <h2>👤 Профиль пользователя</h2>
      <p><strong>Логин:</strong> {String(user.username)}</p>
      <p><strong>Email:</strong> {String(user.email || "не указан")}</p>

      <h4 className="mt-4">📍 Отмеченные боли</h4>
      {painRecords.length === 0 ? (
        <p>Нет сохраненных болевых точек.</p>
      ) : (
        <ul className="list-group">
          {painRecords.map((record, index) => (
            <li key={index} className="list-group-item">
              <strong>Часть тела:</strong> {record.bodyPart}<br />
              <strong>Интенсивность:</strong> {record.intensity}<br />
              <strong>Тип боли:</strong> {record.painType}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfile;
