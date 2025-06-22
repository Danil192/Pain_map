import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PainHistoryModal = ({ records = [], onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  const handleSendSingleRecord = async (record, doctorId) => {
  try {
    const response = await fetch("http://localhost:3001/send-to-doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctor_id: doctorId,
        pain_history: [record],
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Запись успешно отправлена врачу");
      setActiveSendIndex(null); 
    } else {
      alert("Ошибка при отправке: " + result.message);
    }
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Произошла ошибка при отправке");
  }
};

const [activeSendIndex, setActiveSendIndex] = useState(null);
const [selectedDoctor, setSelectedDoctor] = useState({});
const [doctors, setDoctors] = useState([]);

useEffect(() => {
  // Подгружаем список врачей при монтировании
  fetch("http://localhost:3001/doctors")
    .then((res) => res.json())
    .then((data) => setDoctors(data))
    .catch((err) => console.error("Ошибка загрузки врачей:", err));
}, []);

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
                        Боль #{index + 1} —{" "}
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
                              >
                                <option value="">Выберите врача</option>
                                {doctors.map((doc) => (
                                  <option key={doc.id} value={doc.id}>
                                    {doc.name}
                                  </option>
                                ))}
                              </select>
                              <button
                                className="btn btn-success btn-sm me-2"
                                disabled={!selectedDoctor[index]}
                                onClick={() => handleSendSingleRecord(rec, selectedDoctor[index])}
                              >
                                Подтвердить отправку
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
