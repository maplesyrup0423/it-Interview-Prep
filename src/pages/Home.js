import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewsSection from "../components/NewsSection";
import RecommendedResources from "../components/RecommendedResources";
// import SaraminJobs from "../components/SaraminJobs";
import { kadvice } from "kadvice";

const Home = () => {
  const [quote, setQuote] = useState({
    author: "",
    authorProfile: "",
    message: "",
  });

  // 랜덤 명언 가져오기
  useEffect(() => {
    setQuote(kadvice.getOne()); // 최초 1회 실행
  }, []);

  const [term, setTerm] = useState({
    term: "",
    category: "",
    description: "",
  });

  // 랜덤 IT 용어 가져오기
  useEffect(() => {
    const fetchTerm = async () => {
      try {
        const url =
          "https://api.allorigins.win/raw?url=" +
          encodeURIComponent(
            "https://devdict-api.vercel.app/terms/random?nocache=" + Date.now()
          );
        const res = await fetch(url);
        const data = await res.json();
        setTerm(data);
      } catch (error) {
        console.error("랜덤 IT 용어를 가져오는데 실패했습니다.", error);
      }
    };
    fetchTerm();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* 명언 */}
      <div className="p-4 border rounded shadow text-center">
        <p className="text-xl font-semibold text-gray-900 leading-relaxed">
          "{quote.message}"
        </p>
        <p className="mt-4 text-lg text-gray-700 font-medium">
          - {quote.author}{" "}
          <span className="text-gray-500">({quote.authorProfile})</span>
        </p>
      </div>

      {/* 랜덤 IT 용어 */}
      <div className="p-4 border rounded shadow text-center mb-6 mt-4">
        {term.term ? (
          <>
            <p className="text-lg font-medium ">
              {term.term} ({term.category})
            </p>
            <p className="mt-2 text-gray-700">{term.description}</p>
          </>
        ) : (
          <p>용어를 불러오는 중...</p>
        )}
      </div>

      {/* 안내 카드 섹션 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* 면접 질문 리스트 */}
        <div className="p-4 border rounded shadow  transition">
          <h3 className="text-lg font-bold">면접 질문 리스트</h3>
          <p>카테고리별로 정리된 다양한 IT 면접 질문을 확인하세요.</p>
          <Link
            to="/questions"
            className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            질문 리스트 보기
          </Link>
        </div>

        {/* 면접 연습 모드 */}
        <div className="p-4 border rounded shadow  transition">
          <h3 className="text-lg font-bold">면접 연습 모드</h3>
          <p>랜덤 질문으로 실제 면접처럼 연습할 수 있는 기능입니다.</p>
          <Link
            to="/practice"
            className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            연습 모드 시작
          </Link>
        </div>

        {/* 취업 준비 트래커 */}
        <div className="p-4 border rounded shadow  transition">
          <h3 className="text-lg font-bold">취업 준비 트래커</h3>
          <p>지원 현황과 면접 일정을 효율적으로 관리하세요.</p>
          <Link
            to="/tracker"
            className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            트래커 사용하기
          </Link>
        </div>
      </div>
      <div className="flex space-x-6">
        {/* 추천 리소스 섹션 */}
        <RecommendedResources />
        {/* IT 뉴스 섹션 */}
        <NewsSection />
      </div>
      {/* <SaraminJobs keywords="백엔드" /> */}
    </div>
  );
};

export default Home;
