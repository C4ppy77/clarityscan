// {{Change the function name and update the prompt}}
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Rename the function to reflect its new purpose, e.g., analyseLetterImage
export async function analyseLetterImage(base64Image: string): Promise<string> {
  console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "Key is present" : "Key is missing or empty");
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' }); // gemini-2.5-pro should work for text extraction

  const result = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [
          {
            inlineData: {
              mimeType: 'image/png', // Ensure the MIME type matches your image format
              data: base64Image,
            },
          },
          {
            // {{Amend the prompt here to instruct the model on what to do with the letter image}}
            // Example 1: Extract all text
            // text: 'Extract all the text from this letter image.',

            // Example 2: Summarize the letter
             text: 'Read the text in this letter image and provide a concise summary for a vision-impaired user.',

            // Example 3: Extract specific details (you can combine this with a summary)
            // text: 'Read this letter. Extract the sender, recipient, date, and provide a brief summary of the main content.',
          },
        ],
      },
    ],
  });

  const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text ?? 'Could not extract or summarize text from the image.';
}