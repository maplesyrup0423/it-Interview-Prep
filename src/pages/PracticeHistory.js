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
      const sessionData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSessions(sessionData);
    };
    fetchSessions();
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">연습 히스토리</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
            onClick={() => navigate(`/practiceHistory/${session.id}`)}
          >
            <p className="text-gray-800 font-semibold">
              {new Date(session.createdAt.seconds * 1000).toLocaleString()}
            </p>
            <p className="text-gray-500">
              총 질문 수: {session.totalQuestions}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeHistory;
