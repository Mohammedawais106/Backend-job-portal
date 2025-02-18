import jobModel from "../Model/jobModel.js"
import { jobregisterService,jobgetService,jobUpdateServeice,jobdeleteService
    ,jobstatService} from "../Services/jobService.js"
export let jobregisterController=async(req,res)=>{
    try {
        let {company, position }=req.body
        let insertData= await jobregisterService(company, position)
        if (insertData="success") {
            res.json({message:"hello your data is inserterd successfully"})
        } else {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}




export let jobgetController=async(req,res)=>{
 
    // let {id}=req.params
    try {
        let {status,workType,search,sort,skip}=req.query
    let queryObject={
        createdBy: req.user
    }

    if (status && status !=='all') {
        queryObject.status=status
    }
    if (workType && workType !=='all') {
        queryObject.workType=workType
    }
    if (search) {
        queryObject.position={$regex:search,$options:"i"}
    }
    let queryResult=await jobModel.find(queryObject)
    //  sorting
    if (sort==="latest") {
        queryResult=queryResult.sort("-createdAt")
    }
    if (sort==="oldest") {
        queryResult=queryResult.sort("-createdAt")
    }
    if (sort==="a-z") {
        queryResult=queryResult.sort("position")
    }
    if(sort=== "A-Z") {
        queryResult=queryResult.sort("-position")
    }

    //pagination
    let  page= Number(req.query.page)|| 1
    let limit = Number(req.query.limit)|| 10
    let skipt= (page-1)*limit
    queryResult=queryResult.skip(skip).limit(limit)
    let  totaljobs= await jobModel.countDocuments(queryResult)
    let numOfPage=Math.ceil(totaljobs/limit)
    let jobs= await queryResult
    console.log("mine=chech",jobs);
    // res.json({jobs})
    res.json({totaljobs: jobs.length,jobs,numOfPage})
    } catch (error) {
        console.log(error);
        
    }
//     let getData= await jobgetService()
//     if (getData) {
//        res.json({message:"data get done ","getData":getData}) 
//        console.log(getData);
//     } else {
//         console.log(error);
//     }
//  } catch (error) {
//     console.log(error);
    
 }
 


export let jobupdateController=async(req,res)=>{
    let {id}=req.params
    let {company,position}=req.body
    try {
        let newData= await jobUpdateServeice(id,company,position)
        if (newData) {
          res.json({message:"hello your data is update success"})  
        } else {
            
        }
    } catch (error) {
        
    }
}

export let jobdeleteController=async(req,res)=>{
 try {
    let {id}=req.params
    let deleteData=await jobdeleteService(id)
    if (deleteData) {
        res.json({message:"deleted success"})
    }
 } catch (error) {
    console.log("error");
 }
}

export let statController = async (req, res) => {
    try {
        let { id } = req.params;
        let stat = await jobstatService(id);  // If you need to use 'id' in this service, pass it to the function
        if (stat) {
            console.log(stat)
            res.json({totaljob:stat.length,stat });
        } else {
            res.status(404).json({ message: "No stats found." });
        }
    } catch (error) {
        console.error(error); // Proper error handling
        res.status(500).json({ message: "Server Error" });
    }
}
