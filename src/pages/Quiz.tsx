// src/pages/Quiz.tsx
import React, { useState } from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  {
    question: "What is the result of 'let x = 5; { let x = 10; console.log(x); }'?",
    options: ["undefined", "5", "10", "SyntaxError", "null"],
    answer: "10",
  },
  {
    question: "Which Python code returns squares from 1 to 5?",
    options: [
      "[x^2 for x in range(1,6)]",
      "[x*x for x in range(1,6)]",
      "range(1,5).map(lambda x: x*x)",
      "[x** for x in range(1,6)]",
      "map(lambda x: x*x, range(1,6))",
    ],
    answer: "[x*x for x in range(1,6)]",
  },
  {
    question: "What is method overloading in Java?",
    options: [
      "Defining the same method in different classes",
      "Calling multiple methods at once",
      "Same method name with different parameters",
      "Same return type with different names",
      "None of the above",
    ],
    answer: "Same method name with different parameters",
  },
  {
    question: "Which is a semantic tag in HTML?",
    options: ["<div>", "<span>", "<header>", "<b>", "<font>"],
    answer: "<header>",
  },
  {
    question: "What does 'justify-content: center;' do in CSS?",
    options: [
      "Centers content vertically",
      "Moves content to right",
      "Horizontally centers child items",
      "Makes content bold",
      "Hides content",
    ],
    answer: "Horizontally centers child items",
  },
  {
    question: "Correct syntax for inheritance in C++?",
    options: [
      "class Child inherits Parent {}",
      "class Child extends Parent {}",
      "class Child : public Parent {}",
      "inherit Child from Parent",
      "Child -> Parent",
    ],
    answer: "class Child : public Parent {}",
  },
  {
    question: "What does typeof null return in JavaScript?",
    options: ["null", "undefined", "object", "false", "number"],
    answer: "object",
  },
  {
    question: "Correct way to define a function in Python?",
    options: [
      "func myFunc() {}",
      "function myFunc:",
      "def myFunc():",
      "myFunc => ()",
      "function: myFunc()",
    ],
    answer: "def myFunc():",
  },
  {
    question: "How to declare pointer to int in C++?",
    options: [
      "int ptr = *x;",
      "int* ptr;",
      "int ptr*;",
      "pointer<int> ptr;",
      "int &ptr;",
    ],
    answer: "int* ptr;",
  },
  {
    question: "Which CSS tool makes websites responsive?",
    options: [
      "<responsive>",
      "@media queries",
      "<script>",
      "<layout>",
      "<css-grid>",
    ],
    answer: "@media queries",
  },
];

const Quiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  const handleOptionChange = (questionIndex: number, answer: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answer });
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) correct++;
    });
    setScore(correct);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🧠 Programming Language Quiz</h2>
      {questions.map((q, idx) => (
        <div key={idx} style={{ marginBottom: "20px" }}>
          <p>
            <strong>{idx + 1}. {q.question}</strong>
          </p>
          {q.options.map((opt) => (
            <label key={opt} style={{ display: "block", marginLeft: "20px" }}>
              <input
                type="radio"
                name={`q${idx}`}
                value={opt}
                onChange={() => handleOptionChange(idx, opt)}
                checked={selectedAnswers[idx] === opt}
              /> {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} style={{ padding: "10px 20px", fontSize: "16px" }}>Submit</button>
      {score !== null && (
        <p style={{ marginTop: "20px" }}><strong>Your Score:</strong> {score} / {questions.length}</p>
      )}
    </div>
  );
};

export default Quiz;
