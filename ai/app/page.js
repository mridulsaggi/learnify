"use client";
import Typewriter from "typewriter-effect";
import React, { useState } from "react";
import {
  BotMessageSquare,
  Fingerprint,
  ShieldHalf,
  BatteryCharging,
  PlugZap,
  GlobeLock,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { chatSession } from "../util/generateQuestions";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const submitHandler = async () => {
    setLoading(true);
    const prompt = `Please generate a nice motivational message to boost my energy for the day and work harder for my goals and achieve them. The message should reflect motivation and encourage the reader to be more happier and work hard. The reader is a student learning to code and practice new skills. The response must be in json format in this manner:
    {
      message:""
    }`;
    const res = await chatSession.sendMessage(prompt);
    const temp = res.response.text();
    const result = JSON.parse(temp);
    console.log(result);
    setContent(result?.message);
    setLoading(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Dashboard", href: "#" },
    { label: "AI Interview", href: "#" },
    { label: "Study", href: "#" },
  ];

  const features = [
    {
      icon: <BotMessageSquare />,
      text: "AI-Powered Skill DNA",
      description:
        "Dynamic, blockchain-verified Skill DNA that evolves with each course completed, project worked on, and skills developed. A robust professional identity card replacing traditional resumes.",
    },
    {
      icon: <Fingerprint />,
      text: "Real-Time Competitor Analysis",
      description:
        "Compares users' skills with job descriptions, competitor profiles, and industry trends in real-time, guiding them towards the most in-demand skills.",
    },
    {
      icon: <ShieldHalf />,
      text: "Blockchain-Verified SkillTokens",
      description:
        "Skills are tokenized using blockchain, creating transparent, tamper-proof credentials and turning skills into tradable, certified assets.",
    },
    {
      icon: <BatteryCharging />,
      text: "One Subscription Model",
      description:
        "Access all courses with one subscription fee. Payments are fairly distributed among creators based on actual watch time, incentivizing quality content.",
    },
    {
      icon: <PlugZap />,
      text: "Decentralized Learning Exchange (DLX)",
      description:
        "A peer-to-peer marketplace for learners and educators. Smart contracts ensure fair compensation, fostering a gig economy for knowledge transfer.",
    },
    {
      icon: <GlobeLock />,
      text: "AI Career Navigator & Interview Simulation",
      description:
        "Personalized career paths based on evolving Skill DNA and market trends. Includes AI-powered interview simulations for real-world practice.",
    },
  ];

  const checklistItems = [
    {
      title: "Subscription Model",
      description:
        "One flat subscription fee grants access to all content on the platform, making learning affordable.",
    },
    {
      title: "Watchtime-Based Tutor Payment",
      description:
        "Tutors are compensated based on the actual watch time of their courses, rewarding content quality and engagement.",
    },
    {
      title: "SkillToken Marketplace",
      description:
        "Verified skills are tokenized using blockchain, creating a marketplace for verified skills that employers can access.",
    },
    {
      title: "B2B Corporate Partnerships",
      description:
        "Companies can partner with SkillSync to upskill employees, validate skills via blockchain, and use AI to benchmark talent.",
    },
    {
      title: "Smart Contracts for Payments",
      description:
        "Ethereum smart contracts ensure transparent, automated transactions for payments and subscriptions.",
    },
  ];

  return (
    <>
      <div className="">
        <div className="relative mt-20 border-b border-neutral-800 min-h-[800px]">
          <div className="text-5xl text-center p-10 flex gap-[1rem] flex-col items-center text-white">
            <h1>
              Welcome to{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                SkillSync
              </span>
            </h1>
            <Typewriter
              options={{
                strings: [
                  "AI generated Roadmaps",
                  "Personalized Tutor",
                  "Real Time Progress analysis",
                ],
                autoStart: true,
                loop: true,
              }}
            />
            <div className="w-full text-2xl flex justify-center p-5">
              <div
                className="bg-gray-600 text-white flex items-center justify-center font-bold hover:cursor-pointer w-[15rem] h-[4rem] p-2 rounded-lg transition duration-300 hover:bg-gray-500"
                onClick={() => setOpenDialog(!openDialog)}
              >
                Daily Motivation
              </div>
              <Dialog open={openDialog} onOpenChange={handleClose}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-black">
                      Daily Dose of Motivation :)
                    </DialogTitle>
                    <DialogDescription className="p-4 text-black">
                      <Button onClick={submitHandler} disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin" />
                            Just a sec..
                          </>
                        ) : (
                          "Daily Motivation"
                        )}
                      </Button>
                      {content && <div className="m-2">{content}</div>}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide text-white">
              Discover{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                SkillSync
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap mt-10 lg:mt-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 lg:w-1/3 p-4"
              >
                <div className="flex bg-gray-900 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-800 text-orange-500 justify-center items-center rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h5 className="mt-1 mb-6 text-xl text-white">{feature.text}</h5>
                    <p className="text-md p-2 mb-20 text-neutral-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Section */}
        <div className="mt-20">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide text-white">
            Revolutionize{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
              your learning
            </span>
          </h2>
          <div className="flex flex-wrap justify-center">
            <div className="p-2 w-full lg:w-1/2">
              <Image src="/code.jpg" alt="Coding" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
            <div className="pt-12 w-full lg:w-1/2">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex mb-12">
                  <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                    <CheckCircle2 />
                  </div>
                  <div>
                    <h5 className="mt-1 mb-2 text-xl text-white">{item.title}</h5>
                    <p className="text-md text-neutral-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
