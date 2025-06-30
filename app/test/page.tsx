"use client";

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [scannedText, setScannedText] = useState<string | null>(null);

  useEffect(() => {
    // Read the text from localStorage when the component mounts
    const text = localStorage.getItem('scannedLetterText');
    setScannedText(text);

    // Clean up localStorage after reading if you don't need it to persist
    // localStorage.removeItem('scannedLetterText');
  }, []); // The empty array ensures this effect runs only once on mount

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Raw Scanned Text (Test Page)</h1>
      {
        scannedText ? (
          <pre className="whitespace-pre-wrap break-words">
            {scannedText}
          </pre>
        ) : (
          <p>No scanned text found in localStorage.</p>
        )
      }
    </div>
  );
}