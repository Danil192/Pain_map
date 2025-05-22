import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onShowHistory }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid justify-content-between">
        <span
          className="navbar-brand fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          🩺 Карта Болей
        </span>

        <div className="d-flex gap-3 align-items-center">
          <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
            Главная
          </button>

          <button className="btn btn-outline-secondary" onClick={onShowHistory}>
            История болей
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
