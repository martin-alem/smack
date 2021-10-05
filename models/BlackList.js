import mongoose from "mongoose";

const BlackListScheme = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

const BlackList = mongoose.model("Blacklist", BlackListScheme);

export default BlackList;
