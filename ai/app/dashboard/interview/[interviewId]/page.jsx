"use client"
import React, { useEffect, useState } from 'react'
import { db } from "../../../../util/db"
import { MockInterview } from '../../../../util/db/schema'
import { eq } from 'drizzle-orm'
import Webcam from "react-webcam"
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { Button } from '../../../../components/ui/button'

import Link from 'next/link';
const page = ({ params }) => {
    const [WebcamEnabled, setWebcamEnabled] = useState(false)
    const [interviewData, setinterviewData] = useState("")
    const [loading, setloading] = useState(false)
    useEffect(() => {
        console.log(params.interviewId)
        getInterviewDetails()
    }, [])

    const getInterviewDetails = async () => {
        setloading(true)
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        // console.log("Questions from db", result[0])
        setinterviewData(result[0])
        setloading(false)
    }

    return (
        <div className='p-5 text-white'>
            <h1 className='text-3xl text-center my-[2rem]'>Lets Get Started!</h1>
            <div className='relative grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className="flex flex-col items-center rounded-lg border p-5">
                    <div className='p-2 rounded-lg border w-full'>
                        <div className='text-xl  my-2 flex gap-2'><strong>Job Title:</strong>{interviewData.jobPosition}</div>
                        <div className='text-xl my-2 flex gap-2'><strong>Tech Stack:</strong>{interviewData.jobDescription}</div>
                        <div className='text-xl my-2 flex gap-2'><strong>Years of Experience:</strong>{interviewData.JobExperience}</div>
                    </div>
                    <div className='mt-3 rounded-lg border flex flex-col w-full p-2 bg-[#ffffc4]'>
                        <div>
                            <div className='p-1 bg-black rounded-full h-[2rem] w-[2rem]'><Lightbulb /></div>
                            <p className='font-semibold text-[#e5e535]'>Information</p>
                        </div>
                        <div className='text-black'>Please enable the camera and microphone for AI generated intterview. The interview will consist of 5 questions and will check your theoretical knowledge on the core topics. After the test, you will recieve a detailed analysis of your Interview. All the best!!</div>
                    </div>
                </div>
                <div className='rounded-lg border p-5'>
                    {
                        WebcamEnabled ?
                            <Webcam mirrored={true} onUserMedia={() => setWebcamEnabled(true)} onUserMediaError={() => setWebcamEnabled(false)} />
                            :
                            <div className='flex flex-col items-center justify-center'>
                                <WebcamIcon className='h-[12rem] m-5 w-[12rem] rounded-lg border' />
                                <Button onClick={() => setWebcamEnabled(true)}>Enable Webcam and Audio</Button>
                            </div>
                    }
                </div>
            </div>
            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                <Button className="m-4 absolute right-[5rem] bottom-[4rem]">Start Interview</Button>
            </Link>
        </div >
    )
}

export default page
