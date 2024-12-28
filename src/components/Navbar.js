import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white fixed top-0 left-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold">
          IT Interview Prep
        </Link>
        <div>
          <Link to="/questions" className="mr-4">
            질문 리스트
          </Link>
          <Link to="/practice" className="mr-4">
            연습 모드
          </Link>
          <Link to="/tracker">트래커</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
