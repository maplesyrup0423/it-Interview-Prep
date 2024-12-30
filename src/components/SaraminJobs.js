import React, { useEffect, useState } from "react";
import { fetchSaraminJobs } from "../api/saraminApi";

const SaraminJobs = ({ keywords }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchSaraminJobs(keywords);
        setJobs(result);
      } catch (err) {
        setError("채용 공고를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [keywords]);

  if (loading) return <p>채용 공고를 불러오는 중...</p>;
  if (error) return <p>{error}</p>;
  if (jobs.length === 0) return <p>검색된 공고가 없습니다.</p>;

  return (
    <div>
      <h1>{keywords} 관련 채용 공고</h1>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              {job.company.name} - {job.position.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaraminJobs;
