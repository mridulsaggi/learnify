"use client"
import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// Sample data for courses watched by the student
const initialData = [
    { courseName: 'React Basics', instructor: 'Instructor A', watchTime: 12 },
    { courseName: 'Advanced JavaScript', instructor: 'Instructor B', watchTime: 8 },
    { courseName: 'Python for Data Science', instructor: 'Instructor C', watchTime: 15 },
    { courseName: 'Intro to Machine Learning', instructor: 'Instructor D', watchTime: 10 },
];

// Generate random completion percentage between 20% to 100%
const addRandomCompletion = (data) => {
    return data.map((item) => ({
        ...item,
        completed: Math.floor((Math.random() * 81 + 20) * 0.5), // Scale down by 50%
    }));
};

// Colors for Pie chart segments
const COLORS = ['#4A90E2', '#50E3C2', '#F5A623', '#D0021B'];

const StudentCourseAnalytics = () => {
    const [data] = useState(addRandomCompletion(initialData));
    const totalWatchTime = data.reduce((total, item) => total + item.watchTime, 0);

    // Format data with percentages
    const chartData = data.map((item) => ({
        ...item,
        percentage: ((item.watchTime / totalWatchTime) * 100).toFixed(1),
    }));

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-20 px-15 flex flex-col items-center font-sans">
            {/* Student Information Section */}
            {/* <StudentInfo 
                name={studentInfo.name} 
                enrollment={studentInfo.enrollment} 
                email={studentInfo.email} 
            /> */}

            <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 transition duration-500 hover:shadow-2xl">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6 tracking-wide">
                    Student Course Analytics
                </h1>

                {/* Pie Chart Section */}
                <div className="mb-8 flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
                        Time Spent per Course
                    </h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="watchTime"
                                nameKey="courseName"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                label={({ percentage, watchTime, instructor }) => `${percentage}% - \n ${watchTime} hrs \n by ${instructor}`}
                                labelLine={false}
                                fill="#8884d8"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value, entry) => [`${value} hrs`, entry.payload.courseName]} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Compact Bar Chart for Student Progress */}
                <div className="mb-8 bg-indigo-50 rounded-lg p-6 shadow-md w-3/4 mx-auto">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
                        Course Completion Progress
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 100]} hide />
                            <YAxis dataKey="courseName" type="category" width={120} />
                            <Tooltip formatter={(value) => `${value}% completed`} />
                            <Bar dataKey="completed" fill="#82ca9d" barSize={15} radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StudentCourseAnalytics;
