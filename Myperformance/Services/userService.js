import userModel from "../Model/userModel.js";

export let userCheckService=async(email)=>{
    try {
        let details=await userModel.findOne({email})
        console.log(details);
        return details
    } catch (error) {
        console.log(error);
        
    }
}
export let userRegService=async(userData)=>{
    try {
       let data=new userModel(userData)
       let insertdata= await data.save()
       return "success"
    } catch (error) {
        console.log(error);
        
    }
}

export let checkuserService=async(Email)=>{
 try {
    let findUser=await userModel.findOne({Email})
    return findUser
 } catch (error) {
    console.log("error to find userDetails");
    
 }
}

export let updatePassSer=async(email,{password:hashpass})=>{
     try {
        let newPass=await userModel.findOneAndUpdate({email},{password:hashpass})
        console.log(newPass);
        return newPass
     } catch (error) {
        console.log("Hi kindly check your Email is right and Try again");
        
     }
}

export let dbPassService=async(email)=>{
    try {
        let data= await userModel.findOne({email})
        return data.password
    } catch (error) {
        console.log(error);
    }
}

export let allObjectService = async (users) => {
    try {
      let dataAll = userModel.insertMany(users)
      console.log(dataAll);
    return dataAll
    } catch (error) {
     console.log(error);
    }
  };
  
  