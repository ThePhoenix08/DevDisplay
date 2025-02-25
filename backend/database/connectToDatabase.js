import mongoose from "mongoose";
import Constants from "../constants";

export default connectToDatabase = async () => {
  try {
    const URI = Constants.MONGODB_URI;
    const {connection} = await mongoose.connect(URI);
    console.log(`🗄️  Connected to: ${uri}`)
    console.info(`⚙️  MongoDB connected, DB HOST: ${connection.host}`);
  } catch (error) {
    console.error("⚠️  Error connecting to the database:", error);
    process.exit(1);
  }
};