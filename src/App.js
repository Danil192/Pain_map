import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PainMap from "./components/PainMap";
import PainRecordsPage from "./components/PainHistoryModal";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PainMap />} />
      </Routes>
    </Router>
  );
};

export default App;
