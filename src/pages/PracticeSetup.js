import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../data/questions.json";

const PracticeSetup = ({ onStart }) => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(5);
  const navigate = useNavigate();

  const handleStart = () => {
    let filteredQuestions = questionsData;
    if (selectedCategory !== "전체") {
      filteredQuestions = questionsData.filter(
        (q) => q.category === selectedCategory
      );
    }

    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, selectedQuestionCount);

    onStart(selectedQuestions); // 선택한 질문 저장
    navigate("/practice"); // 연습 모드로 이동
  };

  return (
    <div className="flex justify-center items-start pt-12">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md border">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 text-center">
          연습 모드 설정
        </h1>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            카테고리를 선택하세요:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded p-3"
          >
            <option value="전체">전체</option>
            <option value="프론트엔드">프론트엔드</option>
            <option value="백엔드">백엔드</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            문제 수를 선택하세요:
          </label>
          <div className="flex flex-col gap-2">
            {[5, 10].map((num) => (
              <label key={num} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={num}
                  checked={selectedQuestionCount === num}
                  onChange={() => setSelectedQuestionCount(num)}
                  className="text-blue-500"
                />
                {num}개
              </label>
            ))}
          </div>
        </div>

        <div className="mt-8 w-full flex">
          <button
            onClick={handleStart}
            className="w-full py-3 bg-green-600 text-white rounded text-center"
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeSetup;
