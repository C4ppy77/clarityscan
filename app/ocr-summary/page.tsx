"use client"

import { Volume2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

// Import your mobile-specific Text-to-Speech library here
// For React Native, you might use 'expo-speech' or 'react-native-tts'
// Example: import * as Speech from 'expo-speech';
// Example: import Tts from 'react-native-tts';

export default function OCRSummaryPage() {
  const router = useRouter()
  const [summaryText, setSummaryText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Effect to retrieve summary from local storage on page load
  useEffect(() => {
    const retrieveSummary = () => {
      try {
        // Use the appropriate local storage mechanism for your mobile framework.
        // For web-based (like PWA or Capacitor wrap), localStorage works.
        // For true native React Native, use AsyncStorage.
        // Assuming web localStorage for this Next.js page component example:
        const storedSummary = localStorage.getItem('currentLetterSummary');

        if (storedSummary) {
          setSummaryText(storedSummary);
          // *** Important: Delete from local storage after retrieving for privacy ***
          localStorage.removeItem('currentLetterSummary');
        } else {
          // If summary is not found, it might be an error or direct navigation without scan
          setError("No summary text found in local storage. Did you navigate directly or was there an error?");
        }
      } catch (e: any) {
        setError("Failed to retrieve summary from local storage: " + e.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Note: localStorage is only available in the browser, not during server rendering.
    // Ensure this component runs client-side, which 'use client' handles.
    // For true React Native (not Next.js web), AsyncStorage is async,
    // so you'd need `async/await` and potentially handle loading state differently.
    if (typeof window !== 'undefined') { // Check if window is defined (client-side)
       // Add a small delay before retrieving from local storage
       const timeoutId = setTimeout(() => {
         retrieveSummary();
       }, 50); // Adjust delay if needed

       // Cleanup function to clear the timeout if the component unmounts
       return () => clearTimeout(timeoutId);
    } else {
       // Handle server-side rendering case if necessary,
       // perhaps by setting loading false immediately or deferring
       setIsLoading(false);
       setError("Local storage is not available on the server.");
    }


    // Potential cleanup for TTS if needed (e.g., stop speech if component unmounts while reading)
    // return () => {
    //   if (isReading) {
    //     // Stop TTS using your library's stop function
    //     // Speech.stop(); // Example for Expo/React Native
    //     // Tts.stop(); // Example for React Native TTS
    //   }
    // };

  }, []); // Empty dependency array means this effect runs once on mount

  const handleGoHome = () => {
    router.push("/")
  }

  const handleReadAloud = async () => { // Made async in case TTS library returns a Promise
    if (!summaryText) return; // Don't try to read if no summary is loaded

    if (isReading) {
      // Stop Text-to-Speech
      // Use your mobile-specific TTS library's stop function
      console.log("Stopping text-to-speech...") // Placeholder
      // await Speech.stop(); // Example for Expo/React Native
      // await Tts.stop(); // Example for React Native TTS

    } else {
      // Start Text-to-Speech
      // Use your mobile-specific TTS library's speak function
      console.log("Starting text-to-speech...") // Placeholder
      // Ensure your TTS library is initialized if required before speaking
      // await Speech.speak(summaryText, { language: 'en-US' }); // Example for Expo/React Native
      // await Tts.speak(summaryText, { language: 'en-US' }); // Example for React Native TTS
    }
    setIsReading(!isReading);
  }

  const handleSave = () => {
    setIsSaved(true)
    // Placeholder for save functionality - Consider saving to a secure, non-cloud local history if required
    // Note: Saving the *full* text might conflict with initial privacy goals of temporary storage.
    // Maybe save metadata or a very brief, non-sensitive identifier? The summary text is already deleted on load.
    console.log("Saving summary to history (placeholder)...")

    // Reset saved state after 2 seconds for demo
    setTimeout(() => {
      setIsSaved(false)
    }, 2000)
  }

  const handleDelete = () => {
    // The summary is already deleted from local storage on load.
    // This button can just navigate back or confirm deletion status.
    console.log("Deleting scan (already removed from local storage on load)")
    router.push("/")
  }

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
              {isLoading && <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-medium">Loading summary...</p>}
              {error && <p className="text-xl md:text-2xl text-red-500 leading-relaxed font-medium">Error: {error}</p>}\
              {summaryText && <p className="text-xl md:text-2xl text-white leading-relaxed font-medium">
                 {/* Display the retrieved summary text here */}
                {summaryText}
              </p>}
              {!isLoading && !summaryText && !error && <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-medium">No summary available.</p>}\
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
            disabled={isLoading || !!error || !summaryText} // Disable if loading, error, or no summary
          >
            <Volume2 size={40} strokeWidth={3} fill="currentColor" />
            <span>{isReading ? "Stop Reading" : "Read Aloud"}</span>
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="max-w-4xl mx-auto space-y-6 mb-8">
          <button
            onClick={handleSave}
            disabled={isSaved || isLoading || !!error || !summaryText}
            className="w-full bg-[#2979FF] hover:bg-[#1976D2] active:bg-[#1565C0] disabled:bg-[#1565C0] text-white font-bold text-2xl py-8 px-8 rounded-3xl shadow-2xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF4081] flex items-center justify-center"
            aria-label="Save this summary to your history"
          >
            <span>{isSaved ? "Saved!" : "Save Summary"}</span>
          </button>

          <button
            onClick={handleDelete}
             disabled={isLoading || !!error} // Disable if loading or error
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