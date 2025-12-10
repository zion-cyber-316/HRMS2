const User = require("../models/Users.js")
const Employee = require("../models/Employee.js")
const bcrypt = require("bcrypt")
const multer = require("multer")
const path = require("path");
const { error } = require("console");



/// post employeess 

const storage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,"public/uploads")
    },
    filename :(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname) )
    }
})


const upload = multer({storage:storage})



const addEmployee = async (req,res)=>{

    try{  
    const{
        name,
        email,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
        password,
        role,
        purchaseaccess,
    } = req.body
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({success : false , error :"user already registered  emp"})
    }

    const hashpasword = await bcrypt.hash(password,10)
    const newuser = new User({
     
        name,
        email,
        password : hashpasword,
        role,
        profileImage :req.file ? req.file.filename :" "
    })
    const savedUser = await newuser.save();

    const newEmployee = new Employee({
        userId : savedUser._id,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
         purchaseaccess,
       

    })
   
    await newEmployee.save()
    return res.status(200).json({success : true,  message :"employee created " })
}catch(error){
  console.error("Error while adding employee:", error);
  return res.status(500).json({
    success: false,
    message: "server error in adding employee",
    error: error.message, // extra info
  });
}
}


//// get empolyees 

const getEmployees = async (req,res)=>{
     try{
     const Employees = await Employee.find().populate('userId',{password :0}).populate('department');
    return res.status(200).json({success:true,Employees})
   }catch(error){
     return  res.status(500).json({success :false ,error : " get employees server eror"})
   }
}


const getEmployee = async (req,res)=>{
    const {id} = req.params;
     try{
      let Oneemployee;
      Oneemployee = await Employee.findById(id).populate('userId',{password :0}).populate('department');
      if(!Oneemployee){
  Oneemployee = await Employee.findOne({userId :id}).populate('userId',{password :0}).populate('department');


      }
     console.log(Oneemployee)
    return res.status(200).json({success:true,Oneemployee})
   }catch(error){
     return  res.status(500).json({success :false ,error : " get employees server eror"})
   }
}



/// update route 

const updateEmployee = async (req,res)=>{
try{
    const {id} = req.params;
    const{name,maritalStatus,designation,salary,department,purchaseaccess} = req.body;

    const employee = await Employee.findById(id)
    if(!employee){
        return res.status(404).json({success : false ,error:"employee  not found"})
    }


       const user = await User.findById({_id :employee.userId})
    if(!user){
        return res.status(404).json({success : false ,error:"user not found"})
    }

    const updateuser = await User.findByIdAndUpdate({_id :employee.userId},{name})

    const updateEmployee = await Employee.findByIdAndUpdate({_id : id},{maritalStatus,designation,department,salary,purchaseaccess})

    if(!updateEmployee || !updateuser){
                return res.status(404).json({success : false ,error:"document not found"})
    }

  return res.status(200).json({success : true , message:" emplpyee updated"})
}catch(error){
    return res.status(500).json({success :false ,error :"update emplyoee server "})
}
}



/// fetchemployee 

const fetchEmployeeByDepId = async(req,res)=>{
  const {id} = req.params;
     try{
     const employees = await Employee.find({department:id}).populate('userId',{password :0}).populate('department');
     console.log(employees)
    return res.status(200).json({success:true,employees})
   }catch(error){
     return  res.status(500).json({success :false ,error : " get employeeById  server eror"})
   }


}



/// fetch emoloyee by userId
const fetchEmployeeByuserId = async(req,res)=>{
  const {id} = req.params;
     try{
     const employees = await Employee.findOne({userId:id})
     console.log(employees)
    return res.status(200).json({success:true,employees})
   }catch(error){
     return  res.status(500).json({success :false ,error : " get employeeById  server eror"})
   }


}


module.exports = {addEmployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeeByDepId,fetchEmployeeByuserId}