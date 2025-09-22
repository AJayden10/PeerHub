
import { GoogleGenAI, Type } from "@google/genai";
import type { PriceSuggestion } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder key. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "API_KEY_NOT_SET" });

export async function getFairMarketValue(
    itemName: string,
    category: string,
    condition: string,
    description: string
): Promise<PriceSuggestion> {
    if (!process.env.API_KEY || process.env.API_KEY === "API_KEY_NOT_SET") {
        console.log("Simulating API call due to missing API key.");
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        return {
            suggestedPrice: Math.floor(Math.random() * 200) + 50,
            lowPrice: Math.floor(Math.random() * 50) + 20,
            highPrice: Math.floor(Math.random() * 100) + 250,
            reasoning: "This is a simulated response. The price is based on a random number generator because the Gemini API key is not configured. Please set the API_KEY environment variable to get real-time price suggestions."
        };
    }
    
    const prompt = `
        You are an expert pricing analyst for a peer-to-peer marketplace called "Smart Resale Market".
        Your task is to provide a fair market value for a user-submitted item.
        Based on the following item details, provide a suggested price, a reasonable price range (low and high), and a brief justification for your pricing.
        Return the data in the specified JSON format.

        Item Details:
        - Name: ${itemName}
        - Category: ${category}
        - Condition: ${condition}
        - Description: ${description}

        Consider factors like brand (if mentioned), item condition, category demand, and original price (if it can be inferred). Be realistic with your pricing.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        suggestedPrice: {
                            type: Type.NUMBER,
                            description: "The suggested fair market value for the item in USD.",
                        },
                        lowPrice: {
                            type: Type.NUMBER,
                            description: "The low end of the reasonable price range for a quick sale.",
                        },
                        highPrice: {
                            type: Type.NUMBER,
                            description: "The high end of the reasonable price range for an patient seller.",
                        },
                        reasoning: {
                            type: Type.STRING,
                            description: "A brief, one or two sentence justification for the suggested price, mentioning key factors.",
                        },
                    },
                    required: ["suggestedPrice", "lowPrice", "highPrice", "reasoning"],
                },
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);

        return parsedResponse as PriceSuggestion;
        
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get price suggestion from AI. Please check the console for more details.");
    }
}
