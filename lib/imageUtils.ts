// Adjusted for Node.js environment
import { Buffer } from 'buffer'; // Node.js built-in module

export async function fetchBase64Image(url: string): Promise<string> {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        // In Node.js fetch, response has a buffer() method for binary data
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer); // Use Node.js Buffer to handle binary data

        // Convert buffer to base64 string
        const base64 = buffer.toString('base64');

        return base64;
    } catch (error) {
        console.error("Error fetching or converting image:", error);
        throw error; // Re-throw the error so the caller can handle it
    }
}