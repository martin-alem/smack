import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  loginAttempts: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const LoginUser = mongoose.model("Login", LoginSchema);

export default LoginUser;
