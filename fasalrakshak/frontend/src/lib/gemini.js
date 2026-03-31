import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are an expert agricultural plant pathologist AI assistant for Indian farmers.
Crucial: Identify the exact Crop and Disease purely from the image. 
Respond ONLY in the following JSON format. Do not use markdown code blocks or additional text.
Language: Provide "action" and "detail" in simple, very easy to understand English (or simple Hinglish terms if necessary) that a village farmer can easily read.
Provide EXACT chemical medicine names (like 'Mancozeb 75% WP', 'Chlorpyrifos') and exact dosage (like '2-3 ml per liter of water').

{
"isPlantImage": true or false,
"cropName": "Exact Name of the crop (e.g. Wheat, Tomato, Cotton)",
"healthStatus": "healthy" or "diseased" or "uncertain",
"diseaseName": "Name of disease, or 'None' if healthy",
"diseaseType": "fungal" or "bacterial" or "viral" or "pest" or "nutrient_deficiency" or "none",
"severity": "mild" or "moderate" or "severe" or "none",
"confidencePercent": number between 0 and 100,
"affectedParts": ["leaf", "stem", "root", "fruit", "flower"],
"symptoms": ["Clear symptom 1", "Clear symptom 2"],
"causes": ["Main cause 1"],
"treatments": [
{
"step": 1,
"action": "Use Exact Medicine Name (e.g. Spray Mancozeb)",
"detail": "Detailed instruction with exact dosage (e.g. Mix 2g of Mancozeb in 1 Liter of water and spray on leaves)",
"timing": "When to apply",
"type": "chemical" or "organic" or "cultural"
}
],
"preventionTips": ["tip 1", "tip 2"],
"estimatedYieldLoss": "e.g. 20-40% if untreated, or 'None'",
"urgencyLevel": "immediate" or "within_week" or "monitor" or "none",
"weatherConditions": "Weather conditions that worsen this",
"organicAlternative": "Organic/Desi ilaaj option if available",
"nearbyFarmerAlert": true or false,
"additionalNotes": "Any other important information"
}
If the image is not a plant or crop image, set isPlantImage to false and fill cropName as "Unknown".`;

import { localClassifier } from "./LocalClassifier";

export const analyzeCropImage = async (base64ImageData, selectedCrop = "") => {
  // Check if we should use local AI as a primary or fallback
  const useLocalFallback = !API_KEY || API_KEY === 'your_gemini_api_key_here';

  if (!useLocalFallback) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    try {
      const promptParams = [{ text: SYSTEM_PROMPT }];

      if (selectedCrop) {
        promptParams.push({
          text: `\nNote: The farmer says this is a ${selectedCrop} crop.`
        });
      }

      // Determine mimeType
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
      return { ...jsonParsed, aiSource: "cloud" };

    } catch (error) {
      console.warn("Gemini AI API Error, falling back to local detection:", error);
      // Fall through to local detection
    }
  }

  // Local detection fallback
  console.log("Using Local AI Detection...");
  try {
    const img = new Image();
    img.src = base64ImageData;
    await new Promise((resolve) => (img.onload = resolve));

    const localResult = await localClassifier.identify(img, selectedCrop);


    // Map local result to the same schema as Gemini for UI compatibility
    return {
      isPlantImage: localResult.isPlantImage !== false,
      cropName: selectedCrop || localResult.detectedCrop,
      healthStatus: localResult.healthStatus,
      diseaseName: localResult.disease,
      diseaseType: "Hybrid Local Analysis",
      severity: localResult.healthStatus === "healthy" ? "none" : "moderate",
      confidencePercent: parseFloat(localResult.confidence),
      affectedParts: ["leaf"],
      symptoms: [localResult.notes],
      causes: ["Agricultural Pathogen"],
      recommendation: {
        organic: localResult.fullInfo.organic_treatment,
        chemical: localResult.fullInfo.chemical_treatment,
        symptoms: localResult.fullInfo.symptoms,
        guidance: localResult.fullInfo.farmer_guidance
      },
      treatments: [
        {
          step: 1,
          action: "Organic: " + localResult.fullInfo.organic_treatment.split('.')[0],
          detail: localResult.fullInfo.organic_treatment,
          timing: "Immediate",
          type: "organic"
        },
        {
          step: 2,
          action: "Chemical: " + localResult.fullInfo.chemical_treatment.split(' ')[0],
          detail: localResult.fullInfo.chemical_treatment,
          timing: "Within 24 hours",
          type: "chemical"
        }
      ],
      preventionTips: [localResult.fullInfo.farmer_guidance],
      aiSource: "local",
      isLocal: true,
      accuracyTier: localResult.accuracyTier
    };

  } catch (err) {
    console.error("Local AI Error:", err);
    throw new Error("Both Cloud and Local AI detection failed.");
  }
};
