import mongoose from "mongoose";

const connectDB = async() => {
    try{
        mongoose.connection.on("connected", async() =>{
            console.log("Connected to MongoDB")
        });
        await mongoose.connect(process.env.MONGODB_URI!)
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

export default connectDB;