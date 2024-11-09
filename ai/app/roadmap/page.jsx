"use client";
import React, { useState, useEffect } from 'react';
import { chatSession } from '../../util/generateQuestions';
import Link from 'next/link';

const Page = () => {
  const [roadmap, setRoadmap] = useState([]);
  const [customTitle, setCustomTitle] = useState('Full Stack MERN'); // Default title
  const [loading, setLoading] = useState(false); // Loading state

  const fetchRoadmap = async () => {
    const prompt = `Generate a roadmap to learn the given ${customTitle} based on the information given below. The response should be structured as an array of objects, where each object has two keys: 'title' and 'desc'. The 'title' key should represent the main topic, and the 'desc' key should contain a single string of subtopics under that main topic. Do not use any punctuation or markdown. The roadmap should be in the correct order and generate a minimum of 12 objects.`;

    setLoading(true); // Set loading state to true before fetching
    try {
      const res = await chatSession.sendMessage(prompt);
      const temp = await res.response.text();
      const result = JSON.parse(temp);
      setRoadmap(result); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle submit button click
  const handleSubmit = () => {
    if (customTitle) {
      fetchRoadmap(); // Call the fetch function
    }
  };


  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Enter the topic for which you want a RoadMap</h1>
      <div className='flex gap-2 items-center justify-center w-full'>

        {/* Text box for user to input custom roadmap title */}
        <div className="mb-4 w-[80%]">
          <input
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="Enter your roadmap title..."
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        {/* Submit button to fetch the roadmap */}
        <div className="mb-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
      {loading ? <div className="text-center m-[2rem] text-3xl text-white">Loading...</div> :
        <div className="flex flex-wrap justify-center relative">
          {roadmap.map((item, index) => (
              <a href={`/roadmap/${encodeURIComponent(item.title)}`}  key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="m-2 border rounded-lg p-4 bg-gray-50 shadow-md w-full sm:w-1/3 mb-4 relative"
              >
                <div className="flex items-center mb-2">
                  <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h2 className="text-2xl font-semibold text-blue-600 ml-4">{item.title}</h2>
                </div>
                <p className="text-gray-700">{item.desc}</p>
              </a>
          ))}
        </div>
      }
    </div>
  );
};

export default Page;
