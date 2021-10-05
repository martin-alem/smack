import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  regAttempt: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
    default: null,
  },
  date: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

const Registration = mongoose.model("Registration", RegistrationSchema);

export default Registration;
