import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, CareerPlanOutput } from "../types";

// Ensure process.env.API_KEY is available in the environment.
// The API key is assumed to be pre-configured and valid.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable is not set.");
}

const SYSTEM_INSTRUCTION = `You are an AI-powered career pathfinding assistant. Your goal is to help workers in transitioning industries navigate job displacement due to AI by providing futuristic, AI-resilient career path predictions and actionable reskilling advice. Be supportive, empowering, and provide clear, easy-to-understand explanations. All recommendations must adhere to labor market standards.`;

export async function generateCareerPlan(
  input: UserInput
): Promise<CareerPlanOutput | null> {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const prompt = `Based on my current industry: ${input.currentIndustry}, current role: ${input.currentRole}, existing skills: ${input.existingSkills}, and career interests: ${input.careerInterests}, provide a personalized career pathfinding solution. Focus on roles that are resilient to AI displacement and leverage AI for productivity.

The output MUST be a JSON object with the following structure:
{
  "career_recommendations": [string, string, ...],
  "action_steps": [string, string, ...],
  "summary": string
}

Ensure the career recommendations are specific, relevant to the input, and forward-looking. Action steps should be concrete and actionable, suggesting specific skills to learn, courses to take, or projects to undertake. The summary should encapsulate the overall plan and provide an encouraging outlook.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Using a capable model for complex reasoning tasks
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            career_recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of recommended career paths or roles.",
            },
            action_steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of actionable steps for reskilling or transitioning.",
            },
            summary: {
              type: Type.STRING,
              description: "A summary of the career plan and an encouraging message.",
            },
          },
          required: ["career_recommendations", "action_steps", "summary"],
          propertyOrdering: ["career_recommendations", "action_steps", "summary"],
        },
        temperature: 0.7, // Adjust temperature for creativity vs. consistency
        topP: 0.95,
        topK: 64,
      },
    });

    const jsonString = response.text?.trim();

    if (jsonString) {
      // Clean up potential markdown code block wrappers
      const cleanedJsonString = jsonString.startsWith("```json") && jsonString.endsWith("```")
        ? jsonString.substring(7, jsonString.length - 3).trim()
        : jsonString;
      return JSON.parse(cleanedJsonString) as CareerPlanOutput;
    }
    return null;
  } catch (error) {
    console.error("Error generating career plan:", error);
    throw new Error("Failed to generate career plan. Please try again.");
  }
}