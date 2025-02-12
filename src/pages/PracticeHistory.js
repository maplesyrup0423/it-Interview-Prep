import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const PracticeHistory = ({ user }) => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchHistory = async () => {
      setLoading(true);
      const historyRef = collection(db, "users", user.uid, "user_practices");
      const q = query(historyRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const historyData = snapshot.docs.map((doc) => {
        const data = doc.data();
        const duration =
          data.endTime && data.startTime
            ? data.endTime.seconds - data.startTime.seconds // 초 단위로 변환
            : "N/A";
        return {
          id: doc.id,
          ...data,
          duration,
        };
      });
      setHistory(historyData);
      setLoading(false);
    };
    fetchHistory();
  }, [user]);
  if (loading) {
    return <LoadingSpinner />; // 로딩 중일 때 로딩 스피너 표시
  }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        연습 히스토리
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer border border-gray-200 w-full"
            onClick={() => navigate(`/practiceHistory/${item.id}`)}
          >
            <p className="text-lg font-semibold text-gray-900">
              {new Date(item.createdAt.seconds * 1000).toLocaleString()}
            </p>
            <p className="text-gray-600 mt-2">
              총 질문 수:{" "}
              <span className="font-medium">{item.totalQuestions}</span>
            </p>
            <p className="text-gray-600">
              소요 시간: <span className="font-medium">{item.duration}초</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeHistory;
