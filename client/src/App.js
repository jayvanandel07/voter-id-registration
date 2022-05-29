import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./pages/RegistrationPage";
import './App.css';

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
      })
  }, []);

  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
          <p>message:
            {data}
          </p>

        </header> */}
        <Routes>

          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
