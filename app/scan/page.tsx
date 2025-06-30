"use client"

import { Camera, Upload, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react" // Removed useEffect as it's not used in final logic here

export default function ScanPage() {
  const router = useRouter(); // Call useRouter at the top level
  const [isProcessing, setIsProcessing] = useState(false)

  // Create refs for the file input elements
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Modify handleTakePhoto to trigger the camera file input
  const handleTakePhoto = () => {
    setIsProcessing(true)
    // Trigger the hidden file input element configured for camera
    cameraInputRef.current?.click()
  }

  // Modify handleUploadFile to trigger the file upload input
  const handleUploadFile = () => {
    setIsProcessing(true)
    // Trigger the hidden file input element configured for file upload
    fileInputRef.current?.click()
  }

  // Add handlers for when a file is selected/captured
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
            console.log("Sending image data to backend API for Gemini Vision analysis...");

            // Make the fetch call to your backend API route
            const response = await fetch('/api/scan', { // Adjust URL if not local during development (e.g., http://localhost:3000/api/scan)
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ imageData: base64 }), // Send the base64 string in the body
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`Backend error: ${response.status} ${response.statusText} - ${errorData.error || 'Unknown error'}`);
            }

            const responseData = await response.json();
            const summary = responseData.summary; // Assuming the backend returns { summary: "..." }

            console.log('Received summary from backend:', summary);

            // Save the received summary to local storage under the correct key
            // Use localStorage for Next.js client components
            if (typeof window !== 'undefined') { // Ensure localStorage is available
              localStorage.setItem('currentLetterSummary', summary as string); // Save the summary string
              console.log('Summary saved to local storage.');
            } else {
               console.warn('localStorage is not available (server-side). Cannot save summary locally.');
            }

            // Navigate to the OCR summary page
            router.push("/ocr-summary");
            console.log('Navigating to /ocr-summary');

            // isProcessing is set to false by the navigation, no need to explicitly set here

          } catch (error: any) { // Add type annotation for error
            console.error("Error during scan process:\n", error);
            // Handle errors (e.g., show an error message to the user on the scan page)
            alert("Failed to process scan: " + error.message); // Simple alert for now
            setIsProcessing(false); // Stop processing indicator on error
          }
        } else {
           console.error("Failed to read file as Data URL or invalid data.");
           alert("Failed to read image file."); // Alert user
           setIsProcessing(false);
        }
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        alert("Error reading file."); // Alert user
        setIsProcessing(false);
      };
      reader.readAsDataURL(file); // Read the file as a Data URL

    } else {
      // No file selected (user canceled file picker)
      setIsProcessing(false); // Stop processing indicator
      console.log("File selection canceled.");
    }

    // Note: Resetting the input value (event.target.value = '') is not needed here
    // because React handles file input values differently.
  }


  const handleGoBack = () => {
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      {/* Hidden file input elements */}
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
            <span>{isProcessing ? "Processing..." : "Take Photo"}</span> {/* Updated text */}
          </button>

          <button
            onClick={handleUploadFile}
            disabled={isProcessing}
            className="w-full bg-[#424242] hover:bg-[#525252] active:bg-[#363636] disabled:bg-[#2a2a2a] disabled:cursor-not-allowed text-white font-bold text-2xl py-8 px-8 rounded-3xl shadow-2xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF4081] flex items-center justify-center gap-4"
            aria-label="Upload an image from your files"
          >
            <Upload size={40} strokeWidth={3} className="text-white" />
            <span>{isProcessing ? "Processing..." : "Upload from Files"}</span> {/* Updated text */}
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
  );
}