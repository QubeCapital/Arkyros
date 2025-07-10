"use client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CofounderMatch() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-light mb-4 tracking-tight">Cofounder Match</h1>
          <p className="text-gray-400 text-lg mb-8">Find your perfect co-founder in the Babson community</p>
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-12">
            <p className="text-gray-400">
              Co-founder matching tool coming soon. Connect with complementary builders at Babson.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
