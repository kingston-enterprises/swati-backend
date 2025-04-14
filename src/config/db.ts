import mongoose from "mongoose";

let CONNECTED = "not connected"
const connectDB = async () => {
  try {

    let url = typeof process.env.MONGO_URI === 'string' ? process.env.MONGO_URI : "";
    
    const conn = await mongoose.connect(url);
    console.log(`MongoDB Connected @ ${conn.connection.host}`);
    CONNECTED = "connected";

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
                    
export const getDBStatus = () => {
  return CONNECTED;
}

export default connectDB;
