"use client"

import { Camera, Upload, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ScanPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleTakePhoto = async () => {
    setIsProcessing(true)

    // Simulate camera capture process
    setTimeout(() => {
      // Navigate to OCR Summary screen
      router.push("/ocr-summary")
    }, 1500)
  }

  const handleUploadFile = async () => {
    setIsProcessing(true)

    // Simulate file picker and upload process
    setTimeout(() => {
      // Navigate to OCR Summary screen
      router.push("/ocr-summary")
    }, 1000)
  }

  const handleGoBack = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      {/* Header with Back Button */}
      <header className="flex items-center px-8 py-6">
        <button
          onClick={handleGoBack}
          className="flex items-center justify-center w-16 h-16 bg-[#424242] hover:bg-[#525252] active:bg-[#363636] rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF4081]"
          aria-label="Go back to home screen"
          disabled={isProcessing}
        >
          <ArrowLeft size={32} strokeWidth={3} className="text-white" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Scan a Letter</h1>
          <p className="text-xl md:text-2xl text-white leading-relaxed max-w-lg mx-auto font-medium">
            Take a clear photo of your letter, or upload one from your phone.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-8 max-w-md mx-auto w-full">
          <button
            onClick={handleTakePhoto}
            disabled={isProcessing}
            className="w-full bg-[#FFD600] hover:bg-[#E6C200] active:bg-[#CCAD00] disabled:bg-[#B8A000] disabled:cursor-not-allowed text-black font-bold text-2xl py-8 px-8 rounded-3xl shadow-2xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF4081] flex items-center justify-center gap-4"
            aria-label="Take a photo using your camera"
          >
            <Camera size={40} strokeWidth={3} className="text-black" />
            <span>{isProcessing ? "Opening Camera..." : "Take Photo"}</span>
          </button>

          <button
            onClick={handleUploadFile}
            disabled={isProcessing}
            className="w-full bg-[#424242] hover:bg-[#525252] active:bg-[#363636] disabled:bg-[#2a2a2a] disabled:cursor-not-allowed text-white font-bold text-2xl py-8 px-8 rounded-3xl shadow-2xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF4081] flex items-center justify-center gap-4"
            aria-label="Upload an image from your files"
          >
            <Upload size={40} strokeWidth={3} className="text-white" />
            <span>{isProcessing ? "Opening Files..." : "Upload from Files"}</span>
          </button>
        </div>

        {/* Helpful Tip */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-300 italic leading-relaxed max-w-md mx-auto">
            Make sure the whole letter is visible and well-lit.
          </p>
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-3">
              <div className="w-6 h-6 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xl text-white font-medium">Processing...</span>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
