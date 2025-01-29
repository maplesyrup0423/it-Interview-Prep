import React, { useState } from "react";

const Practice = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  // 진행 비율 계산
  const progressPercentage =
    (currentQuestionIndex + 1) * (100 / totalQuestions);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">연습 모드</h1>

      {/* 상단에 진행 상황과 타이머, 제출 버튼을 배치 */}
      <div className="flex justify-between items-center text-gray-600 mb-6">
        {/* 왼쪽: 진행 상태 */}
        <div className="flex flex-col items-start w-full max-w-xs">
          <p className="text-xl font-semibold">
            진행 상황: {currentQuestionIndex + 1} / {totalQuestions}
          </p>
          {/* 진행 상태를 나타내는 막대 그래프 */}
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="h-3 rounded-full bg-blue-600"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* 오른쪽: 타이머 및 전체 제출 버튼 */}
        <div className="flex items-center space-x-4">
          {/* 타이머 */}
          <div className="text-xl font-semibold text-gray-800">
            <p>남은 시간: 03:00</p>
          </div>

          {/* 전체 제출 버튼 */}
          <div>
            <button className="px-6 py-3 bg-red-600 text-white text-lg rounded hover:bg-red-700">
              전체 제출
            </button>
          </div>
        </div>
      </div>

      {/* 질문 영역 */}
      <div className="bg-gray-100 p-6 mb-6 rounded-lg shadow-md">
        <p className="text-sm text-gray-600 mb-2">
          카테고리: {currentQuestion.category}
        </p>
        <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
        {/* 답안 입력창 */}
        <textarea
          className="w-full mt-4 p-3 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          rows="3"
          placeholder="당신의 답변을 입력하세요..."
        />
        {/* 다음 문제 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            다음 문제
          </button>
        </div>
      </div>
    </div>
  );
};

export default Practice;
