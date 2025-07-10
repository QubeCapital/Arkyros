"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-md">
        <div className="text-center">
          <Link href="/" className="text-lg font-medium mb-12 block">
            Arkyros
          </Link>

          <h1 className="text-3xl font-light mb-8 tracking-tight">Welcome Back to Arkyros</h1>

          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-sm font-medium rounded-sm w-full mb-6"
            asChild
          >
            <Link href="/login-form">Login with Babson Email</Link>
          </Button>

          <div className="text-center">
            <p className="text-gray-400 text-sm mb-3">Want access to exclusive tools?</p>
            <Button
              variant="ghost"
              className="text-green-400 hover:text-green-300 hover:bg-gray-900 text-sm font-medium rounded-sm"
              asChild
            >
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSfViE3YtIsiBfhEJHxRJybeZPEOmdPj4YaWNMGjjs63UxYqGg/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the VC Club
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
