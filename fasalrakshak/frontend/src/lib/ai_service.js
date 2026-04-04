/**
 * FasalRakshak AI Service Proxy
 * Connects the React frontend to the Python/FastAPI AI engine.
 */

const AI_API_BASE = "http://localhost:8080"; // Our Python FastAPI Port

export const predictCropDisease = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${AI_API_BASE}/predict-disease`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.detail || "AI Prediction failed");
        }

        const data = await response.json();
        
        // Map Python output to frontend format (expected by Detect.jsx)
        // Expected format from Python: "Wheat - Brown rust" or "Tomato - healthy"
        const diseaseParts = (data.disease || "Unknown - Analysis Pending").split(' - ');
        const extractedCrop = diseaseParts[0].trim();
        const extractedDisease = diseaseParts[1]?.trim() || "Analysis Pending";
        
        const isPlant = data.isPlant !== false;
        const healthy = extractedDisease.toLowerCase().includes("healthy");
        
        return {
            cropName: isPlant ? extractedCrop : "Non-Plant",
            diseaseName: extractedDisease,
            healthStatus: isPlant ? (healthy ? "healthy" : "diseased") : "uncertain",
            confidence: data.confidence || 0,
            confidencePercent: Math.round((data.confidence || 0) * 100),
            isPlantImage: isPlant,
            remedy: data.remedy || "Kripya kisaan visheshagya se sampark karein.",
            severity: healthy ? "none" : (data.severity || "moderate"),
            symptoms: [data.note || (isPlant ? "Analysis based on custom crop training models." : "Please upload a clear plant photo.")],
            treatments: data.remedy ? [
                {
                    step: 1,
                    action: healthy ? "Healthy Crop" : "Recommended Action",
                    detail: data.remedy,
                    timing: "Immediate",
                    type: healthy ? "cultural" : "organic"
                }
            ] : [],
            aiSource: "local_python_model"
        };
    } catch (error) {
        console.error("Local AI Error:", error);
        throw error;
    }
};

export const predictSoilHealth = async (soilData) => {
    try {
        const response = await fetch(`${AI_API_BASE}/predict-soil`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ph: soilData.pH || soilData.ph,
                nitrogen: soilData.Nitrogen || soilData.nitrogen,
                phosphorus: soilData.Phosphorus || soilData.phosphorus,
                potassium: soilData.Potassium || soilData.potassium
            }),
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.detail || "Soil Analysis failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Soil AI Error:", error);
        throw error;
    }
};
