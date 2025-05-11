import React, { useState } from "react";
import RegisterModal from "./components/RegisterModal";

const App = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="App">
      <button
        onClick={() => setShowRegister(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Регистрация
      </button>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
};

export default App;
