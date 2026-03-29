import mongoose from 'mongoose';

const kisanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 60
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    match: /^[6-9]\d{9}$/
  },
  pin: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },
  village: {
    type: String,
    required: true,
    trim: true
  },
  district: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    default: "Gujarat"
  },
  cropTypes: {
    type: [String],
    default: []
  },
  landSize: {
    type: String,
    default: ""
  },
  irrigationMethod: {
    type: String,
    default: ""
  },
  farmingType: {
    type: String,
    default: ""
  },
  profilePhoto: {
    type: String,
    default: ""
  },
  totalScans: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: {
    type: Date,
    default: Date.now
  }
});

const Kisan = mongoose.model('Kisan', kisanSchema);

export default Kisan;
