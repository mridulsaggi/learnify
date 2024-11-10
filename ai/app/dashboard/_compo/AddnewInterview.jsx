"use client"
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog"
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'

import { chatSession, generateQuestion} from "../../../util/generateQuestions.js"
import { Loader2 } from 'lucide-react'

import {db} from "../../../util/db"
import { MockInterview } from '../../../util/db/schema'

import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'


const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const initialFormData = {
        jobTitle: '',
        jobDescription: '',
        yearsOfExp: ''
    }

    const [QuesAns,setQuesAns]=useState([])
    const [loading,setloading]=useState(false)
    const [formdata,setformdata]=useState(initialFormData)

    const {user}=useUser();
    const route=useRouter();

    const handlechange=(e)=>{
        const {name,value}=e.target;
        setformdata((prevdata)=>(
            {...prevdata,[name]:value}
        ))
    }

    const submithandler=async(e)=>{
        e.preventDefault();
        setloading(true);
        // console.log(formdata)
        // generate the prompt
        const prompt = `Please create 5 interview questions, with answers, in JSON format for the role of ${formdata.jobTitle}. Tailor each question to align with the job description and tech stack, specifically targeting ${formdata.jobDescription}. The candidate has ${formdata.yearsOfExp} years of experience, so the questions should reflect this level by being appropriately challenging, covering both fundamental and advanced concepts.

        Avoid questions that ask for direct coding solutions; instead, focus on conceptual knowledge, problem-solving approaches, technical strategies, and best practices relevant to the role. Questions should help assess the candidate's depth of understanding, adaptability, and their practical experience with the specified tech stack. 

        Return the response in this JSON format:
        {
            "questions": [
                {
                    "question": "Question 1 text",
                    "answer": "Detailed answer for Question 1"
                },
                ...
            ]
        }
            Make sure that the response should not contain more than 8500 charecters with the response being in correct json format
            `

        const res=await chatSession.sendMessage(prompt)
        const temp=res.response.text()
        const result=JSON.parse(temp);

        setQuesAns(result)

        if(result){
            const response=await db.insert(MockInterview).values({
                jobMockResponse:result,
                jobPosition:formdata.jobTitle,
                jobDescription:formdata.jobDescription,
                JobExperience:formdata.yearsOfExp,
                mockId: uuidv4(), //generating unique mock id
                createdBy:user?.primaryEmailAddress?.emailAddress,
                createdAt:moment().format('DD-MM-yyyy')
            }).returning({mockId:MockInterview.mockId})
            
            console.log("MockId",response)
            console.log(result)
            if(response){
                setOpenDialog(false);
                route.push("/dashboard/interview/"+response[0]?.mockId)
            }
        }
        else{
            console.log("Questions could not be generated. Try again in few minutes")
        }     

        setformdata(initialFormData) //set back to ""
        setloading(false)
    }
    
    const handleOpen = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    // Effect to clear any stored state in localStorage
    useEffect(() => {
        localStorage.removeItem('dialog-open-state')
    }, [])

    return (
        <div>
            <div onClick={handleOpen} className='bg-secondary rounded-lg p-10 hover:scale-105 hover:shadow-md hover:cursor-pointer border text-center transition-all'>
                <h2 className='font-semibold'>+ Add new interview</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={submithandler}>
                                <h1 className='text-[grey] font-semibold'>Share more details about the job you want to interview about, your experience, etc</h1>
                                <div className='my-2'>
                                    <label>Job Title</label>
                                    <Input name="jobTitle" placeholder="Eg. Full stack Developer" required  onChange={handlechange} value={formdata.jobTitle}/>
                                </div>
                                <div className='my-2'>
                                    <label>Job description / Tech Stack</label>
                                    <Textarea name="jobDescription" placeholder="Eg. ReactJs , NodeJs, Redux ,MongoDB , etc "  onChange={handlechange} required value={formdata.jobDescription}/>
                                </div>
                                <div className='my-2'>
                                    <label>Years of experience</label>
                                    <Input name="yearsOfExp" placeholder="Eg. 0 " type="number" max="20"  onChange={handlechange} required value={formdata.yearsOfExp}/>
                                </div>
                            <div className='flex my-2 gap-3 justify-end'>
                                <Button type="button" variant="ghost" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading?
                                    <>
                                        <Loader2 className='animate-spin'/>"Generating from AI"
                                    </>
                                    :"Start Interview"
                                    }
                                </Button>
                            </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            {/* {
                QuesAns.map((e,idx)=>(
                    <div className='text-2xl bg-[pink] border rounded-full'>{e.question}</div>
                ))
            } */}
        </div>
    )
}

export default AddNewInterview