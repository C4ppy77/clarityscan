"use client"

import { Camera, Upload, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react" // {{change 1: Import useRef}}

export default function ScanPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  // {{change 2: Create refs for the file input elements}}
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // {{change 3: Modify handleTakePhoto to trigger the camera file input}}
  const handleTakePhoto = () => {
    setIsProcessing(true)
    // Trigger the hidden file input element configured for camera
    cameraInputRef.current?.click()
  }

  // {{change 4: Modify handleUploadFile to trigger the file upload input}}
  const handleUploadFile = () => {
    setIsProcessing(true)
    // Trigger the hidden file input element configured for file upload
    fileInputRef.current?.click()
  }

  // {{change 5: Add handlers for when a file is selected/captured}}
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsProcessing(true); // Start processing indicator immediately

    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]

      // Use FileReader to read the file content (e.g., as a Data URL/Base64 string)
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64ImageData = reader.result; // This will be the data URL

        if (typeof base64ImageData === 'string') {
          // Extract the Base64 string part (remove "data:image/jpeg;base64," prefix)
          const base64 = base64ImageData.split(',')[1];

          try {
            // {{change 1: Placeholder for Gemini Vision API Call}}
            // Replace this with your actual API call logic
            // You will need to install Google Generative AI client library or use fetch
            console.log("Sending image data to Gemini Vision API...");

            // Example placeholder API call (replace with your actual implementation)
            // Assuming you have a function like 'callGeminiVisionApi'
            // const extractedText = await callGeminiVisionApi(base64);

            // Simulate API call delay and getting text
            const extractedText = await new Promise(resolve =>
              setTimeout(() => resolve("Extracted text from the letter."), 2000) // Simulate API time
            );


            console.log("Extracted Text:", extractedText);

            // {{change 2: Pass the extracted text to the next page}}
            // You'll need to decide how to pass this data.
            // Example using query parameter (might be too long for large texts)
            // router.push(`/ocr-summary?text=${encodeURIComponent(extractedText as string)}`);

            // Example using localStorage (better for larger texts)
            localStorage.setItem('scannedLetterText', extractedText as string);
            router.push("/ocr-summary");


          } catch (error) {
            console.error("Error processing image with Gemini Vision API:", error);
            // Handle errors (e.g., show an error message to the user)
            setIsProcessing(false); // Stop processing indicator on error
          }
        } else {
           console.error("Failed to read file as Data URL.");
           setIsProcessing(false);
        }
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        setIsProcessing(false);
      };
      reader.readAsDataURL(file); // Read the file as a Data URL


    } else {
      // No file selected, stop processing
      setIsProcessing(false);
    }

    // Reset the input value so the same file can be selected again if needed
    event.target.value = '';
  }


  const handleGoBack = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      {/* {{change 6: Add hidden file input elements}} */}
      <input
        type="file"
        accept="image/*" // Accept image files
        capture="environment" // Hint to use the rear camera on mobile
        ref={cameraInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the input element
      />
      <input
        type="file"
        accept="image/*" // Accept image files
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the input element
      />

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