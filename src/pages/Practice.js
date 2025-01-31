import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Firebase 설정 파일에서 db 가져오기
import { collection, addDoc } from "firebase/firestore"; // Firestore 메서드
const Practice = ({ questions, user }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // 유저의 답변 저장 상태
  const [sessionStartTime, setSessionStartTime] = useState(null); // 세션 시작 시간
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // 세션 시작 시간 기록 (첫 번째 문제 시작 시)
    if (currentQuestionIndex === 0 && !sessionStartTime) {
      setSessionStartTime(new Date());
    }
  }, [currentQuestionIndex, sessionStartTime]);

  // 진행 비율 계산
  const progressPercentage =
    (currentQuestionIndex + 1) * (100 / totalQuestions);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setUserAnswers(updatedAnswers);
  };

  // 전체 제출 처리
  const handleSubmit = async () => {
    if (!user) return;

    try {
      // 세션 데이터 저장 (sessions 컬렉션)
      const sessionData = {
        startTime: sessionStartTime,
        endTime: new Date(), // 전체 제출 시, 종료 시간 기록
        totalQuestions,
        userAnswers: userAnswers.map((answer, index) => ({
          question: questions[index].question, // 질문 텍스트 저장
          answer, // 답변
        })),
        createdAt: new Date(),
      };

      // 세션 정보를 Firestore에 저장
      await addDoc(collection(db, "users", user.uid, "sessions"), sessionData);

      alert("모든 답변이 저장되었습니다!");
    } catch (error) {
      console.error("답변 저장 중 에러 발생:", error.message);
      alert("답변 저장에 실패했습니다.");
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
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-red-600 text-white text-lg rounded hover:bg-red-700"
            >
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
          value={userAnswers[currentQuestionIndex] || ""}
          onChange={handleAnswerChange}
        />
        {/* 다음 문제 버튼 */}
        {currentQuestionIndex < totalQuestions - 1 && (
          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              다음 문제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
