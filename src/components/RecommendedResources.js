import React from "react";

const RecommendedResources = () => {
  const resources = [
    {
      title: "GitHub 포트폴리오 가이드",
      description: "효과적인 GitHub 포트폴리오 만들기 위한 가이드입니다.",
      link: "https://github.com/firstcontributions/first-contributions",
    },
    {
      title: "백준 온라인 저지",
      description:
        "코딩 테스트 준비를 위한 국내 인기 알고리즘 문제 풀이 사이트입니다.",
      link: "https://www.acmicpc.net/",
    },
    {
      title: "프로그래머스",
      description:
        "국내 코딩 테스트 준비와 실전 문제 풀이에 적합한 플랫폼입니다.",
      link: "https://programmers.co.kr/",
    },
    {
      title: "코드 스테이츠 블로그",
      description:
        "국내 개발자 커리어 및 기술 관련 글들을 제공하는 블로그입니다.",
      link: "https://www.codestates.com/blog",
    },
    {
      title: "노마드 코더",
      description:
        "다양한 웹 개발 강의와 실습을 제공하는 한국 개발자 학습 플랫폼입니다.",
      link: "https://nomadcoders.co/",
    },
    {
      title: "생활코딩",
      description: "초보 개발자를 위한 무료 프로그래밍 강의 자료를 제공합니다.",
      link: "https://opentutorials.org/",
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
