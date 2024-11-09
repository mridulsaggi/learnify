"use client"
import React, { useEffect, useState } from 'react'
import { db } from "../../../../../util/db"
import { Userans } from '../../../../../util/db/schema'
import { eq } from 'drizzle-orm'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../../components/ui/collapsible"
import { Button } from '../../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'

const FeedbackPage = ({ params }) => {
  const [feedbacklist, setFeedbacklist] = useState([])

  useEffect(() => {
    getFeedback()
  }, [])

  const getFeedback = async () => {
    const result = await db.select().from(Userans).where(eq(Userans.mockId, params.interviewId)).orderBy(Userans.id);
    console.log(result)
    setFeedbacklist(result)
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Feedback Summary</h1>
      <div className="space-y-4">
        {feedbacklist.length > 0 ? (
          feedbacklist.map((feedback, idx) => (
            <Card key={idx} className="shadow-lg">
              <CardHeader>
                <CardTitle>{`Question ${idx + 1}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {feedback.question}
                      <span className="ml-2 text-indigo-500">Click to view details</span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4">
                      <p><strong>User's Answer:</strong> {feedback.userans || "No answer provided"}</p>
                      <p><strong>Correct Answer:</strong> {feedback.correctans}</p>
                      <p><strong>Feedback:</strong> {feedback.feedback}</p>
                      <p><strong>Rating:</strong> {feedback.rating}/10</p>
                      <p><strong>Date:</strong> {feedback.createdAt}</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No feedback available for this interview.</p>
        )}
      </div>
    </div>
  )
}

export default FeedbackPage
