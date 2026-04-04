import Scan from "../models/Scan.js";
import Kisan from "../models/Kisan.js";

export const saveScan = async (req, res) => {
  try {
    const userId = req.user._id;

    const newScan = new Scan({
      ...req.body,
      kisanId: userId,
      location: {
        village: req.user.village || "",
        district: req.user.district || "",
        state: "Gujarat"
      }
    });

    const savedScan = await newScan.save();

    // Increment totalScans on user model natively
    await Kisan.findByIdAndUpdate(userId, { $inc: { totalScans: 1 } });

    res.status(201).json(savedScan);
  } catch (error) {
    console.error("Save Scan Error:", error);
    res.status(500).json({ message: "Failed to save scan to database" });
  }
};

export const getUserScans = async (req, res) => {
  try {
    const scans = await Scan.find({ kisanId: req.user._id }).sort({ scannedAt: -1 }).limit(50);
    res.status(200).json(scans);
  } catch (error) {
    console.error("Fetch Scans Error:", error);
    res.status(500).json({ message: "Failed to fetch scan history" });
  }
};
