import React, { useState, useEffect } from "react";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/data/questions.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">질문 리스트</h1>
      <ul>
        {questions.map((q) => (
          <li key={q.id} className="mb-2">
            <p className="font-semibold">{q.question}</p>
            <p className="text-gray-600">{q.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
