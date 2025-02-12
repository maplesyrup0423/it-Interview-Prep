// src/api/newsApi.js

const fetchITNews = async () => {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const endpoint = `https://newsapi.org/v2/everything?q=IT%20OR%20프로그래밍%20OR%20소프트웨어&language=ko&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("뉴스를 가져오는 데 실패했습니다.");
    }
    const data = await response.json();
    const filteredArticles = data.articles.filter(
      (article) =>
        !article.title.includes("정치") &&
        !article.title.includes("국회") &&
        !article.title.includes("대선") &&
        !article.title.includes("대통령")
    );
    return filteredArticles; // 정치 관련 기사를 제외한 뉴스 기사 배열 반환
  } catch (error) {
    console.error("API 호출 에러:", error);
    return [];
  }
};

export default fetchITNews;
