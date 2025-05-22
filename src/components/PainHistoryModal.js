import React from "react";
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

  const painTypesMap = {
    1: "Острая", 2: "Тупая", 3: "Пульсирующая", 4: "Жгучая", 5: "Ноющая",
    6: "Колючая", 7: "Стреляющая", 8: "Сжимающая", 9: "Давящая"
  };

  const timeOfDayMap = {
    1: "Утро", 2: "День", 3: "Вечер", 4: "Ночь"
  };

  const bodyPositionMap = {
    1: "Связана с положением тела", 2: "Не зависит от положения тела"
  };

  const breathingMap = {
    1: "Связана с дыханием", 2: "Не зависит от дыхания"
  };

  const physicalActivityMap = {
    1: "Связана с физической активностью", 2: "Не зависит от физической активности"
  };

  const stressMap = {
    1: "Связана со стрессом", 2: "Не зависит от стресса"
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
                        Боль #{index + 1} — {rec.record_date ? new Date(rec.record_date).toLocaleString() : "Без даты"}
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
                          <li className="list-group-item"><strong>Точка ID:</strong> {rec.pain_point_id ?? "—"}</li>
                          <li className="list-group-item"><strong>Интенсивность:</strong> {rec.pain_intensity_id ?? "—"}</li>
                          <li className="list-group-item"><strong>Тип боли:</strong> {painTypesMap[rec.pain_type_id] ?? `Тип #${rec.pain_type_id ?? "?"}`}</li>
                          <li className="list-group-item"><strong>Время суток:</strong> {timeOfDayMap[rec.time_of_day_id] ?? "—"}</li>
                          <li className="list-group-item"><strong>Положение тела:</strong> {bodyPositionMap[rec.body_position_relation_id] ?? "—"}</li>
                          <li className="list-group-item"><strong>Связь с дыханием:</strong> {breathingMap[rec.breathing_relation_id] ?? "—"}</li>
                          <li className="list-group-item"><strong>Физическая активность:</strong> {physicalActivityMap[rec.physical_activity_relation_id] ?? "—"}</li>
                          <li className="list-group-item"><strong>Стресс:</strong> {stressMap[rec.stress_relation_id] ?? "—"}</li>
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
