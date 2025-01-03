import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Firebase 설정 파일에서 auth 가져오기
import { useNavigate } from "react-router-dom";

const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // 로그아웃 후 사용자 정보 초기화
        navigate("/");
      })
      .catch((error) => {
        console.error("로그아웃 실패: ", error);
      });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 px-3 py-2 rounded hover:bg-red-600"
    >
      로그아웃
    </button>
  );
};

export default Logout;
