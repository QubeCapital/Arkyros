"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Calendar, MessageSquare, Mic, ArrowRight, LogOut, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

// Milestone data with criteria
const milestoneData = [
  {
    id: 1,
    title: "Ideation & Validation",
    criteria: ["Clear problem and solution", "MVP or prototype created", "Initial user feedback"],
  },
  {
    id: 2,
    title: "Company Setup",
    criteria: ["Registered legal entity", "Founder equity split", "Basic operating agreement"],
  },
  {
    id: 3,
    title: "Traction & Metrics",
    criteria: ["Defined revenue model", "Early user traction", "Growth or waitlist proof"],
  },
  {
    id: 4,
    title: "Team & Talent",
    criteria: ["Cofounder(s) matched", "Team bios listed", "Advisory help secured"],
  },
  {
    id: 5,
    title: "Fundraising Readiness",
    criteria: ["Pitch deck created", "Understands term sheets", "Draft investor list"],
  },
  {
    id: 6,
    title: "Investor Outreach",
    criteria: ["Sent first outreach emails", "Scheduled investor meeting", "Added investor notes"],
  },
]

// Typing Animation Component
function TypingPlaceholder() {
  const prompts = [
    "How close am I to raising money?",
    "What should I focus on next?",
    "How do I improve my pitch deck?",
    "Who are the best VCs for student startups?",
    "Find me potential co-founders.",
    "How do I scale after launch?",
    "What do Babson founders struggle with most?",
  ]

  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentPrompt = prompts[currentPromptIndex]

    if (isTyping) {
      if (charIndex < currentPrompt.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPrompt.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, 50) // Typing speed
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, pause then start deleting
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000) // Pause duration
        return () => clearTimeout(timeout)
      }
    } else {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPrompt.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 30) // Deleting speed
        return () => clearTimeout(timeout)
      } else {
        // Finished deleting, move to next prompt
        setCurrentPromptIndex((prev) => (prev + 1) % prompts.length)
        setIsTyping(true)
      }
    }
  }, [currentPromptIndex, charIndex, isTyping, prompts])

  return (
    <span className="text-white/60">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function Dashboard() {
  const [user, setUser] = useState({ firstName: "", email: "", isLoggedIn: false })
  const [milestoneProgress, setMilestoneProgress] = useState({})

  // Load user data and progress on mount
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn")
    const userEmail = localStorage.getItem("userEmail")

    if (loginStatus !== "true") {
      window.location.href = "/login"
      return
    }

    if (userEmail) {
      const firstName = userEmail.split("@")[0].split(".")[0]
      setUser({
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        email: userEmail,
        isLoggedIn: true,
      })

      // Load saved progress for this user
      const savedProgress = localStorage.getItem(`progress_${userEmail}`)
      if (savedProgress) {
        setMilestoneProgress(JSON.parse(savedProgress))
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    window.location.href = "/"
  }

  const handleCheckboxChange = (milestoneId, criteriaIndex, checked) => {
    const newProgress = { ...milestoneProgress }
    if (!newProgress[milestoneId]) {
      newProgress[milestoneId] = {}
    }
    newProgress[milestoneId][criteriaIndex] = checked

    setMilestoneProgress(newProgress)

    // Save to localStorage
    localStorage.setItem(`progress_${user.email}`, JSON.stringify(newProgress))
  }

  // Calculate overall progress
  const calculateProgress = () => {
    let completedMilestones = 0
    milestoneData.forEach((milestone) => {
      const milestoneChecks = milestoneProgress[milestone.id] || {}
      const completedCriteria = Object.values(milestoneChecks).filter(Boolean).length
      if (completedCriteria === milestone.criteria.length) {
        completedMilestones++
      }
    })
    return { completed: completedMilestones, total: milestoneData.length }
  }

  const progress = calculateProgress()
  const progressPercentage = (progress.completed / progress.total) * 100

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      {/* Header */}
      <header className="border-b border-white/10 py-6">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-lg font-medium">
                Arkyros
              </Link>
              <span className="ml-3 rounded-md bg-green-900/20 border border-green-500/30 px-2 py-0.5 text-xs font-medium text-green-400">
                VC Club Member
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-400">Hello, {user.firstName}. Ready to build?</span>
              <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-white">
                <Link href="/think-tank">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Think Tank
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-400 hover:text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light mb-4 tracking-tight">My Dashboard</h1>
          <p className="text-gray-400 text-lg font-light">
            Your exclusive hub for building, funding, and scaling your startup
          </p>
        </div>

        {/* Ask Arkyros AI Section */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-black border border-white rounded-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-light mb-2 text-white">Ask Arkyros AI</h2>
                <p className="text-white/70 text-sm">Get personalized insights for your startup journey</p>
              </div>

              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-black border border-white text-white rounded-full px-6 py-4 pr-16 text-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder=""
                  />
                  <div className="absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <TypingPlaceholder />
                  </div>
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black border border-white text-white rounded-full p-2 hover:bg-white/10 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-16"></div>

        {/* Investor Progress Tracker */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light mb-4 tracking-tight">Investor Progress Tracker</h2>
            <p className="text-gray-400 text-lg">Track how close you are to raising capital with Arkyros AI.</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Overall Progress</span>
              <span className="text-white">
                {progress.completed}/{progress.total} milestones complete
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Milestone Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {milestoneData.map((milestone) => {
              const milestoneChecks = milestoneProgress[milestone.id] || {}
              const completedCriteria = Object.values(milestoneChecks).filter(Boolean).length
              const isComplete = completedCriteria === milestone.criteria.length

              return (
                <Card
                  key={milestone.id}
                  className="bg-black border border-white/20 hover:border-white/40 transition-colors"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-medium text-white flex items-center justify-between">
                      {milestone.title}
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          isComplete
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {completedCriteria}/{milestone.criteria.length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {milestone.criteria.map((criteria, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={milestoneChecks[index] || false}
                            onChange={(e) => handleCheckboxChange(milestone.id, index, e.target.checked)}
                            className="w-4 h-4 rounded border border-gray-600 bg-transparent checked:bg-green-500 checked:border-green-500 focus:ring-green-500 focus:ring-2"
                          />
                          <span
                            className={`text-sm transition-colors ${
                              milestoneChecks[index]
                                ? "text-white line-through"
                                : "text-gray-400 group-hover:text-gray-300"
                            }`}
                          >
                            {criteria}
                          </span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-green-500 hover:text-white px-8 py-3 text-sm font-medium rounded-sm transition-colors"
              asChild
            >
              <Link href="/investor-report">
                Evaluate My Progress
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-gray-500 text-xs mt-3 max-w-md mx-auto">
              Arkyros AI will analyze your progress and generate a custom report. You'll be able to view it privately
              here or have it sent to your Babson email.
            </p>
          </div>
        </section>

        {/* Additional Dashboard Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Co-Founder Matching */}
          <Card className="bg-black border border-white/20 hover:border-green-500/50 transition-colors group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
                <div>
                  <CardTitle className="text-lg font-light text-white">Find Your Co-Founder</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Use Arkyros AI to connect with complementary builders in the Babson community.
              </p>
              <Button
                className="w-full bg-transparent border border-white/20 text-white hover:bg-green-500 hover:border-green-500 rounded-sm transition-colors"
                asChild
              >
                <Link href="/cofounder-matching">Start Matching</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Grant & Funding */}
          <Card className="bg-black border border-white/20 hover:border-green-500/50 transition-colors group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <DollarSign className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
                <div>
                  <CardTitle className="text-lg font-light text-white">Get Funding-Ready</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Discover exclusive grants and funding opportunities at Babson and in Boston.
              </p>
              <Button
                className="w-full bg-transparent border border-white/20 text-white hover:bg-green-500 hover:border-green-500 rounded-sm transition-colors"
                asChild
              >
                <Link href="/grants">Explore Grants</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Events */}
          <Card className="bg-black border border-white/20 hover:border-green-500/50 transition-colors group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
                <div>
                  <CardTitle className="text-lg font-light text-white">Upcoming VC & Startup Events</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Stay in the loop with curated startup and VC events happening at Babson and across Boston.
              </p>
              <Button
                className="w-full bg-transparent border border-white/20 text-white hover:bg-green-500 hover:border-green-500 rounded-sm transition-colors"
                asChild
              >
                <Link href="/events">View Events</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Founder Forum */}
          <Card className="bg-black border border-white/20 hover:border-green-500/50 transition-colors group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
                <div>
                  <CardTitle className="text-lg font-light text-white">Founder Forum</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Ask questions, get feedback, and collaborate with fellow entrepreneurs.
              </p>
              <Button
                className="w-full bg-transparent border border-white/20 text-white hover:bg-green-500 hover:border-green-500 rounded-sm transition-colors"
                asChild
              >
                <Link href="/forum">Open the Forum</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Podcast Section */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-transparent border border-white/20 text-white hover:bg-green-500 hover:border-green-500 px-8 py-3 text-sm font-medium rounded-sm transition-colors"
            asChild
          >
            <Link href="/podcast">
              <Mic className="w-4 h-4 mr-2" />
              Access Podcast Vault
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
