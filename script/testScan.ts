// testScan.ts
import { fetchBase64Image } from '../lib/imageUtils'; // Adjust the path if needed
import { analyseLetterImage } from '../lib/vision'; // Adjust the path if needed
import 'dotenv/config'; // If you are using a .env file for your API key

async function runScanTest() {
  // {{ Replace this with the URL of an image of a letter you want to test with }}
  const testImageUrl = 'http://kickilida.weebly.com/uploads/1/2/4/0/124031697/900178804.jpg';

  if (!testImageUrl) {
    console.error("The testImageUrl variable is empty. Please provide a valid image URL.");
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY environment variable is not set. Please set it before running the test.");
    return;
  }

  console.log(`Starting scan test with image from: ${testImageUrl}`);

  try {
    // Step 1: Fetch the image from the URL and convert to Base64
    console.log("Fetching image and converting to Base64...");
    const base64Image = await fetchBase64Image(testImageUrl);
    console.log("Image successfully fetched and converted.");
    // console.log("Base64 data (first 100 chars):", base64Image.substring(0, 100) + "..."); // Optional: log part of base64

    // Step 2: Analyze the Base64 image using the Vision API function
    console.log("Sending image to Vision API for analysis...");
    const analysisResult = await analyseLetterImage(base64Image);

    console.log("\n--- Analysis Result ---");
    console.log(analysisResult);
    console.log("-----------------------");

  } catch (error) {
    console.error("\nAn error occurred during the scan test:");
    console.error(error);
  }
}

runScanTest();
