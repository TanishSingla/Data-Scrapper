import mongoose, { mongo } from 'mongoose';

//variable to track connection 
let isConnected  = false;

export const connectToDb = async()=>{
    mongoose.set('strictQuery',true);

    if(!process.env.MONGODB_URI){
        console.log("Mongo db URL is not working...");
        return;
    }

    if(isConnected){
        console.log("Using existing dbs connection...");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("Database connected...")
    }catch(e){
        console.log(e);
    }
}