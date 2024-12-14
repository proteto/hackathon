"use client";
import { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "What's your favorite color?",
    options: ["Red", "Blue", "Green"],
    next: {
      Red: 2,
      Blue: 3,
      Green: 4
    },
  },
  {
    id: 2,
    question: "What shade of Red do you like?",
    options: ["Bright Red", "Dark Red"],
    next: {
      "Bright Red": 5,
      "Dark Red": 6,
    },
  },
  {
    id: 3,
    question: "What shade of Blue do you like?",
    options: ["Sky Blue", "Navy Blue"],
    next: {
      "Sky Blue": 7,
      "Navy Blue": 8,
    },
  },
  // Add more questions and options as needed
];

const GreetingQuestions = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions.find(q => q.id === currentQuestionId);

  const handleAnswer = (answer) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
    setCurrentQuestionId(currentQuestion.next[answer]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-center mb-4">{currentQuestion.question}</h2>
        <div className="flex flex-col space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GreetingQuestions;
