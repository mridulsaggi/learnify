"use client";
import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { chatSession } from "../../util/generateQuestions";
import { data } from "../../util/data";

const Page = () => {
  const [datarec, setdatarec] = useState(null); // To store API response
  const [loading, setloading] = useState(false);
  const [file, setFile] = useState(null); // To store the uploaded PDF file

  // Function to handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submithandler = async () => {
    if (!file) {
      alert("Please upload a PDF file");
      return;
    }

    setloading(true);

    // Assuming the API takes a PDF file as input and returns JSON data
    const prompt = `create a list of analysis of my resume data=${data}. give the list of my known skills, the list of recommended skills that i should learn based on the job profile of Full stack web developer. Provide a personalized feedback and return the response in json format in this manner:
      known_skills:[{...}],
      required_skills:[{}],
      personlazed_recommendation:""`;

    try {
      const res = await chatSession.sendMessage(prompt);
      const temp = await res.response.text();
      const result = JSON.parse(temp); // Parse the JSON response

      setdatarec(result); // Set the data to state
      console.log(result);
    } catch (error) {
      console.error("Error fetching analysis:", error);
    }

    setloading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center m-8 gap-4">
        {/* File Input */}
        <Input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="text-white w-full md:w-1/2"
        />

        {/* Submit Button */}
        <Button onClick={submithandler} disabled={loading} className="w-full md:w-1/4">
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Uploading...
            </>
          ) : (
            "Upload"
          )}
        </Button>
      </div>

      {datarec && (
        <div className="text-white m-8 p-4 bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Detailed Analysis</h1>
          <div>
            <h2 className="text-xl font-semibold mb-2">Skills Known</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {datarec?.known_skills.map((e, idx) => (
                <div
                  key={idx}
                  className="rounded-lg h-10 flex items-center justify-center bg-blue-600 p-2"
                >
                  {e.skill}
                </div>
              ))}
            </div>
            <h2 className="text-xl font-semibold mt-4 mb-2">Recommended Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {datarec?.required_skills.map((e, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-green-600 p-4 text-center"
                >
                  <p className="font-semibold">{e.skill}</p>
                  <p className="text-sm">{e.experience}</p>
                </div>
              ))}
            </div>
            <h2 className="text-xl font-semibold mt-4 mb-2">Personalized Recommendation</h2>
            <p className="p-2 bg-gray-700 rounded-md">
              {datarec?.personlazed_recommendation}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
