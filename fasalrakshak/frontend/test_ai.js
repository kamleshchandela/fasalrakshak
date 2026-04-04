import { GoogleGenerativeAI } from "@google/generative-ai";

async function test() {
  const API_KEY = "AIzaSyD-6iYfykUo8ub74BeVlSmgmi5vvAI5t1U";
  const genAI = new GoogleGenerativeAI(API_KEY);
  
  const modelsToTry = [
    "gemini-1.5-flash", 
    "gemini-1.5-pro", 
    "gemini-1.0-pro",
    "gemini-2.0-flash-exp",
    "gemini-1.5-flash-8b"
  ];

  console.log("Probing for a working model with your key...");

  for (const modelName of modelsToTry) {
    try {
      process.stdout.write(`Testing ${modelName}... `);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("ping");
      const response = await result.response;
      console.log("✅ WORKING!");
      console.log(`\nFound it! Please use model: "${modelName}" in your gemini.js file.`);
      return; 
    } catch (error) {
      if (error.message.includes("429")) {
        console.log("⚠️ 429 (Quota full)");
      } else if (error.message.includes("404")) {
        console.log("❌ 404 (Not Found)");
      } else {
        console.log(`❌ Error: ${error.message.substring(0, 50)}...`);
      }
    }
  }
  console.log("\nCONCLUSION: None of the standard models have quota on this key. Please check Google AI Studio billing/plan.");
}

test();
