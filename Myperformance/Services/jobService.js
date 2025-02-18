import jobModel from "../Model/jobModel.js"
import mongoose from "mongoose"
// import moment from "moment/moment.js"
import moment from "moment"
export let jobregisterService=async(company, position)=>{
 try {
    let data=await jobModel({company, position})
    let saveData= data.save()
    console.log(saveData);
    return "success"
 } catch (error) {
    console.log(error);
    
 }
}

export let jobgetService=async(id)=>{
 try {
    let findData=await jobModel.find()
    return findData
 } catch (error) {
    console.log(error);
    
 }
}

export let jobUpdateServeice=async(id,company,position)=>{
    try {
         let newData= await jobModel.findByIdAndUpdate(id,{company,position})
         return newData
    } catch (error) {
        console.log(error);
        
    }
}

export let jobdeleteService=async(id)=>{
 try {
    let remove= await jobModel.findByIdAndDelete(id)
    return "success"
 } catch (error) {
    console.log(error);
 }
}


export let jobstatService = async (userId) => {
   try {
       let stats = await jobModel.aggregate([
           {
               $match: {
                   createdBy: new mongoose.Types.ObjectId(userId)  // Now using passed userId
               }
           },
           {
               $group: {
                   _id: "$status", // Grouping by status field
                   count: { $sum: 1 }, // Count the number of occurrences of each status
               }
           }
       ]);
       let defaultStats={
         pending: stats.pending||0,
         reject: stats.reject||0,
         interview:stats.interview||0
       }

      //  monthly and yearly data checking 
       let monthlydata =await jobModel.aggregate([
         {
            $match:{
               createdBy: new mongoose.Types.ObjectId(userId)
         }
         },
         {
            $group:{
               _id:{
                  year:{$year: '$createdAt'},
                  month:{$month: '$createdAt'}
               },
               count:{
                  $sum:1
               }
            },
   
         }
       ])
       monthlydata=monthlydata.map(item=>{
         let {_id:{year,month},count}=item
         let date= moment().month(month -1).year(year).format("MMM Y")
         return {date,count}
       })
       .reverse()
       return [stats,monthlydata];
   } catch (error) {
       console.error(error); // Proper error logging
       throw error;  // Optionally, you can throw the error to be caught by the controller
   }
}

