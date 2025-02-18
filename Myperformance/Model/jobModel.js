import mongoose from "mongoose";
let josbSchema=mongoose.Schema({company:{type:String},position:{type:String},status:{type:String,enum:["pending","reject","interview"],default:"pending"},worktype:{type:String,default:"full-time"},worklocation:{type:String,default:"mumbai"},createby:{type:mongoose.Types.ObjectId,ref:"userFind"}},{timestamps:true})
// let josbSchema=mongoose.Schema({company:{type:String},position:{type:String},status:{type:String,enum:["pending","reject","interview"],default:"pending"},worktype:{type:String,default:"full-time"},worklocation:{type:String,default:"mumbai"},createby:{type:mongoose.Types.ObjectId,ref:"userFind"}},{timestamps:true})
let jobModel=mongoose.model("job",josbSchema,"job")
    export default jobModel
