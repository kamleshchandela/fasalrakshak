import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';

const API_KEY = "AIzaSyCXYSgeY1nRz2jxpiO-KTRa4VUmbYjx1ww";

async function run() {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent("Hello, are you available?");
    console.log("RESPONSE:", result.response.text());
  } catch (err) {
    console.error("ERROR TYPE:", err.constructor.name);
    console.error("ERROR MESSAGE:", err.message);
    if (err.stack) console.error("STACK:", err.stack);
  }
}

run();
