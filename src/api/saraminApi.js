// saraminApi.js

const BASE_URL = "https://oapi.saramin.co.kr/job-search";
const API_KEY = process.env.REACT_APP_SARAMIN_API_KEY; // 환경 변수에서 API 키 로드

/**
 * 사람인 API에서 채용 공고를 검색하는 함수
 * @param {string} keywords - 검색 키워드
 * @param {number} count - 가져올 공고 개수 (기본값: 10)
 * @returns {Promise<Array>} - 채용 공고 리스트
 */
export const fetchSaraminJobs = async (keywords, count = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}?access-key=${API_KEY}&keywords=${encodeURIComponent(
        keywords
      )}&count=${count}`
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    // 채용 공고가 없을 경우 빈 배열 반환
    return data.jobs?.job || [];
  } catch (error) {
    console.error("사람인 API 호출 에러:", error);
    return [];
  }
};
