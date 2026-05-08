
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Course model
const Course = mongoose.model("Course", {
  title: String,
  description: String
});

// Get courses
app.get("/api/courses", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Add course
app.post("/api/courses", async (req, res) => {
  const course = new Course({
    title: req.body.title,
    description: req.body.description
  });

  await course.save();
  res.json(course);
});

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(3000, () => console.log("Server started"));
