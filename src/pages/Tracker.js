import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Tracker = () => {
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState("지원중");
  const [jobLink, setJobLink] = useState("");
  const [memo, setMemo] = useState("");
  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState(null); // 수정할 항목의 ID를 추적

  const user = auth.currentUser;

  // Firestore에서 사용자별 데이터 불러오기
  const fetchJobs = async () => {
    try {
      if (!user) return;
      const jobsCollection = collection(db, "users", user.uid, "jobs");
      const querySnapshot = await getDocs(jobsCollection);
      const fetchedJobs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(fetchedJobs);
    } catch (error) {
      console.error("데이터 로드 중 에러 발생:", error.message);
      alert("데이터를 불러오지 못했습니다. 다시 시도해주세요.");
    }
  };

  // 컴포넌트가 마운트되면 Firestore에서 데이터 불러오기
  useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [user]);

  // Firestore에 데이터 추가
  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!user) return; // 로그인이 안 된 경우 처리

    const jobsCollection = collection(db, "users", user.uid, "jobs");
    const newJob = { companyName, status, jobLink, memo };
    const docRef = await addDoc(jobsCollection, newJob);

    setJobs([...jobs, { id: docRef.id, ...newJob }]);
    setCompanyName("");
    setStatus("지원중");
    setJobLink("");
    setMemo("");
  };

  // Firestore에 데이터 업데이트
  const handleUpdateJob = async (e) => {
    e.preventDefault();
    if (!user || !editId) return;

    const jobDoc = doc(db, "users", user.uid, "jobs", editId);
    const updatedJob = { companyName, status, jobLink, memo };
    await updateDoc(jobDoc, updatedJob);

    setJobs(
      jobs.map((job) =>
        job.id === editId ? { id: editId, ...updatedJob } : job
      )
    );
    setCompanyName("");
    setStatus("지원중");
    setJobLink("");
    setMemo("");
    setEditId(null);
  };

  // Firestore에서 데이터 삭제
  const handleDeleteJob = async (id) => {
    if (!user) return;

    const jobDoc = doc(db, "users", user.uid, "jobs", id);
    await deleteDoc(jobDoc);

    setJobs(jobs.filter((job) => job.id !== id));
  };

  // 수정 버튼 클릭 시
  const handleEditJob = (id) => {
    const jobToEdit = jobs.find((job) => job.id === id);
    setCompanyName(jobToEdit.companyName);
    setStatus(jobToEdit.status);
    setJobLink(jobToEdit.jobLink);
    setMemo(jobToEdit.memo);
    setEditId(id);
  };

  // 수정 취소 버튼 클릭 시
  const handleCancelEdit = () => {
    setCompanyName("");
    setStatus("지원중");
    setJobLink("");
    setMemo("");
    setEditId(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">취업 준비 트레커</h1>
      <form
        onSubmit={editId === null ? handleAddJob : handleUpdateJob}
        className="grid gap-4 mb-6"
      >
        <div className="flex gap-4">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="기업 이름"
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="지원중">지원중</option>
            <option value="면접대기">면접대기</option>
            <option value="합격">합격</option>
            <option value="불합격">불합격</option>
          </select>
        </div>

        <input
          type="url"
          value={jobLink}
          onChange={(e) => setJobLink(e.target.value)}
          placeholder="채용공고 링크"
          className="p-2 border border-gray-300 rounded w-full"
        />

        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모"
          className="p-2 border border-gray-300 rounded w-full"
        />

        <div className="flex gap-4">
          {editId !== null && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full"
            >
              수정 취소
            </button>
          )}
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            {editId === null ? "추가" : "수정 완료"}
          </button>
        </div>
      </form>

      <div id="job-list" className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 border border-blue-500 rounded">
            <div>
              <div className="flex justify-between items-center font-semibold">
                <span>{job.companyName}</span>
                <div className="mt-2">
                  <button
                    onClick={() => handleEditJob(job.id)}
                    className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    삭제
                  </button>
                </div>
              </div>

              {/* 상태 */}
              <div className="mt-2">
                <label>상태: </label>
                <span>{job.status}</span>
              </div>
              <div>
                <label>채용 공고 링크: </label>
                {job.jobLink ? (
                  <a
                    href={job.jobLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    링크로 이동
                  </a>
                ) : (
                  <span className="text-gray-600">[공란]</span>
                )}
              </div>
              <div>
                <label>메모: </label>
                {job.memo ? (
                  job.memo
                ) : (
                  <span className="text-gray-600">[공란]</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracker;
