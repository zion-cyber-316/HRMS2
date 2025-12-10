



/// add workers 

const Employee = require("../models/Employee");
const Worker = require("../models/Worker.js");
const DeleteWorker = require("../models/DeleteWorkers.js")

const addWorkers = async(req,res)=>{
   


    try{
    const{name,fathername,dob,designation,phonenumber,gender,joiningdate,userId,empId}=req.body;
    
const employee = await Employee.findOne({ userId})



const newWorker =  new Worker({
employeeId : employee._id, name,fathername,dob,designation,phonenumber,gender,joiningdate,empId
})
 await newWorker.save()




  return res.status(200).json({success :true,message:"worker add successfully ", newWorker})
}catch(error){
return res.status(500).json({success :false,error:"worker add server error"})
}



    
}




/// get workers 

const getworkers = async(req,res)=>{
 try{
   const {id} = req.params;
 const employee = await Employee.find({userId : id});
  const  empId = employee[0]._id;

 

  const findworkers = await Worker.find({employeeId:empId})

  res.status(200).json({success : true , findworkers})
 }catch(error){
  res.status(500).json({success : false , mesg : "find workrs is failed server Error  "})
 }
 
}



/// get one worker 

const getOneworker = async(req,res)=>{
  try{
    const {id}= req.params;

    const findOneWorker = await Worker.findById(id);

    res.status(200).json({success:true , findOneWorker})




  }catch(errorr){
    res.status(500).json({success : false , errorr: "server error findone worker "})
  }

  
}




/// update worker 

 const editworker = async(req,res)=>{
 try{
   const {id}= req.params;
  const{name,fathername,dob,designation,phonenumber,gender,joiningdate,empId}=req.body;

const updworker = await Worker.findByIdAndUpdate({_id:id},{name,empId,fathername,dob,designation,phonenumber,gender,joiningdate})
  
res.status(200).json({success: true,updworker})
 }catch(error){
  res.status(500).json({success: false ,error : " field worker update"})
 }

 }

/// delete worker 

const deleteWorker = async(req,res)=>{


 const {id}= req.params;
  const{name,fathername,dob,designation,phonenumber,gender,joiningdate,outdate,reason,userId}=req.body;

  console.log(id)
console.log(name,fathername,dob,designation,phonenumber,gender,joiningdate,outdate,reason,userId)

const employee = await Employee.findOne({ userId})



const delworker = new  DeleteWorker({ employeeId:employee._id,name,fathername,dob,designation,phonenumber,gender,joiningdate,outdate,reason})

await delworker.save()
const deleteworker = await Worker.findByIdAndDelete(id)


res.status(200).json({success: true , msg : " worker delete",delworker})
}











module.exports = {addWorkers,getworkers,editworker,getOneworker,deleteWorker}