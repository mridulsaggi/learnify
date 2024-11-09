"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Award, Target } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RightComponent = () => {
  const [data, setData] = useState(null); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/1202');
        setData(response.data); // Set the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Display loading text while fetching data
  }

  // RoadmapProgress Component
  const RoadmapProgress = () => (
    <div className="mb-4 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Continue Learning</h2>
      <div className="relative bg-gradient-to-r from-green-400 to-green-600 rounded-lg p-4 border border-green-500">
        <div className="flex items-center">
          <div className="flex-grow mr-4"> {/* Add this div for spacing */}
            <h3 className="font-semibold text-white">Full Stack Development</h3>
            <p className="text-sm text-green-200">Progress: 60%</p>
            <div className="w-full bg-gray-300 rounded-full h-2.5 mt-1">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full transition-all duration-1000"
                style={{ width: '60%' }}
              ></div>
            </div>
          </div>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:-translate-y-0.5 transition-all duration-300 hover:shadow-md">
            Continue
          </button>
        </div>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.roadmaps.map((roadmap) => (
          <div
            key={roadmap.title}
            className="bg-gradient-to-br from-blue-200 to-blue-300 border border-gray-300 rounded-lg p-4 hover:-translate-y-1 transition-all duration-300 hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-800">{roadmap.title}</h3>
            <p className="text-sm text-gray-600">Level: {roadmap.level}</p>
            <p className="text-sm text-gray-600">Duration: {roadmap.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // RecommendedRoadmaps Component
  const RecommendedRoadmaps = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Recommended Roadmaps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.roadmaps.map((roadmap) => (
          <div
            key={roadmap.title}
            className="border border-gray-300 rounded-lg p-4 hover:-translate-y-1 transition-all duration-300 hover:shadow-md bg-gradient-to-br from-yellow-200 to-yellow-300"
          >
            <Target className="w-8 h-8 text-yellow-400 mb-2" />
            <h3 className="font-semibold text-gray-800">{roadmap.title}</h3>
            <p className="text-sm text-yellow-500">{roadmap.level}</p>
            <p className="text-sm text-yellow-500">{roadmap.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // CompletedCertificates Component
  const CompletedCertificates = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Completed Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.certificates.map((cert) => (
          <div
            key={cert.title}
            className="border border-gray-300 rounded-lg p-4 hover:-translate-y-1 transition-all duration-300 hover:shadow-md bg-gradient-to-br from-indigo-200 to-indigo-300"
          >
            <Award className="w-8 h-8 text-indigo-400 mb-2" />
            <h3 className="font-semibold text-gray-800">{cert.title}</h3>
            <p className="text-sm text-indigo-500">Completed: {cert.date}</p>
            <p className="text-sm text-indigo-500">Score: {cert.score}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // SkillsHexagon Component
  const SkillsHexagon = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Skills Analysis</h2>

      {/* Circular Progress Bars */}
      <div className="flex justify-around mb-6">
        {data.skillsData.map((skill) => (
          <div key={skill.skill} className="flex flex-col items-center">
            <CircularProgressbar
              value={skill.value}
              text={`${skill.value}%`}
              styles={{
                path: { stroke: `rgba(63, 81, 181, ${skill.value / 100})` },
                text: { fill: '#f88', fontSize: '12px' },
                root: { width: '80px', height: '80px' },
              }}
            />
            <span className="mt-2 text-sm">{skill.skill}</span>
          </div>
        ))}
      </div>

      {/* Trending Technologies Bar Chart */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Trending Technologies</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.trendingTechnologies}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="title" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Bar dataKey="users" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Interview Attempts Line Graph */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Interview Attempts Scores</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.interviews}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="role" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  // InterviewAttempts Component
  const InterviewAttempts = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Interview Attempts</h2>
      {data.interviews.map((interview) => (
        <div key={interview.role} className="border border-gray-300 rounded-lg p-4 mb-4 hover:-translate-y-1 transition-all duration-300">
          <h3 className="font-semibold text-gray-800">{interview.role}</h3>
          <p className="text-sm text-gray-500">Score: {interview.score}</p>
          <ul className="mt-2">
            {interview.questions.map((question, index) => (
              <li key={index} className={`text-sm ${question.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {question.question} - <span className="font-semibold">{question.userAnswer}</span> (Correct: {question.correctAnswer})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-grow flex-col space-y-6">
      <RoadmapProgress />
      <RecommendedRoadmaps />
      <CompletedCertificates />
      <SkillsHexagon />
      <InterviewAttempts />
    </div>
  );
};

export default RightComponent;
