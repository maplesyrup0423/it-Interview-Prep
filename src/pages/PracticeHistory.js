import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const PracticeHistory = ({ user }) => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchSessions = async () => {
      const sessionsRef = collection(db, "users", user.uid, "sessions");
      const q = query(sessionsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const sessionData = snapshot.docs.map((doc) => {
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
      setSessions(sessionData);
    };
    fetchSessions();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        연습 히스토리
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer border border-gray-200 w-full"
            onClick={() => navigate(`/practiceHistory/${session.id}`)}
          >
            <p className="text-lg font-semibold text-gray-900">
              {new Date(session.createdAt.seconds * 1000).toLocaleString()}
            </p>
            <p className="text-gray-600 mt-2">
              총 질문 수:{" "}
              <span className="font-medium">{session.totalQuestions}</span>
            </p>
            <p className="text-gray-600">
              소요 시간:{" "}
              <span className="font-medium">{session.duration}초</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeHistory;
