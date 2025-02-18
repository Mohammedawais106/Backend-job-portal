import express from "express"
import nodemailer from "nodemailer"
import { generateToken } from "../authorization/jwt.js"
import { convertHsh, convertPass,comparePass } from "../ecncryption/encryption.js"
import { userRegService, userCheckService, updatePassSer,dbPassService,allObjectService } from "../Services/userService.js"
export let userRegController = async (req, res) => {
  let { name, email, mobilenumber, password } = req.body
  // console.log(Password);
  try {
    let userCheck = await userCheckService(email)
    console.log(userCheck);
    if (!userCheck) {
      let hash = await convertHsh(password)
      console.log(hash);
      let addData = await userRegService({ name, email, mobilenumber, password: hash })
      if (addData == "success") {
        res.json({ message: "Hello Your profile is created successfully" })
        // staring nodemailer below //
      // 1 create transport
      //  let nodemailer=require('nodemailer')
       let transporter = nodemailer.createTransport({
                   secure: true,  
                   host: "smtp.gmail.com",
                   port: 465, 
                   auth: {
                       user: "mohammedawais106@gmail.com", 
                       pass: "kpysjwccyqcyuaga" 
       
                   }
               });
               
               // Function to send an email
               function sendMail(to, subject, msg) {
                   transporter.sendMail(
                    {
                       from: "mohammedawais106@gmail.com", 
                       to: to,
                       subject: subject,
                       html: msg
                   }
                   );
               }
               
               // Call the function to send an email
               sendMail(email, "Officially Tekisky Office",`${name} your profile has been created scessfully`);

     
    //  the above code is send mailer
    
      } else {
        console.log("error occured during create profile");
      }
    } else {
      console.log('user is already exist');
      res.json({message:"user alreayd exist"})
    }
  } catch (error) {
    console.log(error);
  }
}
//  forget passwrod we will use after crypto insh
export let userForgetPass = async (req, res) => {
  let { email, password } = req.body
  try {
    let hashpass = await convertPass(password)
    let updatePass = await updatePassSer(email, { password: hashpass })
    console.log(updatePass);

    if (updatePass) {
      res.json({ message: "Hello User Your profile has been Updated" })
      } else {
      res.json({ message: "Hello Kindly check your Email is Correct" })
    }
  } catch (error) {
    console.log(error);
  }
}

export let userLoginController=async(req,res)=>{
  let {email,password}=req.body
  try {
    let getDbPass=await dbPassService(email)
    console.log("getDbPass",getDbPass);
    let status=await comparePass(password,getDbPass)
    if (status) {
      let token=await generateToken(email);
      console.log(token);
      if (token) {
        res.json({message:"thankyou for login ","your token":token})

      } else {
        res.json({message:"error occured during generate token"})
      }
    } else {
      console.log("please check your password or Email"+error);
      res.json({message:"please check your Password or email"})
    }
  } catch (error) {
  }
}


export let userManyUpdateControll = async (req, res) => {
  try {
    // Extract the array of user objects from req.body
    const users = req.body;
    const [user1, user2, user3] = users;
    const { name: name1, email: email1, mobilenumber: mobilenumber1, password: password1 } = user1;
    const { name: name2, email: email2, mobilenumber: mobilenumber2, password: password2 } = user2;
    const { name: name3, email: email3, mobilenumber: mobilenumber3, password: password3 } = user3;
    let addallObject = await allObjectService(users);
    // Check if the operation was successful
    if (addallObject) {
      console.log("Data inserted successfully",addallObject);
      res.json({message:"hello ok","addallObject":addallObject})
    } else {
      console.log("Error while updating data");
      res.json({message:"error during update data"})
    }
  } catch (error) {
   console.log(error);
   
  }
};



