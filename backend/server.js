
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// ✅ Course Model
const Course = mongoose.model("Course", {
  title: String,
  description: String
});

// ✅ Home route (IMPORTANT for testing)
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ✅ Get all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// ✅ Add a new course
app.post("/api/courses", async (req, res) => {
  try {
    const { title, description } = req.body;

    const newCourse = new Course({
      title,
      description
    });

    await newCourse.save();
    res.json(newCourse);
  } catch (err) {
    res.status(500).json({ error: "Failed to add course" });
  }
});

// ✅ Add test data (VERY USEFUL)
app.get("/add-test-data", async (req, res) => {
  try {
    const course1 = new Course({
      title: "Excel Basics",
      description: "Learn spreadsheets"
    });

    const course2 = new Course({
      title: "Microsoft Teams",
      description: "Communication tools"
    });

    await course1.save();
    await course2.save();

    res.send("✅ Test courses added");
  } catch (err) {
    res.status(500).send("Error adding test data");
  }
});

// ✅ FIX FOR RENDER (VERY IMPORTANT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("✅ Server running on port " + PORT);
});

