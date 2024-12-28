import React, { useState } from "react";
import questions from "../data/questions.json";

const Practice = () => {
  const [category, setCategory] = useState("전체");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null); // 현재 질문의 인덱스
  const [questionHistory, setQuestionHistory] = useState([]); // 질문 히스토리 스택
  const [showAnswer, setShowAnswer] = useState(false); // 현재 질문의 답변 상태
  const [userAnswers, setUserAnswers] = useState({}); // 사용자 답변 관리

  // 카테고리에 따른 질문 필터링
  const filteredQuestions =
    category === "전체"
      ? questions
      : questions.filter((q) => q.category === category);

  // 랜덤 질문 인덱스 가져오기
  const getRandomQuestionIndex = () => {
    return Math.floor(Math.random() * filteredQuestions.length);
  };

  // 다음 질문 로드
  const loadNextQuestion = () => {
    if (filteredQuestions.length > 0) {
      if (currentQuestionIndex !== null) {
        setQuestionHistory((prev) => [...prev, currentQuestionIndex]); // 히스토리에 현재 질문 저장
      }
      const randomIndex = getRandomQuestionIndex();
      setCurrentQuestionIndex(randomIndex);
      setShowAnswer(false);
    }
  };

  // 이전 질문으로 돌아가기
  const goBackToPreviousQuestion = () => {
    if (questionHistory.length > 0) {
      const lastQuestionIndex = questionHistory.pop(); // 히스토리에서 마지막 질문 가져오기
      setCurrentQuestionIndex(lastQuestionIndex);
      setQuestionHistory([...questionHistory]); // 히스토리 업데이트
      setShowAnswer(false);
    }
  };

  // 사용자 답변 입력 처리
  const handleUserAnswerChange = (id, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [id]: answer,
    }));
  };

  // 초기 질문 로드
  React.useEffect(() => {
    if (filteredQuestions.length > 0) {
      loadNextQuestion();
    }
  }, [category]);

  // 현재 질문 가져오기
  const currentQuestion =
    currentQuestionIndex !== null
      ? filteredQuestions[currentQuestionIndex]
      : null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">연습 모드</h1>

      {/* 카테고리 선택 */}
      <div className="mb-4">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setQuestionHistory([]); // 카테고리가 변경되면 히스토리 초기화
          }}
          className="border p-2 rounded"
        >
          <option value="전체">전체</option>
          <option value="백엔드">백엔드</option>
          <option value="프론트엔드">프론트엔드</option>
        </select>
      </div>

      {/* 랜덤 질문 카드 */}
      {currentQuestion ? (
        <div className="bg-gray-100 p-4 mb-2 rounded shadow">
          <p className="text-sm text-gray-600 mb-2">
            카테고리: {currentQuestion.category}
          </p>
          <p className="text-lg font-semibold">{currentQuestion.question}</p>

          {/* 사용자가 입력한 답변 */}
          <textarea
            className="w-full mt-4 p-2 border rounded"
            rows="2"
            placeholder="당신의 답변을 입력하세요..."
            value={userAnswers[currentQuestion.id] || ""}
            onChange={(e) =>
              handleUserAnswerChange(currentQuestion.id, e.target.value)
            }
          />

          {/* 답변 보기 버튼 */}
          <div className="mt-4">
            <button
              onClick={() => setShowAnswer((prev) => !prev)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 min-w-[100px]"
            >
              {showAnswer ? "답변 숨기기" : "답변 보기"}
            </button>
          </div>

          {/* 정답 표시 */}
          {showAnswer && (
            <p className="mt-4 p-3 bg-green-100 border border-green-500 rounded text-green-600">
              {currentQuestion.answer}
            </p>
          )}

          {/* 이전 질문, 다음 질문 버튼 */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={goBackToPreviousQuestion}
              className={`px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 min-w-[100px] ${
                questionHistory.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={questionHistory.length === 0}
            >
              이전 질문
            </button>

            <button
              onClick={loadNextQuestion}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 min-w-[100px]"
            >
              다음 질문
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">해당 카테고리에 질문이 없습니다.</p>
      )}
    </div>
  );
};

export default Practice;
