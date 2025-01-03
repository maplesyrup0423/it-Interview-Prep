const fetchFeedback = async (answer) => {
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // 환경변수로 API 키 사용
      },
      body: JSON.stringify({
        model: "text-davinci-003", // 사용할 모델
        prompt: `사용자의 답변: "${answer}"\n이 답변에 대해 문법, 키워드, 문장 구조를 평가해 주세요.`,
        max_tokens: 150, // 응답 토큰의 최대 크기 설정
      }),
    });

    const data = await response.json();
    return data.choices[0].text; // AI 피드백 텍스트 반환
  } catch (error) {
    console.error("피드백 요청 실패:", error);
    throw new Error("피드백을 가져오는 데 실패했습니다.");
  }
};

export { fetchFeedback };
