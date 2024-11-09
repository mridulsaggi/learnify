"use client"
import React, { useEffect, useState } from 'react';

const LeftSidebar = () => {
  const [user, setUser] = useState(null); // State to store user data

  // Function to fetch user data from the API
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/1202');
      const data = await response.json();
      setUser(data); // Update state with fetched user data
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on component mount
  }, []);

  // Render loading state if user data is not yet fetched
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 text-white w-full md:w-1/3 lg:w-1/4 p-6 rounded-lg shadow-lg mr-2">
      <div className="flex flex-col items-center mb-6">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white"
        />
        <h2 className="text-xl font-bold mt-2">{user.name}</h2>
        <p className="text-sm">{user.email}</p>
        <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">
          Edit Profile
        </button>
      </div>
      
      <hr className="border-gray-600 my-4" />

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Languages</h3>
        <div className="flex flex-wrap space-x-2">
          {user.languages.map((language, index) => (
            <span key={index} className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm">
              {language}
            </span>
          ))}
        </div>
      </div>
      
      <hr className="border-gray-600 my-4" />

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap space-x-2">
          {user.skills.map((skill, index) => (
            <span key={index} className="bg-green-500 text-white rounded-full px-3 py-1 text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <hr className="border-gray-600 my-4" />

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Linked Accounts</h3>
        <div className="flex flex-col space-y-2 text-sm">
          {user.linkedAccounts.map((account, index) => (
            <a 
              key={index}
              href={account.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:underline"
            >
              {account.name}
            </a>
          ))}
        </div>
      </div>

      <hr className="border-gray-600 my-4" />

      <button className="mt-4 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded">
        Logout
      </button>
    </div>
  );
};

export default LeftSidebar;
