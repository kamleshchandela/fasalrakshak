/**
 * FasalRakshak - Official 38-Category Knowledge Base
 * Based on PlantVillage Research Dataset (The model folder provided)
 */

export const DiseaseRegistry = {
  // APPLE
  "Apple___Apple_scab": {
    name: "Apple Scab (सेब की पपड़ी)",
    symptoms: "Velvety brown/olive spots on leaves. Leaves may turn yellow and drop.",
    organic_treatment: "Sulfur or Potassium Bicarbonate sprays.",
    chemical_treatment: "Myclobutanil (Systhane) @ 2ml/L or Captan 50% WP.",
    farmer_guidance: "Proper pruning to increase sunlight penetration is essential."
  },
  "Apple___Black_rot": {
    name: "Apple Black Rot (सेब का काला सड़न)",
    symptoms: "Purple rimes on leaves. Fruit develops sunken black lesions.",
    organic_treatment: "Prune dead wood and remove 'mummy' fruits from the tree.",
    chemical_treatment: "Captan or Thiophanate-methyl (Cercobin) @ 1.5g/L.",
    farmer_guidance: "Hygiene is key. Burning infected wood prevents future outbreaks."
  },
  "Apple___Cedar_apple_rust": {
    name: "Cedar Apple Rust (सेब का गेरुआ)",
    symptoms: "Bright orange-yellow spots on upper leaf surfaces.",
    organic_treatment: "Remove nearby juniper trees if possible. Use copper sprays.",
    chemical_treatment: "Propiconazole (Tilt) @ 1ml/L or Mancozeb.",
    farmer_guidance: "This disease needs two hosts to survive. Keep orchards away from cedar trees."
  },
  "Apple___healthy": {
    name: "Healthy Apple (स्वस्थ सेब)",
    symptoms: "Clean green leaves with no lesions.",
    organic_treatment: "Maintain with compost and pruning.",
    chemical_treatment: "No medicine needed. Use balanced NPK.",
    farmer_guidance: "Excellent! Keep maintaining good soil health."
  },

  // CORN (MAIZE)
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
    name: "Corn Gray Leaf Spot",
    symptoms: "Rectangular tan lesions between veins.",
    organic_treatment: "Crop rotation and residue management.",
    chemical_treatment: "Azoxystrobin (Amistar) @ 1ml/L.",
    farmer_guidance: "Avoid planting corn on the same field year after year."
  },
  "Corn_(maize)___Common_rust": {
    name: "Corn Common Rust",
    symptoms: "Brown raised pustules on both leaf sides.",
    organic_treatment: "Plant resistant varieties. Sulfur dust.",
    chemical_treatment: "Tebuconazole (Folicur) @ 1ml/L.",
    farmer_guidance: "Common rust likes cool, moist weather."
  },
  "Corn_(maize)___Northern_Leaf_Blight": {
    name: "Northern Leaf Blight",
    symptoms: "Large cigar-shaped tan lesions.",
    organic_treatment: "Rotate with non-host crops.",
    chemical_treatment: "Pyraclostrobin (Headline) @ 2ml/L.",
    farmer_guidance: "Disease starts from bottom leaves and moves up."
  },
  "Corn_(maize)___healthy": {
    name: "Healthy Corn (स्वस्थ मक्का)",
    symptoms: "Vibrant dark green wide leaves.",
    organic_treatment: "High nitrogen organic manure.",
    chemical_treatment: "Standard fertilization (Urea/DAP).",
    farmer_guidance: "Ensure consistent water during the tasseling stage."
  },

  // POTATO
  "Potato___Early_blight": {
    name: "Potato Early Blight (आलू का अगेती झुलसा)",
    symptoms: "Black/brown spots with rings (Targets) on older leaves.",
    organic_treatment: "Trichoderma soil application. Neem spray.",
    chemical_treatment: "Mancozeb (Indofil M-45) @ 2g/L.",
    farmer_guidance: "Maintain high nitrogen levels to keep plants strong."
  },
  "Potato___Late_blight": {
    name: "Potato Late Blight (आलू का पछेती झुलसा)",
    symptoms: "Dark gray-green water-soaked patches. White mold under leaves.",
    organic_treatment: "Bordeaux Mixture spray. Rapid harvest if tubers are maturing.",
    chemical_treatment: "Cymoxanil + Mancozeb (Curzate) @ 2g/L.",
    farmer_guidance: "MOST DANGEROUS! If weather is cloudy/humid, spray preventatively."
  },
  "Potato___healthy": {
    name: "Healthy Potato (स्वस्थ आलू)",
    symptoms: "Uniform green growth.",
    organic_treatment: "Earthing up and mulching.",
    chemical_treatment: "No medicine needed. Maintain Urea/Potash levels.",
    farmer_guidance: "Wait for the vine to dry naturally before harvesting."
  },

  // TOMATO
  "Tomato___Bacterial_spot": {
    name: "Tomato Bacterial Spot",
    symptoms: "Small black spots with yellow halo.",
    organic_treatment: "Copper-based organic sprays.",
    chemical_treatment: "Streptocycline (1g/10L) + Copper Oxychloride (2g/L).",
    farmer_guidance: "Avoid overhead irrigation."
  },
  "Tomato___Early_blight": {
    name: "Tomato Early Blight",
    symptoms: "Concentric rings on lower leaves.",
    organic_treatment: "Compost tea spray. Pruning.",
    chemical_treatment: "Chlorothalonil @ 1.5g/L or Mancozeb.",
    farmer_guidance: "Stake plants to keep leaves off the ground."
  },
  "Tomato___Late_blight": {
    name: "Tomato Late Blight",
    symptoms: "Watery patches on leaves and stems.",
    organic_treatment: "Copper fungicides. Destroy infected foliage.",
    chemical_treatment: "Metalaxyl + Mancozeb (Ridomil Gold) @ 2.5g/L.",
    farmer_guidance: "Highly contagious. Act immediately."
  },
  "Tomato___Leaf_Mold": {
    name: "Tomato Leaf Mold",
    symptoms: "Yellow spots on top, purple/green mold below.",
    organic_treatment: "Ensure ventilation. Baking soda spray.",
    chemical_treatment: "Hexaconazole @ 2ml/L.",
    farmer_guidance: "Common in greenhouses or densely planted fields."
  },
  "Tomato___Septoria_leaf_spot": {
    name: "Tomato Septoria Spot",
    symptoms: "Tiny circular spots with silver centers.",
    organic_treatment: "Neem oil. Mulching.",
    chemical_treatment: "Carbendazim + Mancozeb (Saaf) @ 2g/L.",
    farmer_guidance: "Rotate with non-solanaceous crops."
  },
  "Tomato___Spider_mites Two-spotted_spider_mite": {
    name: "Tomato Spider Mites",
    symptoms: "Tiny yellow dots. Webbing on nodes.",
    organic_treatment: "Neem Oil @ 10ml/L. High pressure water spray.",
    chemical_treatment: "Abamectin @ 0.5ml/L or Propargite.",
    farmer_guidance: "Thrive in dusty and dry conditions."
  },
  "Tomato___Target_Spot": {
    name: "Tomato Target Spot",
    symptoms: "Brown spots with faint rings.",
    organic_treatment: "Biological agents like Bacillus subtilis.",
    chemical_treatment: "Azoxystrobin @ 1ml/L.",
    farmer_guidance: "Similar to Early Blight but spots are more scattered."
  },
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
    name: "Leaf Curl Virus",
    symptoms: "Upward curling and yellowing. Stunting.",
    organic_treatment: "Yellow sticky traps for whiteflies. Neem oil.",
    chemical_treatment: "Thiamethoxam 25% WG (Actara) @ 0.5g/L.",
    farmer_guidance: "Control whiteflies to stop the spread."
  },
  "Tomato___Tomato_mosaic_virus": {
    name: "Tomato Mosaic Virus",
    symptoms: "Mottled patterns. Distorted leaves.",
    organic_treatment: "Disinfect tools. No cure.",
    chemical_treatment: "No chemical cure. Control pests spreading it.",
    farmer_guidance: "Burn infected plants to save the rest."
  },
  "Tomato___healthy": {
    name: "Healthy Tomato (स्वस्थ टमाटर)",
    symptoms: "Strong green growth.",
    organic_treatment: "Standard manure application.",
    chemical_treatment: "Balanced NPK sprays.",
    farmer_guidance: "Maintain regular watering schedule."
  },

  // GRAPE
  "Grape___Black_rot": {
    name: "Grape Black Rot",
    symptoms: "Brown spots on leaves. Dried black grapes (mummies).",
    organic_treatment: "Copper-sulfur sprays. Pruning.",
    chemical_treatment: "Myclobutanil @ 1.5ml/L.",
    farmer_guidance: "Keep the vineyard clean and airy."
  },
  "Grape___Esca_(Black_Measles)": {
    name: "Grape Esca (Black Measles)",
    symptoms: "Tiger-stripe yellowing on leaves.",
    organic_treatment: "Pruning wound protection. No direct cure.",
    chemical_treatment: "No effective chemical once inside wood.",
    farmer_guidance: "Common in old vineyards."
  },
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
    name: "Grape Leaf Blight",
    symptoms: "Large irregular brown spots on leaves.",
    organic_treatment: "Copper sulfate sprays.",
    chemical_treatment: "Chlorothalonil @ 2g/L.",
    farmer_guidance: "Often occurs late in the season."
  },
  "Grape___healthy": {
    name: "Healthy Grape (स्वस्थ अंगूर)",
    symptoms: "Vibrant clear green leaves.",
    organic_treatment: "Supportive trellis and mulch.",
    chemical_treatment: "Standard micronutrients.",
    farmer_guidance: "Maintain proper vine training."
  },

  // ORANGE
  "Orange___Haunglongbing_(Citrus_greening)": {
    name: "Citrus Greening (HLB)",
    symptoms: "Blotchy mottle yellowing. Bitter lopsided fruit.",
    organic_treatment: "Psyllid control with Neem oil. Nutritional foliar sprays.",
    chemical_treatment: "Imidacloprid for psyllid control. No antibiotic cure.",
    farmer_guidance: "Most serious citrus disease globally. Consult experts."
  },

  // PEACH
  "Peach___Bacterial_spot": {
    name: "Peach Bacterial Spot",
    symptoms: "Watery spots. Shot-holes in leaves.",
    organic_treatment: "Copper sprays during dormancy.",
    chemical_treatment: "Oxytetracycline sprays.",
    farmer_guidance: "Common after spring rains."
  },
  "Peach___healthy": {
    name: "Healthy Peach (स्वस्थ आडू़)",
    symptoms: "Lush long green leaves.",
    organic_treatment: "Standard fruit tree mulch.",
    chemical_treatment: "Balanced fertilizer.",
    farmer_guidance: "Prune for an open canopy."
  },

  // PEPPER
  "Pepper,_bell___Bacterial_spot": {
    name: "Pepper Bacterial Spot",
    symptoms: "Irregular spots on leaves, leading to leaf drop.",
    organic_treatment: "Copper salts sprays.",
    chemical_treatment: "Streptocycline @ 1g/10L.",
    farmer_guidance: "Avoid working in wet fields."
  },
  "Pepper,_bell___healthy": {
    name: "Healthy Pepper (स्वस्थ मिर्च)",
    symptoms: "Shiny green upright plants.",
    organic_treatment: "Calcium feeding.",
    chemical_treatment: "Balanced fertilization.",
    farmer_guidance: "Consistent watering prevents flower drop."
  },

  // STRAWBERRY
  "Strawberry___Leaf_scorch": {
    name: "Strawberry Leaf Scorch",
    symptoms: "Purple/brown blotches. Leaves look burnt.",
    organic_treatment: "Proper spacing. Copper sprays.",
    chemical_treatment: "Thiophanate-methyl (Cercobin) @ 1.5g/L.",
    farmer_guidance: "Avoid over-fertilizing with nitrogen."
  },
  "Strawberry___healthy": {
    name: "Healthy Strawberry (स्वस्थ स्ट्रॉबेरी)",
    symptoms: "Deep green leaves.",
    organic_treatment: "Pine mulch or Straw.",
    chemical_treatment: "Standard maintenance.",
    farmer_guidance: "Good drainage is essential."
  },

  // SQUASH
  "Squash___Powdery_mildew": {
    name: "Squash Powdery Mildew",
    symptoms: "White flour-like dust on leaves.",
    organic_treatment: "Diluted Milk spray (1:9 ratio). Neem Oil.",
    chemical_treatment: "Difenoconazole (Score) @ 0.5ml/L.",
    farmer_guidance: "Appears in high humidity and shade."
  },

  "default": {
    name: "Unknown Condition (Unknown रोग)",
    symptoms: "Symptom patterns do not match standard disease profiles.",
    organic_treatment: "Neem oil spray as a general guard.",
    chemical_treatment: "Talk to an agricultural expert at your local Krishi Kendre.",
    farmer_guidance: "Ensure clear photos for accurate results."
  }
};
