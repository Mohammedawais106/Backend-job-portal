import bcrypt from "bcrypt"
export let convertHsh=async(password)=>{
    try {
    //    P=await bcrypt.hash(Password,10)
      let Pass = await bcrypt.hash(password,10)
       return Pass
    } catch (error) {
        console.log(error);
    }
}

export let convertPass=async(password)=>{
    try {
        let Pass= await bcrypt.hash(password,10)
        return Pass
    } catch (error) {
        console.log("error occured during convert Pass");
    }
}

export let comparePass=async(password,getDbPass)=>{
  try {
    let flag=await bcrypt.compare(password,getDbPass)
    return flag
  } catch (error) {
    console.log(error);
  }
}