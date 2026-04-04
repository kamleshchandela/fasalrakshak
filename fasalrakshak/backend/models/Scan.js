import mongoose from "mongoose";

const scanSchema = new mongoose.Schema({
  kisanId: { type: mongoose.Schema.Types.ObjectId, ref: "Kisan", required: true },
  imageUrl: { type: String, required: true },
  thumbnailUrl: { type: String, default: "" },
  cropName: { type: String, default: "" },
  healthStatus: {
    type: String,
    enum: ["healthy", "diseased", "uncertain"],
    required: true
  },
  diseaseName: { type: String, default: "None" },
  diseaseType: { type: String, default: "none" },
  severity: { type: String, default: "none" },
  confidencePercent: { type: Number, default: 0 },
  affectedParts: { type: [String], default: [] },
  symptoms: { type: [String], default: [] },
  causes: { type: [String], default: [] },
  treatments: { type: Array, default: [] },
  preventionTips: { type: [String], default: [] },
  estimatedYieldLoss: { type: String, default: "" },
  urgencyLevel: { type: String, default: "none" },
  organicAlternative: { type: String, default: "" },
  nearbyFarmerAlert: { type: Boolean, default: false },
  additionalNotes: { type: String, default: "" },
  scannedAt: { type: Date, default: Date.now },
  location: {
    village: { type: String, default: "" },
    district: { type: String, default: "" },
    state: { type: String, default: "Gujarat" }
  }
});

const Scan = mongoose.model("Scan", scanSchema);

export default Scan;
