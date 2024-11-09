"use client"
import React, { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'

import { chatSession } from "../../util/generateQuestions"
import { Loader2 } from 'lucide-react'

import { Skeleton } from "../../components/ui/skeleton"
import { useUser } from '@clerk/nextjs'


const Page = () => {
  const [topic, setTopic] = useState("");
  const [loading, setloading] = useState(false);
  const [content, setcontent] = useState({});
  
  const prompt2 = `
    You are an expert on ${topic}. Your job is to teach the given sub-topic: ${topic} in detail in JSON format with the following structure:
    {
      "title": "string",  // Title of the guide
      "introduction": "string",  // Brief introduction to the topic
      "sections": [  // List of sections in the guide
        {
          "heading": "string",  // Section heading
          "description": "string",  // description of the section
          "code": "string"  // Optional code example, leave empty if none
        }
      ],
      "conclusion": "string"  // Closing remarks or summary
    }
    If the response token is near 8000, limit the response to 1 section lesser or reduce some description but return such that the response returned is in correct JSON format
  `;

  const submithandler = async (e) => {
    setloading(true)
    const res = await chatSession.sendMessage(prompt2)
    const temp = res.response.text()
    const result = JSON.parse(temp)
    console.log(result)
    setcontent(result)
    setloading(false)
  }
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if (!isSignedIn) {
    return <p>Please sign in to continue.</p>;
  }
  const username=user?.username
  return (
    <div className='p-5 md:p-10 flex flex-col items-center justify-center bg-gray-900 min-h-screen'>
      <div className='flex flex-col items-center justify-center p-10'>
        <h1 className='m-5 text-5xl font-serif bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text flex flex-col'>
          <p>Hi there {username}, What</p>
          <p>would you like to study today?</p>
        </h1>
        <span className='text-gray-300 flex flex-col items-start'>
          <p>Use one of the below topics or choose the one that suits your need.</p>
          <p>You will get a detailed analysis of each topic along with the required codes, examples, etc.</p>
        </span>
      </div>
      <div className="flex w-full max-w-xl gap-5 my-[1rem] text-white">
        <Textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter the topic you want to study today"
          className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
        />
        <Button onClick={submithandler} disabled={loading} className="bg-blue-600 hover:bg-blue-500 transition-colors">
          {loading ? (
            <>
              <Loader2 className='animate-spin' /> Generating from AI
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      {loading ? (
        <div className='flex flex-col items-center justify-center p-2'>
          <p className='text-2xl font-semibold my-[1rem] text-white'>Fetching the content... please wait</p>
          <Skeleton className="w-[30rem] m-5 h-[10rem] rounded-lg" />
          <Skeleton className="w-[30rem] m-5 h-[10rem] rounded-lg" />
        </div>
      ) : content.title ? (
        <div className="bg-gray-800 w-full max-w-4xl min-h-screen p-8 rounded-lg shadow-lg">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
              {content.title}
            </h1>
            <p className="text-gray-300 mb-6">{content.introduction}</p>
            {content.sections?.map((section, index) => (
              <section className="mb-8" key={index}>
                <h2 className="text-2xl font-semibold mb-4 text-indigo-500">
                  {index + 1}. {section.heading}
                </h2>
                <p className="text-gray-300 mb-4">{section.description}</p>
                {section.code && (
                  <pre className="bg-gray-700 text-white p-4 rounded-lg overflow-auto">
                    <code>{section.code}</code>
                  </pre>
                )}
              </section>
            ))}
            <p className="text-gray-300">{content.conclusion}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Page;
