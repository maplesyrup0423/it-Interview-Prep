// src/api/mediastackAPI.js

const fetchITNews = async () => {
  const apiKey = process.env.REACT_APP_MEDIASTACK_API_KEY;
  const endpoint = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=technology&languages=en`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(
        data.error?.message || "뉴스를 가져오는 데 실패했습니다."
      );
    }

    return data.data; // Mediastack API의 응답 구조에 맞게 수정
  } catch (error) {
    console.error("API 호출 에러:", error);
    return [];
  }
};

export default fetchITNews;
