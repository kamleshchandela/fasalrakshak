import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are an expert agricultural plant pathologist AI assistant for Indian farmers.
Analyze the provided crop/plant image and respond ONLY in the following JSON format.
Do not include any text outside the JSON. Do not use markdown code blocks.
{
"isPlantImage": true or false,
"cropName": "Name of the crop or plant",
"healthStatus": "healthy" or "diseased" or "uncertain",
"diseaseName": "Name of disease, or 'None' if healthy",
"diseaseType": "fungal" or "bacterial" or "viral" or "pest" or "nutrient_deficiency" or "none",
"severity": "mild" or "moderate" or "severe" or "none",
"confidencePercent": number between 0 and 100,
"affectedParts": ["leaf", "stem", "root", "fruit", "flower"] (array of affected parts),
"symptoms": ["symptom 1", "symptom 2", "symptom 3"] (list of visible symptoms),
"causes": ["cause 1", "cause 2"] (what causes this disease),
"treatments": [
{
"step": 1,
"action": "Action title",
"detail": "Detailed instruction for the farmer",
"timing": "When to do this (e.g. immediately, within 3 days)",
"type": "chemical" or "organic" or "cultural"
}
],
"preventionTips": ["tip 1", "tip 2", "tip 3"],
"estimatedYieldLoss": "e.g. 20-40% if untreated, or 'None'",
"urgencyLevel": "immediate" or "within_week" or "monitor" or "none",
"weatherConditions": "Weather conditions that worsen this disease",
"organicAlternative": "Organic/natural treatment option if available",
"nearbyFarmerAlert": true or false (should nearby farmers be alerted),
"additionalNotes": "Any other important information for the farmer"
}
If the image is not a plant or crop image, set isPlantImage to false
and fill only isPlantImage, cropName as "Unknown", and set
healthStatus to "uncertain". All other fields should be empty strings or empty arrays.`;

export const analyzeCropImage = async (base64ImageData, selectedCrop = "") => {
  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
    throw new Error("Missing Gemini API Key. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  try {
    const promptParams = [{ text: SYSTEM_PROMPT }];
    
    if (selectedCrop) {
      promptParams.push({
        text: `\nNote: The farmer says this is a ${selectedCrop} crop.`
      });
    }

    // Determine mimeType. If base64 starts with data:image/png, parse it. Default to jpeg.
    let mimeType = "image/jpeg";
    let pureBase64 = base64ImageData;
    
    if (base64ImageData.startsWith("data:")) {
      const parts = base64ImageData.split(";base64,");
      if (parts.length === 2) {
        mimeType = parts[0].replace("data:", "");
        pureBase64 = parts[1];
      }
    }

    promptParams.unshift({
      inlineData: {
        data: pureBase64,
        mimeType
      }
    });

    const result = await model.generateContent(promptParams);
    const responseText = result.response.text();

    // The model might accidentally return markdown ticks. Strip them out.
    let cleanText = responseText.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.substring(7);
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.substring(3);
    }
    if (cleanText.endsWith('```')) {
      cleanText = cleanText.substring(0, cleanText.length - 3);
    }

    const jsonParsed = JSON.parse(cleanText);
    return jsonParsed;

  } catch (error) {
    console.error("Gemini AI API Error:", error);
    throw new Error("Failed to analyze image with AI. " + error.message);
  }
};
