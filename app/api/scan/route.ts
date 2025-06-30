// c:\Users\cappd\OneDrive\Void\clarity-scan\app\api\scan\route.ts
import { analyseLetterImage } from '@/lib/vision'; // Adjust import path if necessary
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageData } = body; // Assuming the mobile app sends { "imageData": "base64_string" }

    if (!imageData) {
      return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
    }

    // Call your function to analyze the image using Gemini
    const analysisResult = await analyseLetterImage(imageData);

    // Send the analysis result (the summary) back to the mobile app
    // The mobile app frontend will handle displaying this summary with empathy
    return NextResponse.json({ summary: analysisResult });

  } catch (error) {
    console.error('Error processing scan:', error);
    return NextResponse.json({ error: 'Failed to process image scan', details: error.message }, { status: 500 });
  }
}

// You might also want to handle other HTTP methods if needed, e.g., GET, but POST is typical for receiving data.
// export async function GET(request: Request) { ... }
