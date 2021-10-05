import mongoose from "mongoose";

const VerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  verificationAttempt: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Verification = mongoose.model("Verification", VerificationSchema);

export default Verification;
