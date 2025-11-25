import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctors as doctorsList } from "../data/doctors";

const PainHistoryModal = ({ records = [], onClose }) => {
  const navigate = useNavigate();
  const [activeSendIndex, setActiveSendIndex] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [isSending, setIsSending] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  /**
   * Отправка данных врачу согласно спецификации
   * Основной сценарий:
   * 1. Система объединяет данные боли и ID врача в единый JSON-объект
   * 2. Система отправляет JSON-структуру на сервер
   * 3. Система получает ответ об успешной отправке
   * 4. Отображается уведомление: «Данные успешно отправлены врачу»
   * 5. Конец
   */
  const handleSendSingleRecord = async (record, doctorId) => {
    // Шаг 1: Объединяем данные боли и ID врача в единый JSON-объект
    const selectedDoctorData = doctorsList.find(doc => doc.id === parseInt(doctorId));
    
    if (!selectedDoctorData) {
      alert("Ошибка: Врач не найден");
      return;
    }

    const requestData = {
      doctor_id: parseInt(doctorId),
      doctor_name: selectedDoctorData.name,
      doctor_specialty: selectedDoctorData.specialty,
      pain_history: [{
        id: record.id,
        pain_point_name: record.pain_point_name,
        pain_intensity: record.pain_intensity,
        pain_type: record.pain_type,
        time_of_day: record.time_of_day,
        body_position: record.body_position,
        breathing_relation: record.breathing_relation,
        physical_activity_relation: record.physical_activity_relation,
        stress_relation: record.stress_relation,
        record_date: record.record_date,
        user_id: record.user_id
      }],
      sent_at: new Date().toISOString()
    };

    setIsSending(true);

    try {
      // Шаг 2: Система отправляет JSON-структуру на сервер
      // ВАЖНО: Замените URL на реальный адрес вашего сервера
      const response = await fetch("http://localhost:5000/send-to-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      // Шаг 3: Система получает ответ об успешной отправке
      if (response.ok) {
        const result = await response.json();
        
        // Сохраняем информацию об отправке в localStorage для истории
        const sentRecords = JSON.parse(localStorage.getItem('sentToDoctors') || '[]');
        sentRecords.push({
          ...requestData,
          sent_successfully: true,
          sent_at: new Date().toISOString()
        });
        localStorage.setItem('sentToDoctors', JSON.stringify(sentRecords));

        // Шаг 4: Отображается уведомление: «Данные успешно отправлены врачу»
        alert("Данные успешно отправлены врачу");
        setActiveSendIndex(null);
        setSelectedDoctor((prev) => {
          const newState = { ...prev };
          delete newState[activeSendIndex];
          return newState;
        });
      } else {
        // Обработка ошибки от сервера
        const errorData = await response.json().catch(() => ({ message: "Неизвестная ошибка сервера" }));
        throw new Error(errorData.message || `Ошибка сервера: ${response.status}`);
      }
    } catch (error) {
      // Альтернативный сценарий: Если сервер недоступен или произошла ошибка
      console.error("Ошибка при отправке данных врачу:", error);
      
      // Шаг 11: Система выводит сообщение об ошибке
      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        alert("Не удалось отправить данные. Сервер недоступен. Попробуйте позже.");
      } else {
        alert("Не удалось отправить данные. Попробуйте позже.");
      }
      
      // Шаг 12: Пользователь может повторить попытку отправки позже
      // (не закрываем форму, чтобы пользователь мог повторить попытку)
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">История болей</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {records.length === 0 ? (
              <p className="text-muted">Записей нет.</p>
            ) : (
              <div className="accordion" id="painRecordsAccordion">
                {records.map((rec, index) => (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`collapse${index}`}
                      >
                        Боль #{index + 1} — {rec.pain_point_name || "Не указано"} —{" "}
                        {rec.record_date
                          ? new Date(rec.record_date).toLocaleString()
                          : "Без даты"}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#painRecordsAccordion"
                    >
                      <div className="accordion-body">
                        <ul className="list-group list-group-flush">
                          <div className="mt-2 text-end">
                          {activeSendIndex === index ? (
                            <div>
                              <select
                                className="form-select mb-2"
                                value={selectedDoctor[index] || ""}
                                onChange={(e) =>
                                  setSelectedDoctor((prev) => ({
                                    ...prev,
                                    [index]: e.target.value,
                                  }))
                                }
                                disabled={isSending}
                              >
                                <option value="">Выберите врача</option>
                                {doctorsList.map((doc) => (
                                  <option key={doc.id} value={doc.id}>
                                    {doc.specialty} - {doc.name}
                                  </option>
                                ))}
                              </select>
                              <button
                                className="btn btn-success btn-sm me-2"
                                disabled={!selectedDoctor[index] || isSending}
                                onClick={() => handleSendSingleRecord(rec, selectedDoctor[index])}
                              >
                                {isSending ? "Отправка..." : "Подтвердить отправку"}
                              </button>
                              <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => setActiveSendIndex(null)}
                              >
                                Отмена
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => setActiveSendIndex(index)}
                            >
                              Отправить врачу
                            </button>
                          )}
                        </div>
                          <li className="list-group-item"><strong>Точка:</strong> {rec.pain_point_name || "—"}</li>
                          <li className="list-group-item"><strong>Интенсивность:</strong> {rec.pain_intensity || "—"}</li>
                          <li className="list-group-item"><strong>Тип боли:</strong> {rec.pain_type || "—"}</li>
                          <li className="list-group-item"><strong>Время суток:</strong> {rec.time_of_day || "—"}</li>
                          <li className="list-group-item"><strong>Положение тела:</strong> {rec.body_position || "—"}</li>
                          <li className="list-group-item"><strong>Связь с дыханием:</strong> {rec.breathing_relation || "—"}</li>
                          <li className="list-group-item"><strong>Физическая активность:</strong> {rec.physical_activity_relation || "—"}</li>
                          <li className="list-group-item"><strong>Стресс:</strong> {rec.stress_relation || "—"}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainHistoryModal;
