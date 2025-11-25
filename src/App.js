import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PainMap from "./components/PainMap";
import PainRecordsPage from "./components/PainHistoryModal";
import { UserProvider } from "./context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';


const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PainMap />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
