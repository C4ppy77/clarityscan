"use client"

import { Camera, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center px-8 py-12">
        {/* App Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">ClarityScan</h1>
          <p className="text-xl md:text-2xl text-white leading-relaxed max-w-lg mx-auto font-medium">
            Helping you read and understand important letters with ease.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-8 max-w-md mx-auto w-full">
          <button
            onClick={() => router.push("/scan")}
            className="w-full bg-[#FFD600] hover:bg-[#E6C200] active:bg-[#CCAD00] text-black font-bold text-2xl py-8 px-8 rounded-3xl shadow-2xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF4081] flex items-center justify-center gap-4"
            aria-label="Scan a new letter using your camera"
          >
            <Camera size={40} strokeWidth={3} className="text-black" />
            <span>Scan a Letter</span>
          </button>

          <button
            className="w-full bg-[#424242] hover:bg-[#525252] active:bg-[#363636] text-white font-bold text-2xl py-8 px-8 rounded-3xl shadow-2xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF4081] flex items-center justify-center gap-4"
            aria-label="View your previously scanned letters"
          >
            <Clock size={40} strokeWidth={3} className="text-white" />
            <span>View History</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-8 text-center bg-[#424242]">
        <p className="text-lg md:text-xl text-white leading-relaxed font-medium">
          Built with care. 10% of profits go to RNIB.
        </p>
      </footer>
    </div>
  )
}
