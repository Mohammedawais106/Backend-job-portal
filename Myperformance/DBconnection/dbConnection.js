import mongoose from "mongoose";

let connectDB=async(dbString,dbName)=>{
 try {
    await mongoose.connect(dbString+dbName)
    console.log('Hello Developer DataBase Connected successfully');
 } catch (error) {
    console.log('Hello Developer error occured during connect DB connections');
 }
}

export default connectDB