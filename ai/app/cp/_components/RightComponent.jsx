"use client";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data
const viewsData = [
  { month: "Jan", views: 400 },
  { month: "Feb", views: 300 },
  { month: "Mar", views: 450 },
  { month: "Apr", views: 600 },
  { month: "May", views: 700 },
];

const topicsMade = [
  {
    title: "React Basics",
    lastUpdated: "2024-09-15",
    views: 1500,
    peakTime: "2 hours out of 5 hours",
  },
  {
    title: "Advanced Node.js",
    lastUpdated: "2024-09-10",
    views: 1200,
    peakTime: "1 hour out of 5 hours",
  },
];

const demandedTopics = [
  "Machine Learning Fundamentals",
  "Understanding Docker",
  "Frontend Frameworks Comparison",
];

const ratings = [
  { user: "User1", rating: 5, suggestion: "More tutorials on hooks" },
  { user: "User2", rating: 4, suggestion: "Include project examples" },
];

// CreatorDashboard Component
const CreatorDashboard = () => {
  const totalEarnings = 2000; // Mock value for earnings

  return (
    <div className="flex flex-col space-y-6 mx-5">
      {/* Money Earned This Month */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-white">
        <h2 className="text-xl font-bold mb-4">Money Earned This Month</h2>
        <div className="flex justify-center">
          <CircularProgressbar
            value={(totalEarnings / 5000) * 100}
            text={`$${totalEarnings}`}
            styles={{
              path: { stroke: "#ffffff" }, // White stroke for visibility
              text: { fill: "#ffffff", fontSize: "16px" },
              trail: { stroke: "#A2DFF7" }, // Light blue
            }}
            strokeWidth={10} // Adjusting the stroke width
            className="w-28 h-28" // Adjusting size of the CircularProgressbar
          />
        </div>
      </div>

      {/* Views Over Months */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Views Over Months
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={viewsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#4B5563" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Videos Topics Made */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Videos Topics Made</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicsMade.map((topic) => (
            <div
              key={topic.title}
              className="border border-gray-300 rounded-lg p-4 hover:-translate-y-1 transition-all duration-300 hover:shadow-md bg-gray-50"
            >
              <h3 className="font-semibold text-gray-800">{topic.title}</h3>
              <p className="text-sm text-gray-500">Last Updated: {topic.lastUpdated}</p>
              <p className="text-sm text-gray-500">Views: {topic.views}</p>
              <p className="text-sm text-gray-500">Peak View Time: {topic.peakTime}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Topics Students Are Demanding Videos On */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Topics Students Are Demanding</h2>
        <ul className="list-disc pl-5 space-y-2">
          {demandedTopics.map((topic, index) => (
            <li key={index} className="text-gray-700">{topic}</li>
          ))}
        </ul>
      </div>

      {/* Overall Rating and Top Suggestions */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Overall Rating and Top Suggestions</h2>
        <div className="space-y-4">
          {ratings.map((rating, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 hover:-translate-y-1 transition-all duration-300 hover:shadow-md bg-gray-50"
            >
              <p className="font-semibold text-gray-800">
                Rating: {rating.rating} <span className="text-gray-500">by {rating.user}</span>
              </p>
              <p className="text-gray-600">Suggestion: {rating.suggestion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
