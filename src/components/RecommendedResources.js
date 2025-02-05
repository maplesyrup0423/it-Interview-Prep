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
      title: "개발자 포트폴리오",
      description: "개발자 포트폴리오를 참고할 수 있는 사이트입니다.",
      link: "https://maple2423-portfolio.netlify.app/",
    },
    {
      title: "개발자 GitHub",
      description:
        "개발자 GitHub 프로필에서 프로젝트와 활동을 확인할 수 있습니다.",
      link: "https://github.com/maplesyrup0423",
    },
    {
      title: "코딩 타자 연습",
      description: "타자 실력을 키울 수 있는 코딩 타자 연습 사이트입니다.",
      link: "https://maplesyrup-devtyper.netlify.app/",
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
