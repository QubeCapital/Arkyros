"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CofounderMatching() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-light mb-4 tracking-tight">Cofounder Matching</h1>
        <p className="text-gray-400 mb-8">
          AI-powered cofounder matching coming soon. Connect with complementary builders in the Babson community.
        </p>
        <Button variant="ghost" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
