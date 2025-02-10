import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PracticeSessionDetail = () => {
  const { practiceId } = useParams();
  const [practice, setPractice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.error("사용자가 로그인되지 않았습니다.");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || !practiceId) return;
    const fetchPractice = async () => {
      try {
        const practiceRef = doc(
          db,
          "users",
          user.uid,
          "user_practices",
          practiceId
        );
        const practiceSnap = await getDoc(practiceRef);
        if (practiceSnap.exists()) {
          setPractice(practiceSnap.data());
        } else {
          console.error("해당 연습을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("연습을 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPractice();
  }, [practiceId, user]);

  if (loading) return <p>로딩 중...</p>;
  if (!practice) return <p>연습을 찾을 수 없습니다.</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-gray-100 p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          연습 결과
        </h2>
        <p className="text-lg text-gray-700 font-medium mb-4">
          <strong>시작 시간:</strong>{" "}
          {practice.startTime
            ? practice.startTime.toDate().toLocaleString()
            : "알 수 없음"}
        </p>
        <p className="text-lg text-gray-700 font-medium mb-6">
          <strong>총 문제 수:</strong> {practice.totalQuestions}
        </p>
        <div>
          {practice.userAnswers.map((answer, index) => (
            <div
              key={index}
              className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <p className="text-lg font-semibold text-gray-800 mb-2">
                <strong>질문:</strong> {answer.question}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>카테고리:</strong> {answer.category || "없음"}
              </p>
              <div className="border-t border-gray-200 my-4"></div>
              <p className="text-gray-600 mb-2">
                <strong>답변:</strong> {answer.answer || "없음"}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>모범답안:</strong>{" "}
                {answer.correctAnswer || "제공되지 않음"}
              </p>
              <p className="text-gray-600">
                <strong>소요 시간:</strong> {answer.timeSpent}초
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeSessionDetail;
