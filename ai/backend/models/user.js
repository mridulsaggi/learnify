// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  profileImage: { type: String },
  languages: { type: [String] },
  skills: { type: [String] },
  linkedAccounts: [
    { name: String, url: String }
  ],
  roadmaps: [
    { title: String, level: String, duration: String }
  ],
  certificates: [
    { title: String, date: String, score: String }
  ],
  skillsData: [
    { skill: String, value: Number }
  ],
  trendingTechnologies: [
    { title: String, users: Number }
  ],
  interviews: [
    {
      role: String,
      score: Number,
      questions: [
        { question: String, correctAnswer: String, userAnswer: String, isCorrect: Boolean }
      ]
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;