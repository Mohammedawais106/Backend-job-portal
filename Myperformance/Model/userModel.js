import mongoose from "mongoose";
let useSchema=mongoose.Schema({name:{type:String},email:{type:String},mobilenumber:{type:String},password:{type:String}})
// let useSchema=mongoose.Schema({name:{type:String},name:{type:String},name:{type:String},email:{type:String},email:{type:String},email:{type:String},mobilenumber:{type:String},mobilenumber:{type:String},mobilenumber:{type:String},password:{type:String},password:{type:String},password:{type:String}})
let userModel=mongoose.model("userFind",useSchema,"userFind")
export default userModel