// src/components/NewsSection.js

import React, { useEffect, useState } from "react";
import fetchITNews from "../api/newsApi"; // fetchITNews 함수 임포트

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      const articles = await fetchITNews(); // 뉴스 데이터 가져오기
      setNews(articles); // 상태 업데이트
      setLoading(false); // 로딩 완료
    };
    loadNews();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">로딩 중...</div>;
  }

  return (
    <div className="p-4 border rounded  shadow mt-12">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        IT 뉴스
      </h2>
      <ul className="space-y-4">
        {news.slice(0, 5).map((article, index) => (
          <li key={index} className="border-b pb-4">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors hover:underline"
            >
              {article.title}
            </a>
            <p className="text-sm text-gray-500">
              {article.source.name} -{" "}
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-gray-500">
        더 많은 뉴스를 보려면{" "}
        <a
          href="https://news.google.com/search?q=IT"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          여기
        </a>
        를 클릭하세요.
      </p>
    </div>
  );
};

export default NewsSection;
