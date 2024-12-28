import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import Tracker from "./pages/Tracker";
import Questions from "./pages/questions";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/tracker" element={<Tracker />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
