import React, { useState } from "react";
import questions from "../data/questions.json";

const Practice = () => {
  const [category, setCategory] = useState("전체");
  const [showAnswers, setShowAnswers] = useState({}); // 각 질문의 답변 상태 관리
  const [userAnswers, setUserAnswers] = useState({}); // 사용자 답변 관리

  // 카테고리에 따른 질문 필터링
  const filteredQuestions =
    category === "전체"
      ? questions
      : questions.filter((q) => q.category === category);

  // 답변 토글
  const toggleAnswer = (id) => {
    setShowAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 사용자 답변 입력 처리
  const handleUserAnswerChange = (id, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [id]: answer,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">연습 모드</h1>

      {/* 카테고리 선택 */}
      <div className="mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="전체">전체</option>
          <option value="백엔드">백엔드</option>
          <option value="프론트엔드">프론트엔드</option>
        </select>
      </div>

      {/* 질문과 답변 리스트 */}
      <div>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <div
              key={question.id}
              className="flex items-start justify-between bg-gray-100 p-4 mb-2 rounded shadow"
            >
              <div className="w-full">
                <p className="text-sm text-gray-600 mb-2">
                  카테고리: {question.category}
                </p>
                <p className="text-lg font-semibold">{question.question}</p>

                {/* 사용자가 입력한 답변 */}
                <textarea
                  className="w-full mt-4 p-2 border rounded"
                  rows="2" // 세로 길이 줄이기
                  placeholder="당신의 답변을 입력하세요..."
                  value={userAnswers[question.id] || ""}
                  onChange={(e) =>
                    handleUserAnswerChange(question.id, e.target.value)
                  }
                />

                {/* 버튼 영역: 답변 보기와 제출 버튼을 한 줄에 배치 */}
                <div className="flex items-center justify-between mt-4">
                  {/* 답변 보기 버튼 */}
                  <button
                    onClick={() => toggleAnswer(question.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 min-w-[100px]"
                  >
                    {showAnswers[question.id] ? "답변 숨기기" : "답변 보기"}
                  </button>

                  {/* 답변 제출 버튼 */}
                  {/* <button
                    onClick={() => alert("답변을 제출했습니다!")}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    답변 제출
                  </button> */}
                </div>

                {/* 시스템의 정답 표시 여부 */}
                {showAnswers[question.id] && (
                  <p className="mt-4 text-green-600">{question.answer}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">해당 카테고리에 질문이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Practice;
