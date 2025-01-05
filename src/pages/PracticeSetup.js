import React, { useState } from "react";
import { Link } from "react-router-dom";

const PracticeSetup = ({ onStart }) => {
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(5); // 기본 5개 문제

  const handleStart = () => {
    // 선택된 문제 수를 전달하며 연습 모드 시작
    onStart({ category: "전체", questionCount: selectedQuestionCount });
  };

  return (
    <div className="flex justify-center items-start pt-12 ">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md border">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 text-center">
          연습 모드 설정
        </h1>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            카테고리를 선택하세요:
          </label>
          <select className="w-full border border-gray-300 rounded p-3">
            <option value="전체">전체</option>
            <option value="프론트엔드">프론트엔드</option>
            <option value="백엔드">백엔드</option>
          </select>
        </div>

        {/* 문제 수 선택: 라디오 버튼 */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            문제 수를 선택하세요:
          </label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="5"
                checked={selectedQuestionCount === 5}
                onChange={() => setSelectedQuestionCount(5)}
                className="text-blue-500"
              />
              5개
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="10"
                checked={selectedQuestionCount === 10}
                onChange={() => setSelectedQuestionCount(10)}
                className="text-blue-500"
              />
              10개
            </label>
          </div>
        </div>

        {/* 시작하기 */}
        <div className="mt-8  w-full flex ">
          <Link
            to="/practice"
            className="w-full py-3 bg-green-600 text-white rounded text-center"
          >
            시작하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PracticeSetup;
