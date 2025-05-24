import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [lessons, setLessons] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/lessons")
      .then((res) => setLessons(res.data));
    axios.get("http://localhost:5000/quizzes").then((res) => setQuiz(res.data));
  }, []);

  const checkAnswer = (answer) => {
    if (answer === quiz[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setProgress(progress + 10); // Update progress
    }
    setCurrentQuestion((prev) => (prev + 1) % quiz.length);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Language Learning App</h1>
      <h2>Lessons</h2>
      <ul>
        {lessons.map((lesson, i) => (
          <li key={i}>
            {lesson.title} - {lesson.content}
          </li>
        ))}
      </ul>

      <h2>Quiz</h2>
      {quiz.length > 0 && (
        <div>
          <p>{quiz[currentQuestion].question}</p>
          {quiz[currentQuestion].options.map((opt, i) => (
            <button key={i} onClick={() => checkAnswer(opt)}>
              {opt}
            </button>
          ))}
        </div>
      )}

      <h2>Progress: {progress}%</h2>
      <h3>Score: {score}</h3>
    </div>
  );
}

export default App;
