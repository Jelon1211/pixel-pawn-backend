import mongoose from "mongoose";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URI: string;
    }
  }
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};

export { connectDB };
