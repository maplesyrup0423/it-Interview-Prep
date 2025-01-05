import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import questions from "../data/questions.json"; // questions.json 파일에서 질문 가져오기

const Questions = () => {
  const [category, setCategory] = useState("전체");
  const [userAnswers, setUserAnswers] = useState({}); // 사용자 답변 관리
  const [showAnswers, setShowAnswers] = useState({});
  const user = auth.currentUser;

  // 카테고리에 따른 질문 필터링
  const filteredQuestions =
    category === "전체"
      ? questions
      : questions.filter((q) => q.category === category);

  // 사용자 답변 입력 처리
  const handleUserAnswerChange = (id, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [id]: answer,
    }));
  };

  // 답변 저장 처리
  const handleSaveAnswer = async (questionId) => {
    if (!user) return;

    try {
      const answersCollection = collection(db, "users", user.uid, "answers");
      const newAnswer = {
        questionId,
        answer: userAnswers[questionId],
        createdAt: new Date(),
      };
      await addDoc(answersCollection, newAnswer);
      alert("답변이 저장되었습니다!");
    } catch (error) {
      console.error("답변 저장 중 에러 발생:", error.message);
      alert("답변 저장에 실패했습니다.");
    }
  };

  // 답변 보기 토글
  const toggleAnswer = (id) => {
    setShowAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    if (!user) return;

    const fetchUserAnswers = async () => {
      try {
        const answersCollection = collection(db, "users", user.uid, "answers");
        const querySnapshot = await getDocs(answersCollection);
        const answers = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          answers[data.questionId] = data.answer;
        });
        setUserAnswers(answers); // Firestore에서 가져온 답변을 상태에 저장
      } catch (error) {
        console.error("답변 조회 중 에러 발생:", error.message);
      }
    };

    fetchUserAnswers();
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">질문 리스트</h1>

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
                {user && (
                  <textarea
                    textarea
                    className="w-full mt-4 p-3 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    rows="3"
                    placeholder="당신의 답변을 입력하세요..."
                    value={userAnswers[question.id] || ""}
                    onChange={(e) =>
                      handleUserAnswerChange(question.id, e.target.value)
                    }
                  />
                )}
                {/* 버튼들 배치 */}
                <div className="flex justify-between ">
                  {/* 답변 보기 버튼 */}
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => toggleAnswer(question.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {showAnswers[question.id] ? "답변 숨기기" : "답변 보기"}
                    </button>
                  </div>
                  {/* 저장 버튼 */}
                  {user && (
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleSaveAnswer(question.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        저장
                      </button>
                    </div>
                  )}
                </div>

                {/* 시스템의 정답 표시 */}
                {showAnswers[question.id] && (
                  <p className="mt-4 p-3 bg-green-100 border border-green-500 rounded text-green-600">
                    {question.answer}
                  </p>
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

export default Questions;
