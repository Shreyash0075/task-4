const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/languageApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const lessonSchema = new mongoose.Schema({ title: String, content: String });
const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
});

const Lesson = mongoose.model("Lesson", lessonSchema);
const Quiz = mongoose.model("Quiz", quizSchema);

app.get("/lessons", async (req, res) => {
  const lessons = await Lesson.find();
  res.json(lessons);
});

app.get("/quizzes", async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

app.post("/lessons", async (req, res) => {
  const newLesson = new Lesson(req.body);
  await newLesson.save();
  res.json(newLesson);
});

app.post("/quizzes", async (req, res) => {
  const newQuiz = new Quiz(req.body);
  await newQuiz.save();
  res.json(newQuiz);
});

app.listen(5000, () => console.log("Server running on port 5000"));
