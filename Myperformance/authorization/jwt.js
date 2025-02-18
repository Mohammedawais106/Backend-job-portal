import jwt from "jsonwebtoken"
export let generateToken=async(email)=>{
 try {
    let token=jwt.sign({email},process.env.SECRETKEY)
    return token;
 } catch (error) {
    console.log("error for genrating token in jwt");
 }
}