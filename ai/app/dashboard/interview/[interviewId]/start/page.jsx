"use client"
import React, { useEffect, useState } from 'react'
import { db } from "../../../../../util/db"
import { MockInterview, Userans } from '../../../../../util/db/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, Volume2 } from 'lucide-react'
import Recordanswer from "../_component/RecordAnswer"
import { Button } from '../../../../../components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Textarea } from '../../../../../components/ui/textarea'
import { chatSession } from '../../../../../util/generateQuestions'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import moment from 'moment'
import Link from 'next/link'

const Page = ({ params }) => {
    const [interviewData, setinterviewData] = useState("")
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(0)

    const { user } = useUser();

    useEffect(() => {
        getInterviewDetails()
    }, [])

    const getInterviewDetails = async () => {
        setLoading(true)
        try {
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
            setinterviewData(result[0])

            if (result.length > 0 && result[0]?.jobMockResponse) {
                const jsonresponse = JSON.parse(result[0].jobMockResponse)
                setQuestions(jsonresponse.questions)
            } else {
                console.error('No data found for this interview')
            }
        } catch (error) {
            console.error('Error fetching interview details:', error)
        } finally {
            setLoading(false)
        }
    }

    const {
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    const [answers, setAnswers] = useState("")
    const [textareaData, setTextareaData] = useState("")

    useEffect(() => {
        results.forEach(e => {
            setAnswers(prev => prev + e?.transcript)
        })
    }, [results])

    const texttospeech = (content) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(content);
            window.speechSynthesis.speak(speech);
        }
        else {
            alert('Browser doesnt support this')
        }
    }

    const submithandler = async (e) => {
        const feedbackPrompt = `question : ${questions[active]?.question} , Answer: ${textareaData} , Depends on the question and the users answer, Please give a rating for answer and feedback for improvement if needed for the answer for the question. Return the response in json format with rating field and feedback field. Provide the feedback in 7-8 lines maximum and rating out of 10. The feedback should be like how can the answer be improved, what all things it lacked, and what all topics should be studied for improving the skill demanded in the question.`

        const result = await chatSession.sendMessage(feedbackPrompt)
        const mockjsonrep = (await result.response.text());
        const jsonresp = JSON.parse(mockjsonrep)

        const resp = await db.insert(Userans).values({
            question: questions[active]?.question,
            userans: textareaData,
            correctans: questions[active]?.answer,
            feedback: jsonresp.feedback,
            rating: jsonresp.rating,
            useremail: user?.primaryEmailAddress?.emailAddress,
            mockId: interviewData?.mockId,
            createdAt: moment().format('DD-MM-yyyy')
        })

        console.log(resp)
        setTextareaData('');  // Clear the textarea after submitting
        setAnswers('');       // Clear the answers state after submission

        if (resp) {
            toast('User answer stored successfully!')
            setResults([])  // Clear recorded results after submitting
        }
    }

    const storeans = async () => {
        if (isRecording) {
            stopSpeechToText()
            toast('Recorded successfully!')
        } else {
            startSpeechToText()
        }
    }

    const endInterviewHandler = () => {
        toast('Interview Ended Successfully!')
    }

    return questions && (
        <div className="p-5">
            {loading ? (
                <p className="text-center text-lg">Loading...</p>
            ) : (
                <>
                    <div className="grid gap-8 p-2 grid-cols-1 md:grid-cols-2">
                        {/* Left Side: Questions Section */}
                        <div className="p-6 my-6 border rounded-lg shadow-lg bg-gray-900">
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                                {questions.length > 0 ? (
                                    questions.map((e, idx) => (
                                        <div
                                            key={idx}
                                            className={`cursor-pointer rounded-lg text-center p-3 transition-all duration-300 ${active === idx ? "bg-indigo-600 text-white" : "bg-gray-500 text-white"}`}
                                            onClick={() => {
                                                setActive(idx);
                                                setAnswers('');  // Clear previous answers when switching questions
                                            }}
                                        >
                                            Q{idx + 1}
                                        </div>
                                    ))
                                ) : (
                                    <p className="col-span-3 text-white">Fetching questions...</p>
                                )}
                            </div>
                            <div className="border rounded-lg p-6 bg-gray-800 text-white">
                                {questions[active]?.question || 'No question selected'}
                                <Volume2 onClick={() => texttospeech(questions[active]?.question)} />
                            </div>
                            <div className="bg-indigo-50 my-6 border-l-4 border-indigo-500 rounded-lg p-6 flex items-start">
                                <Lightbulb className="text-yellow-500 mr-4" />
                                <p className="text-gray-700">
                                    Note: Please read the question carefully and click on record to start your answer. Once done, click submit to send your response.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Answer Section */}
                        <div className="flex flex-col items-center justify-start space-y-6">
                            <Recordanswer />
                            <Button
                                onClick={storeans}
                                className={`w-[15rem] py-3 text-lg ${isRecording ? "bg-red-600 text-white" : "bg-green-600 text-white"} hover:shadow-md transition-all duration-300`}
                            >
                                {isRecording ? 'Stop Recording' : 'Start Recording'}
                            </Button>
                            <Button
                                className="w-[15rem] py-3 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                                onClick={() => { setTextareaData(answers); }}
                            >
                                Show User's Answer
                            </Button>
                        </div>

                        {/* Textarea and Send Button */}
                        <div className="col-span-2 flex items-center justify-center flex-col">
                            <Textarea
                                value={textareaData}
                                onChange={(e) => setTextareaData(e.target.value)}
                                className="w-full p-4 bg-gray-100 rounded-lg font-serif"
                                placeholder="Type your answer here..."
                            />
                        </div>

                        <div className='flex items-center gap-[2rem]'>
                            <Button className="mt-4 w-[10rem] py-3 bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300" onClick={submithandler} >
                                Send Answer
                            </Button>

                            {active !== 0 && (
                                <Button onClick={() => setActive(prev => prev - 1)}>
                                    Prev
                                </Button>
                            )}

                            {active !== questions.length - 1 && (
                                <Button onClick={() => setActive(prev => prev + 1)}>
                                    Next
                                </Button>
                            )}

                            {active === questions.length - 1 && (
                                <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                                    <Button onClick={endInterviewHandler}>
                                        End Interview
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Page
