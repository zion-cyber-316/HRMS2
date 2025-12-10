const Employee = require("../models/Employee");
const Leave = require("../models/Leave");


const addLeave = async(req,res)=>{
try{
    const { userId,leaveType,startDate,endDate,reason} = req.body;
const employee = await Employee.findOne({ userId})
console.log(employee)


const newLeave =  new Leave({
employeeId : employee._id, leaveType, startDate, endDate, reason
})
 await newLeave.save()


  return res.status(200).json({success :true})
}catch(error){
return res.status(500).json({success :false,error:"Leave add server error"})
}


}






/// for employee dashbord

const getLeaves = async(req,res)=>{

  try{
const {id} = req.params;
const employee = await Employee.findOne({userId:id})

const leaves = await Leave.find({employeeId : employee._id})
return res.status(200).json({success : true ,leaves})

  }catch(error){
return res.status(500).json({success :false,error:"Leave add server error"})
}

}




//// get leave for admin panal 
const getadminLeaves = async(req,res)=>{


  try{
const {id} = req.params;

console.log(id)


const leaves = await Leave.find({employeeId:id})

console.log(leaves)
return res.status(200).json({success : true ,leaves})

  }catch(error){
return res.status(500).json({success :false,error:"Leave add server error"})
}

}









/// all leave for admin dashbord

const getLeave = async(req,res)=>{

  try{
    const Leaves = await Leave.find().populate({
      path : 'employeeId',
      populate:[
        {
          path : 'department',
          select : 'dep_name'
        },
        {
           path : 'userId',
          select : 'name'

        }
      ]
    })

return res.status(200).json({success : true ,Leaves})

  }catch(error){
return res.status(500).json({success :false,error:"Leave add server error"})
}


}




const getLeaveDetail = async(req,res)=>{
  try{
    const {id} = req.params;
    const leave = await Leave.findById({_id :id}).populate({
      path : 'employeeId',
      populate:[
        {
          path : 'department',
          select : 'dep_name'
        },
        {
           path : 'userId',
          select : 'name , profileImage'

        }
      ]
    })

return res.status(200).json({success : true ,leave})

  }catch(error){
return res.status(500).json({success :false,error:"Leave add server error"})
}



}



const updateLeave = async(req,res)=>{
  try{
const {id} = req.params;
const leave = await Leave .findByIdAndUpdate({_id: id},{status : req.body.status});
if(!leave){
  return res.status(404).json({success:false ,error : "leave not found"})
}
return res.status(200).json({success:true})


  }catch(error){

    return res.status(200).json({success:false,error:"leave update server error"})



  }


}

module.exports = {addLeave,getLeaves,getLeave,getLeaveDetail,updateLeave,getadminLeaves}