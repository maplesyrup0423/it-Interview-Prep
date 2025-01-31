import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig"; // Firebase 설정 파일에서 auth 가져오기
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import PracticeSetup from "./pages/PracticeSetup";
import Tracker from "./pages/Tracker";
import Questions from "./pages/Questions";
import Login from "./components/Login";
import SignUp from "./components/SignUp ";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]); // 질문 저장

  useEffect(() => {
    // 로그인 상태 추적
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 인증된 사용자만 접근 가능한 PrivateRoute
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <Navbar user={user} setUser={setUser} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<Questions />} />
          <Route
            path="/practice"
            element={<Practice questions={selectedQuestions} user={user} />} // 질문 전달
          />
          <Route
            path="/practiceSetup"
            element={<PracticeSetup onStart={setSelectedQuestions} />} // 질문 선택 후 저장
          />
          <Route
            path="/tracker"
            element={
              <PrivateRoute>
                <Tracker />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />
          {/* 이상한 경로로 들어오면 홈으로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
