import React, { useState, useEffect } from "react";

const Tracker = () => {
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState("지원중");
  const [jobLink, setJobLink] = useState("");
  const [memo, setMemo] = useState("");
  const [jobs, setJobs] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // 수정할 항목의 인덱스를 추적하는 상태

  // 로컬스토리지에서 데이터 불러오기
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  // 데이터 저장 함수
  const saveToLocalStorage = (updatedJobs) => {
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  // 추가 버튼 클릭 시
  const handleAddJob = (e) => {
    e.preventDefault();

    const newJob = { companyName, status, jobLink, memo };
    const updatedJobs = [...jobs, newJob];

    saveToLocalStorage(updatedJobs);
    setCompanyName("");
    setStatus("지원중");
    setJobLink("");
    setMemo("");
  };

  // 수정 버튼 클릭 시
  const handleEditJob = (index) => {
    const jobToEdit = jobs[index];
    setCompanyName(jobToEdit.companyName);
    setStatus(jobToEdit.status);
    setJobLink(jobToEdit.jobLink);
    setMemo(jobToEdit.memo);
    setEditIndex(index); // 수정할 항목의 인덱스를 저장
  };

  // 수정 완료 버튼 클릭 시
  const handleUpdateJob = (e) => {
    e.preventDefault();

    const updatedJobs = [...jobs];
    updatedJobs[editIndex] = { companyName, status, jobLink, memo }; // 수정한 항목을 업데이트

    saveToLocalStorage(updatedJobs);
    setCompanyName("");
    setStatus("지원중");
    setJobLink("");
    setMemo("");
    setEditIndex(null); // 수정 완료 후 인덱스 초기화
  };

  // 수정 취소 버튼 클릭 시
  const handleCancelEdit = () => {
    setCompanyName("");
    setStatus("지원중");
    setJobLink("");
    setMemo("");
    setEditIndex(null); // 수정 상태 취소
  };

  // 삭제 버튼 클릭 시
  const handleDeleteJob = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    saveToLocalStorage(updatedJobs);
  };
  const handleUpdateStatus = (index, newStatus) => {
    const updatedJobs = [...jobs];
    updatedJobs[index].status = newStatus;
    saveToLocalStorage(updatedJobs); // 로컬 스토리지에 업데이트된 목록 저장
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">취업 준비 트레커</h1>
      <form
        onSubmit={editIndex === null ? handleAddJob : handleUpdateJob}
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
          {editIndex !== null && (
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
            {editIndex === null ? "추가" : "수정 완료"}{" "}
            {/* 수정 시 버튼 텍스트 변경 */}
          </button>
        </div>
      </form>

      <div id="job-list" className="space-y-4">
        {jobs.map((job, index) => (
          <div key={index} className="p-4 border border-blue-500 rounded">
            <div>
              <div className="flex justify-between items-center font-semibold">
                <span>{job.companyName}</span>
                <div className="mt-2">
                  <button
                    onClick={() => handleEditJob(index)}
                    className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteJob(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    삭제
                  </button>
                </div>
              </div>

              {/* 상태 */}
              <div className="mt-2">
                <label>상태: </label>
                <select
                  value={job.status}
                  onChange={(e) => handleUpdateStatus(index, e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="지원중">지원중</option>
                  <option value="면접대기">면접대기</option>
                  <option value="합격">합격</option>
                  <option value="불합격">불합격</option>
                </select>
              </div>
              <div>
                <label className="">채용 공고 링크: </label>
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
                <label className="">메모: </label>
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
