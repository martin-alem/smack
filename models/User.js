import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: false,
    default: null,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
    default: null,
  },
  data: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
