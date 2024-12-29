import React from "react";

const RecommendedResources = () => {
  const resources = [
    {
      title: "GitHub 포트폴리오 가이드",
      description: "효과적인 GitHub 포트폴리오 만들기 위한 가이드입니다.",
      link: "https://github.com/firstcontributions/first-contributions",
    },
    {
      title: "LeetCode",
      description: "코딩 테스트 준비를 위한 문제 풀이 사이트입니다.",
      link: "https://leetcode.com",
    },
    {
      title: "HackerRank",
      description:
        "다양한 알고리즘 문제와 코딩 인터뷰 연습을 제공하는 사이트입니다.",
      link: "https://www.hackerrank.com",
    },
    {
      title: "기술 블로그 추천 글",
      description: "기술 관련 다양한 주제의 글들을 읽을 수 있는 블로그입니다.",
      link: "https://medium.com",
    },
    {
      title: "Codewars",
      description: "알고리즘 문제를 풀며 실력을 키울 수 있는 사이트입니다.",
      link: "https://www.codewars.com",
    },
    {
      title: "Stack Overflow",
      description: "프로그래밍 관련 질문과 답변을 찾을 수 있는 커뮤니티입니다.",
      link: "https://stackoverflow.com",
    },
  ];

  return (
    <div className="p-4 border rounded  shadow mt-12">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        추천 리소스
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="p-4 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-all"
          >
            <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                {resource.title}
              </a>
            </h3>
            <p className="text-sm text-gray-500 mt-2">{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedResources;
