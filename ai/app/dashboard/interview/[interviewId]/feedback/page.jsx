"use client"
import React, { useEffect, useState } from 'react'
import { db } from "../../../../../util/db"
import { Userans } from '../../../../../util/db/schema'
import { eq } from 'drizzle-orm'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../../components/ui/collapsible"
import { Button } from '../../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { chatSession } from '../../../../../util/generateQuestions'

const FeedbackPage = ({ params }) => {
  const [feedbacklist, setFeedbacklist] = useState([])
  const [personfeedback, setpersonfeedback] = useState("")

  useEffect(() => {
    getFeedback()
  }, [])

  const getFeedback = async () => {
    const result = await db.select().from(Userans).where(eq(Userans.mockId, params.interviewId)).orderBy(Userans.id);
    console.log(result)
    setFeedbacklist(result)
    if (result.length > 0) {
      personalized_feedback(result) // Pass feedback data to personalized_feedback
    }
  }

  const personalized_feedback = async (feedbackList) => {
    const generateInterviewAnalysisPrompt = `
        Based on the following feedback for each question in an AI interview, provide a detailed analysis of the candidate’s overall performance.
        
        Feedback:
        ${feedbackList.map((fb, index) => `
          Question ${index + 1}: ${fb.question}
          User's Answer: ${fb.userans}
          Correct Answer: ${fb.correctanswer}
          Feedback: ${fb.feedback}
          Rating: ${fb.rating}/10
        `).join("\n")}
        
        Please include in the analysis:
        - Overall strengths and weaknesses of the candidate.
        - Common themes or skills that were lacking across multiple answers.
        - Suggestions on which skills or topics should be prioritized for improvement.
        - Any general advice for enhancing interview performance.
        Return the analysis in a paragraph format and reply with directly addressing the user such as you have this knowledge and lack this , etc.
        
      `;

    const res = await chatSession.sendMessage(generateInterviewAnalysisPrompt)
    const temp = await res.response.text()
    const result = JSON.parse(temp)

    setpersonfeedback(result.overall_analysis)
  }

  const generateRoadmapPrompt = (analysis, jobRole) => `
    The candidate is applying for a job role as "${jobRole}". Based on the following interview analysis, create a personalized roadmap to help the candidate improve in the areas that need development:
    Interview Analysis:
    ${analysis}
    Create a structured roadmap with:
    - Core skills and knowledge areas to focus on for the job role.
    - A recommended timeline (weekly or monthly) for mastering each area.
    - Suggested resources or study materials for each skill or topic.
    - Practical tasks or projects that will help solidify each skill.
    - Milestones or checkpoints to track progress.
    
    Make this roadmap actionable and targeted to the candidate’s specific needs, providing clear steps to reach proficiency in each skill.
    the response should not be more than 8500 charecters and make sure that the response returned is in correct json format.
  `;

  

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Feedback Summary</h1>

      <div className="space-y-6">
        {feedbacklist.length > 0 ? (
          feedbacklist.map((feedback, idx) => (
            <Card key={idx} className="shadow-lg border border-gray-200 rounded-lg overflow-hidden">
              <CardHeader className="bg-blue-50 p-4 flex items-center">
                <CardTitle className="flex items-center text-xl font-semibold text-blue-700">
                  <span className="mr-3 bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center">
                    {idx + 1}
                  </span>
                  {`Question ${idx + 1}`}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between bg-blue-50 hover:bg-blue-100 text-gray-700 p-2 rounded-lg shadow-sm">
                      <span className="text-left flex-grow overflow-x-hidden">{feedback.question}</span>
                      <span className="ml-2 text-indigo-500">▼</span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-4 p-4 border-t border-gray-200 space-y-2 text-gray-800">
                      <p><strong className="text-gray-700">User's Answer:</strong> {feedback.userans || "No answer provided"}</p>
                      <p><strong className="text-gray-700">Correct Answer:</strong> {feedback.correctans}</p>
                      <div className="flex items-center">
                        <span className="text-yellow-500 font-bold mr-2">★</span>
                        <p><strong className="text-gray-700">Feedback:</strong> {feedback.feedback}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500 font-bold mr-2">★</span>
                        <p><strong className="text-gray-700">Rating:</strong> {feedback.rating}/10</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2">📅</span>
                        <p><strong className="text-gray-700">Date:</strong> {formatDate(feedback.createdAt)}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600">No feedback available for this interview.</p>
        )}
      </div>

      {/* Detailed Feedback Card */}
      {personfeedback && (
        <div className="mt-10">
          <Card className="shadow-xl border border-gray-300 rounded-lg overflow-hidden">
            <CardHeader className="bg-green-100 p-6">
              <CardTitle className="text-2xl font-bold text-green-800">Detailed Interview Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <p className="text-gray-800 leading-relaxed">
                {personfeedback}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default FeedbackPage
