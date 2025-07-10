"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    id: "what-is-arkyros",
    question: "What is Arkyros?",
    answer:
      "Arkyros is a student-built venture platform at Babson College — an all-in-one hub for startup founders, cofounder matching, investor prep, events, and tools.",
  },
  {
    id: "who-can-access",
    question: "Who can access Arkyros?",
    answer:
      "All Babson students can access the core platform. Some features are exclusive to Venture Capital Club members.",
  },
  {
    id: "cost",
    question: "Is there a cost to use Arkyros?",
    answer: "No. Arkyros is free for Babson students.",
  },
  {
    id: "join-vc-club",
    question: "How do I join the Venture Capital Club?",
    answer: 'Click the "Join VC Club" button in the navigation bar to access the application form.',
  },
  {
    id: "vc-club-benefits",
    question: "What do VC Club members get access to?",
    answer: "Exclusive tools: investor readiness tracker, term sheet templates, private Q&As with alumni, and more.",
  },
  {
    id: "find-cofounders",
    question: "How do I find cofounders?",
    answer: "Use the founder discovery feature to match based on interests, skills, and startup goals.",
  },
  {
    id: "learn-from-students",
    question: "Where can I learn from other students?",
    answer: "Arkyros hosts podcasts, events, and startup interviews from Babson's founder ecosystem.",
  },
]

export default function FAQPage() {
  const [aiQuery, setAiQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showFollowUp, setShowFollowUp] = useState(false)
  const [email, setEmail] = useState("")

  const handleAskAI = async () => {
    if (!aiQuery.trim()) return

    setIsLoading(true)
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setShowFollowUp(true)
  }

  const handleFollowUpSubmit = () => {
    // Placeholder for follow-up submission
    alert("Thank you! We'll follow up soon.")
    setShowFollowUp(false)
    setAiQuery("")
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-medium tracking-tight mb-1">Frequently Asked Questions</h1>
          <p className="text-gray-400 text-xs">Everything you need to know about Arkyros</p>
        </div>

        {/* AI Assistant Chat Interface */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-black border border-white/20 rounded-lg p-6 shadow-lg">
              <div className="text-center mb-6">
                <h2 className="text-xl font-light mb-2">Ask Arkyros AI</h2>
                <p className="text-gray-400 text-sm">Get instant answers about Babson entrepreneurship resources</p>
              </div>

              <div className="relative">
                <Input
                  placeholder="What events are happening at Babson this week?"
                  className="w-full bg-transparent border border-white/30 text-white placeholder-white/60 rounded-full px-6 py-4 pr-12 text-sm focus:border-white focus:ring-1 focus:ring-white/20 focus:outline-none shadow-sm"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-gray-100 transition-colors">
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

              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <button className="text-xs text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 px-3 py-1 rounded-full transition-colors">
                  How do I find student funding?
                </button>
                <button className="text-xs text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 px-3 py-1 rounded-full transition-colors">
                  ¿Dónde puedo encontrar oportunidades para startups?
                </button>
                <button className="text-xs text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 px-3 py-1 rounded-full transition-colors">
                  Comment créer un pitch deck?
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ask Arkyros AI Interface */}
        <div className="mb-12">
          <div className="max-w-xl mx-auto text-center">
            {!showFollowUp ? (
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="Ask a question about Arkyros…"
                    className="w-full bg-black border border-white text-white placeholder-white/60 rounded-full px-4 py-3 text-sm focus:border-white focus:ring-1 focus:ring-white/20 focus:outline-none"
                    onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
                  />
                </div>
                <Button
                  onClick={handleAskAI}
                  disabled={isLoading || !aiQuery.trim()}
                  className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-2 text-sm font-medium disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      Ask AI
                    </>
                  ) : (
                    "Ask AI"
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-white text-sm mb-4">{"We'll follow up soon — enter your email below"}</div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@babson.edu"
                  className="w-full bg-black border border-white text-white placeholder-white/60 rounded-full px-4 py-3 text-sm focus:border-white focus:ring-1 focus:ring-white/20 focus:outline-none"
                />
                <Button
                  onClick={handleFollowUpSubmit}
                  className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-2 text-sm font-medium"
                >
                  Submit for Follow-up
                </Button>
              </div>
            )}
            <p className="text-white/60 text-xs mt-3">Get instant answers or have us follow up if we're not sure.</p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-12">
          <Accordion type="single" collapsible className="space-y-1">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border border-white rounded-lg bg-black">
                <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-white/5 rounded-lg text-sm font-medium text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 text-white/80 text-xs leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-white/60 hover:text-white transition-colors text-xs font-medium"
          >
            <ArrowLeft className="w-3 h-3 mr-1" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
