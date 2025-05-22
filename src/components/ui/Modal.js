import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="btn-close float-end" aria-label="Close" onClick={onClose}></button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
