import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Analyzes a crop image using Gemini 1.5 Flash.
 * Specifically checks for non-plant subjects (humans, irrelevant objects).
 */
export const analyzeCropImage = async (base64ImageData, selectedFile, selectedCrop = "") => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Sanitize base64 (remove data:image/png;base64, prefix if present)
    const base64Content = base64ImageData.split(',')[1] || base64ImageData;

    const prompt = `
      Analyze this agricultural image. 
      ${selectedCrop && selectedCrop !== 'Other' && selectedCrop !== 'Not Sure' ? `The user has identified this crop as: ${selectedCrop}. Please bias your analysis towards diseases common to ${selectedCrop}.` : ''}

      FIRST MANDATORY STEP: Determine if this is a photo of a plant, crop, or leaf. 
      If it contains a human face, a whole person, a vehicle, a room interior without plants, or any other totally irrelevant object, strictly return a JSON with { "isPlantImage": false }.

      If it is a plant or crop, provide a detailed analysis in the following JSON format:
      {
        "isPlantImage": true,
        "cropName": "Name of the crop (e.g., Wheat, Tomato, Rice)",
        "healthStatus": "healthy" or "diseased",
        "diseaseName": "Name of the disease (or 'Healthy' if no disease)",
        "diseaseType": "Fungal/Viral/Bacterial/Nutrient Deficiency",
        "severity": "mild", "moderate", or "severe",
        "confidencePercent": 0-100,
        "affectedParts": ["leaves", "stems", etc.],
        "symptoms": ["short description of what is seen"],
        "causes": ["why this happened"],
        "treatments": [
          { "step": 1, "action": "Clear short action", "detail": "Detailed instruction", "timing": "e.g., Immediate", "type": "organic" or "chemical" }
        ],
        "preventionTips": ["tip 1", "tip 2"]
      }

      Return ONLY the JSON. No conversational text.
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Content,
          mimeType: "image/jpeg"
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Clean JSON from potential markdown blocks
    const jsonStr = text.replace(/```json|```/g, "").trim();
    const aiData = JSON.parse(jsonStr);

    return {
      ...aiData,
      aiSource: "google_gemini_1.5_flash",
      cropName: selectedCrop || aiData.cropName || "Unknown Crop"
    };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw {
      type: 'api_error',
      message: "The AI is currently busy or unable to process this image. Please ensure your API key is valid and try again."
    };
  }
};

/**
 * Validates if an image is likely a soil report document using Gemini.
 */
export const validateSoilReportImage = async (base64ImageData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const base64Content = base64ImageData.split(',')[1] || base64ImageData;

    const prompt = `
      Analyze this image. 
      Is this a document, a laboratory report, or a structured text paper? 
      Strictly return 'VALID' if it looks like a soil analysis report or document.
      Return 'INVALID' if it is a photo of a human, a face, a landscape, or any other non-document subject.
      
      Response must be exactly 'VALID' or 'INVALID'.
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Content,
          mimeType: "image/jpeg"
        }
      }
    ]);

    const response = await result.response;
    const text = response.text().trim().toUpperCase();
    
    return text.includes('VALID');
  } catch (error) {
    console.error("Soil Validation Error:", error);
    return true; // Fallback to Tesseract if AI validation fails
  }
};

/**
 * Direct Visual Analysis of actual soil images.
 */
export const analyzeVisualSoil = async (base64ImageData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const base64Content = base64ImageData.split(',')[1] || base64ImageData;

    const prompt = `
      Analyze this photo of actual soil (mud/dirt).
      
      FIRST: Is this an image of soil? If it contains humans, animals, or irrelevant objects, return JSON { "isValid": false }.
      
      SECOND: If it is soil, identify its characteristics and return a JSON in this format:
      {
        "isValid": true,
        "SoilType": "One of: Alluvial, Black, Red, Laterite, Desert, Mountain",
        "pH": estimate float 4.0-9.0,
        "Nitrogen": estimate int 50-300,
        "Phosphorus": int 10-100,
        "Potassium": int 50-400,
        "Moisture": int 0-100,
        "OrganicCarbon": float 0.1-2.0,
        "Texture": "Fine/Coarse/Sandy/Clayey",
        "Color": "Descriptive color name",
        "isVisualEstimate": true
      }
      
      Return ONLY the JSON.
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Content,
          mimeType: "image/jpeg"
        }
      }
    ]);

    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    const data = JSON.parse(text);

    return data;
  } catch (error) {
    console.error("Visual Soil Analysis Error:", error);
    throw error;
  }
};
