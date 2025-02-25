import mongoose from "mongoose";
import Constants from "../constants.js";

const connectToDatabase = async () => {
  try {
    const URI = Constants.MONGODB_URI;
    const {connection} = await mongoose.connect(URI);
    console.log(`🗄️  Connected to: ${URI}`)
    console.info(`⚙️  MongoDB connected, DB HOST: ${connection.host}`);
  } catch (error) {
    console.error("⚠️  Error connecting to the database:", error);
    process.exit(1);
  }
};

export default connectToDatabase;