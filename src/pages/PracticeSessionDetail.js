import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PracticeSessionDetail = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // 사용자 정보 저장

  useEffect(() => {
    const auth = getAuth();

    // 사용자 로그인 상태 감지
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.error("사용자가 로그인되지 않았습니다.");
      }
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      if (!user) return; // user가 설정될 때까지 기다림

      try {
        const sessionRef = doc(db, "users", user.uid, "sessions", sessionId);
        const sessionSnap = await getDoc(sessionRef);

        if (sessionSnap.exists()) {
          setSession(sessionSnap.data());
        } else {
          console.error("해당 세션을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("세션을 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, user]); // user가 설정된 후 실행

  if (loading) return <p>로딩 중...</p>;
  if (!session) return <p>세션을 찾을 수 없습니다.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">세션 상세 정보</h1>
      <p>
        <strong>시작 시간:</strong>{" "}
        {session.startTime.toDate().toLocaleString()}
      </p>
      <p>
        <strong>총 문제 수:</strong> {session.totalQuestions}
      </p>
      <h2 className="text-xl font-semibold mt-6">답변 기록</h2>
      {session.userAnswers.map((answer, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg">
          <p>
            <strong>질문:</strong> {answer.question}
          </p>
          <p>
            <strong>답변:</strong> {answer.answer || "없음"}
          </p>
          <p>
            <strong>소요 시간:</strong> {answer.timeSpent}초
          </p>
        </div>
      ))}
    </div>
  );
};

export default PracticeSessionDetail;
