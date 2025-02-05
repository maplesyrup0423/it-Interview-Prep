import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebaseConfig"; // Firebase 설정
import { collection, addDoc } from "firebase/firestore"; // Firestore 메서드
import { useNavigate } from "react-router-dom";

const TIMER_DURATION = 5; // 타이머 시간

const Practice = ({ questions, user }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isTimeOver, setIsTimeOver] = useState(false); // 타이머 종료 여부
  const [message, setMessage] = useState(""); // 타이머 종료 메시지
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 버튼 비활성화 상태
  const [showResults, setShowResults] = useState(false); // 결과 화면 표시 여부

  const timerRef = useRef(null); // 타이머 저장
  const questionStartTimeRef = useRef(null); // 각 문제 시작 시간 저장

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex] || null;

  const navigate = useNavigate();

  useEffect(() => {
    // 선택된 질문이 없으면 /practiceSetup으로 리다이렉트
    if (questions.length === 0) {
      navigate("/practiceSetup");
    }
  }, [questions, navigate]);

  useEffect(() => {
    if (currentQuestionIndex === 0 && !sessionStartTime) {
      setSessionStartTime(new Date());
    }
    if (!isTimeOver) {
      startTimer(); // 타이머 시작
    }

    return () => clearInterval(timerRef.current); // 타이머 정리
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (
      userAnswers &&
      userAnswers[currentQuestionIndex]?.timeSpent !== undefined
    ) {
      handleSubmit();
    }
  }, [userAnswers]); // userAnswers 변경될 때마다 실행

  // 타이머 설정
  const startTimer = () => {
    clearInterval(timerRef.current); // 기존 타이머 제거
    setTimeLeft(TIMER_DURATION); // 타이머 초기화
    setMessage(""); // 메시지 초기화
    questionStartTimeRef.current = new Date(); // 각 문제 시작 시간 기록

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOver(); // 타이머 종료 처리
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 타임오버 처리
  const handleTimeOver = () => {
    setIsTimeOver(true); // 타임오버 상태 설정
    setMessage("시간이 초과되었습니다. 다음/제출 버튼을 누르세요.");
  };

  // 현재 문제에 소요된 시간 기록
  const recordTimeForCurrentQuestion = () => {
    if (questionStartTimeRef.current) {
      const questionEndTime = new Date();
      const timeSpent = (questionEndTime - questionStartTimeRef.current) / 1000; // 초 단위로 소요 시간 계산
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestionIndex] = {
        ...updatedAnswers[currentQuestionIndex],
        timeSpent, // 소요 시간 추가
      };
      setUserAnswers(updatedAnswers);
    }
  };

  // 다음 문제로 이동
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      recordTimeForCurrentQuestion(); // 다음 문제로 넘어가기 전에 소요 시간 기록
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setIsTimeOver(false); // 다음 문제로 넘어갈 때 타이머 상태 초기화
      setMessage(""); // 메시지 초기화
    } else {
      recordTimeForCurrentQuestion();
    }
  };

  // 유저 답변 처리
  const handleAnswerChange = (e) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = {
      answer: e.target.value,
    };
    setUserAnswers(updatedAnswers);
  };

  // 전체 제출 처리
  const handleSubmit = async () => {
    if (!user || isSubmitting) return; // 중복 실행 방지
    setIsSubmitting(true); // 버튼 비활성화

    try {
      const sessionData = {
        startTime: sessionStartTime,
        endTime: new Date(),
        totalQuestions,
        userAnswers: userAnswers.map((answer, index) => ({
          question: questions[index]?.question || "No question",
          answer: answer?.answer ?? "",
          timeSpent: answer?.timeSpent ?? -10, // 각 문제 소요 시간 포함
          category: questions[index]?.category || "카테고리 없음", // 카테고리 추가
          correctAnswer: questions[index]?.answer || "모범답안 없음", // 모범답안 추가
        })),
        createdAt: new Date(),
      };

      await addDoc(collection(db, "users", user.uid, "sessions"), sessionData);
      console.log("모든 답변이 저장되었습니다!");
      setShowResults(true); // 결과 화면 표시
    } catch (error) {
      console.error("답변 저장 중 에러 발생:", error.message);
      alert("답변 저장에 실패했습니다.");
    } finally {
      // setIsSubmitting(false); // 에러 발생 여부와 상관없이 버튼을 다시 활성화
    }
  };

  const renderResults = () => {
    return (
      <div className="bg-gray-100 p-8 rounded-lg shadow-xl mx-auto mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          연습 결과
        </h2>
        <div>
          {questions.map((question, index) => (
            <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-sm">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                <strong>질문:</strong> {question.question}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>카테고리:</strong> {question.category}
              </p>
              <div className="border-t border-gray-200 my-4"></div>
              <p className="text-gray-600 mb-2">
                <strong>답변:</strong> {userAnswers[index]?.answer || "없음"}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>모범답안:</strong> {question.answer}
              </p>
              <p className="text-gray-600">
                <strong>소요 시간:</strong>{" "}
                {userAnswers[index]?.timeSpent >= TIMER_DURATION
                  ? `${TIMER_DURATION}초 (시간 초과)`
                  : `${Math.max(
                      Math.floor(userAnswers[index]?.timeSpent),
                      1
                    )}초`}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">연습 모드</h1>

      {/* 진행 상황 & 타이머 */}
      <div className="flex justify-between items-center text-gray-600 mb-6">
        <div className="flex flex-col items-start w-full max-w-xs">
          <p className="text-xl font-semibold">
            진행 상황: {currentQuestionIndex + 1} / {totalQuestions}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="h-3 rounded-full bg-blue-600"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) * 100) / totalQuestions
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* 타이머*/}
        {!showResults && (
          <div className="flex items-center space-x-4">
            <div className="text-xl font-semibold text-gray-800">
              <p>
                남은 시간: {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 결과 화면 */}
      {showResults ? (
        renderResults()
      ) : // 질문 영역
      currentQuestion ? (
        <div className="bg-gray-100 p-6 mb-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-600 mb-2">
            카테고리: {currentQuestion.category}
          </p>
          <p className="text-lg font-semibold mb-4">
            {currentQuestion.question}
          </p>

          {/* 답안 입력창 */}
          <textarea
            className="w-full mt-4 p-3 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            rows="3"
            placeholder="당신의 답변을 입력하세요..."
            value={userAnswers[currentQuestionIndex]?.answer || ""}
            onChange={handleAnswerChange}
            disabled={isTimeOver} // 타이머 종료 시 입력 불가
          />

          {/* 타이머 종료 후 메시지 */}
          {message && <p className="text-red-600 text-center">{message}</p>}

          {/* 버튼 텍스트를 조건에 맞게 변경 */}
          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              disabled={isSubmitting}
            >
              {currentQuestionIndex === totalQuestions - 1
                ? "제출"
                : "다음 문제"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">모든 질문이 완료되었습니다.</p>
      )}
    </div>
  );
};

export default Practice;
