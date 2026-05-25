import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({});

console.log(process.env.MONGO_URI);

const connectDB = async () => {
    const mongoUrl = `${process.env.MONGO_URI}brainly`;
    console.log(mongoUrl);
    try {
        await mongoose.connect(mongoUrl);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Database connection error", error.message);
        process.exit(1);
    }
}
export  {
    connectDB
};