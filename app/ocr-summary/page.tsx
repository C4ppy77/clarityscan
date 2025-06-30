"use client"

import { Volume2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function OCRSummaryPage() {
  const router = useRouter()
  const [isReading, setIsReading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleGoHome = () => {
    router.push("/")
  }

  const handleReadAloud = () => {
    setIsReading(!isReading)
    // Placeholder for text-to-speech functionality
    if (!isReading) {
      console.log("Starting text-to-speech...")
    } else {
      console.log("Stopping text-to-speech...")
    }
  }

  const handleSave = () => {
    setIsSaved(true)
    // Placeholder for save functionality
    console.log("Saving summary to history...")

    // Reset saved state after 2 seconds for demo
    setTimeout(() => {
      setIsSaved(false)
    }, 2000)
  }

  const handleDelete = () => {
    // Placeholder for delete functionality
    console.log("Deleting scan...")
    router.push("/")
  }

  // Placeholder OCR summary content
  const letterSummary =
    "You've been referred for an eye appointment at your local clinic. The appointment is scheduled for Tuesday, February 14th at 10:30 AM. Please call 020 1234 5678 to confirm your attendance. You should bring your NHS card and any current glasses or contact lenses. The clinic is located at Moorfields Eye Hospital, City Road entrance. If you need to reschedule, please give at least 24 hours notice."

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      {/* Header - Clean title only */}
      <header className="px-8 py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">Summary</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-4">
        {/* Summary Box */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-[#1C1C1C] rounded-3xl p-8 border-2 border-[#333333]">
            <div className="max-h-96 overflow-y-auto">
              <p className="text-xl md:text-2xl text-white leading-relaxed font-medium">{letterSummary}</p>
            </div>
          </div>
        </div>

        {/* Primary Action - Read Aloud */}
        <div className="max-w-4xl mx-auto mb-8">
          <button
            onClick={handleReadAloud}
            className={`w-full py-8 px-8 rounded-3xl font-bold text-2xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF4081] flex items-center justify-center gap-4 shadow-2xl ${
              isReading ? "bg-[#FF4081] text-white" : "bg-[#FFD600] hover:bg-[#E6C200] active:bg-[#CCAD00] text-black"
            }`}
            aria-label={isReading ? "Stop reading aloud" : "Read summary aloud"}
            aria-pressed={isReading}
          >
            <Volume2 size={40} strokeWidth={3} fill="currentColor" />
            <span>{isReading ? "Stop Reading" : "Read Aloud"}</span>
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="max-w-4xl mx-auto space-y-6 mb-8">
          <button
            onClick={handleSave}
            disabled={isSaved}
            className="w-full bg-[#2979FF] hover:bg-[#1976D2] active:bg-[#1565C0] disabled:bg-[#1565C0] text-white font-bold text-2xl py-8 px-8 rounded-3xl shadow-2xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF4081] flex items-center justify-center"
            aria-label="Save this summary to your history"
          >
            <span>{isSaved ? "Saved!" : "Save Summary"}</span>
          </button>

          <button
            onClick={handleDelete}
            className="w-full bg-[#D32F2F] hover:bg-[#C62828] active:bg-[#B71C1C] text-white font-bold text-2xl py-8 px-8 rounded-3xl shadow-2xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF4081] flex items-center justify-center"
            aria-label="Delete this scan and return home"
          >
            <span>Delete</span>
          </button>
        </div>

        {/* Subtle Back to Home */}
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={handleGoHome}
            className="w-full bg-[#424242] hover:bg-[#525252] active:bg-[#363636] text-white font-bold text-2xl py-8 px-8 rounded-3xl shadow-2xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF4081] flex items-center justify-center"
            aria-label="Return to home screen"
          >
            <span>Back to Home</span>
          </button>
        </div>
      </main>
    </div>
  )
}
