import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = ({ user, setUser }) => {
  // setUser를 추가로 받아옴
  return (
    <nav className="bg-blue-500 p-4 text-white sticky top-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          IT Interview Prep
        </Link>
        <div className="flex items-center">
          <Link to="/questions" className="mr-4 hover:underline">
            질문 리스트
          </Link>
          <Link to="/practiceSetup" className="mr-4 hover:underline">
            연습 모드
          </Link>
          <Link to="/PracticeHistory" className="mr-4 hover:underline">
            연습 기록
          </Link>
          <Link to="/tracker" className="mr-4 hover:underline">
            트래커
          </Link>
          {user ? (
            <>
              <span className="mr-4">
                | 안녕하세요, {user.email || "사용자"}님!
              </span>
              <Logout setUser={setUser} /> {/* setUser를 전달 */}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-green-500 px-3 py-2 rounded mr-2 hover:bg-green-600"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-gray-500 px-3 py-2 rounded hover:bg-gray-600"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
