import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold">
          IT Interview Prep
        </Link>
        <div>
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
