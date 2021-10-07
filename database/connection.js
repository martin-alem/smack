import mongoose from "mongoose";

async function connectToSmackDatabase() {
  const options = { keepAlive: true, keepAliveInitialDelay: 300000 };
  try {
    mongoose.connection.on("connecting", () => console.log("Connecting to Mongodb..."));
    mongoose.connection.on("connected", () => console.log("Connected to Smack successfully"));
    await mongoose.connect(process.env.SMACK_DB_URL, options);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export { connectToSmackDatabase };
