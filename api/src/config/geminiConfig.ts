import { GoogleGenAI } from '@google/genai';

// Best practice: implicitly use GEMINI_API_KEY env variable
// const ai = new GoogleGenAI({});

// Alternative: explicit key (avoid hardcoding in production)
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
