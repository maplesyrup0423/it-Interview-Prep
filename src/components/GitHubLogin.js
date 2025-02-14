import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, githubProvider, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const GitHubLogin = ({ setUser }) => {
  const navigate = useNavigate();

  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: "github",
        createdAt: new Date().toISOString(),
      });

      setUser(user);
      navigate("/"); // 홈 페이지로 리디렉션
    } catch (error) {
      console.error("GitHub 로그인 실패:", error);
      // 에러 메시지를 화면에 표시하고 싶다면, 상태 관리 추가할 수 있음
    }
  };

  return (
    <button
      onClick={handleGitHubLogin}
      className="w-full bg-gray-800 text-white py-2 rounded flex items-center justify-center space-x-2 hover:bg-gray-900 transition duration-200"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
        <path d="M12 .297c-6.6 0-12 5.3-12 12 0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.582 0-.288-.012-1.053-.018-2.067-3.338.725-4.042-1.612-4.042-1.612-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.729.082-.729 1.205.086 1.84 1.24 1.84 1.24 1.07 1.834 2.805 1.304 3.49.998.108-.776.42-1.304.764-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.312.468-2.382 1.236-3.222-.125-.303-.536-1.525.117-3.176 0 0 1.008-.322 3.3 1.23.96-.266 1.98-.398 3-.403 1.02.005 2.04.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.655 1.65.244 2.873.12 3.176.768.84 1.235 1.91 1.235 3.222 0 4.61-2.807 5.625-5.475 5.92.43.372.81 1.103.81 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.217.7.825.58C20.565 22.092 24 17.592 24 12.297c0-6.7-5.4-12-12-12z" />
      </svg>
      <span>GitHub 로그인</span>
    </button>
  );
};

export default GitHubLogin;
