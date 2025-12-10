
const User = require("../models/Users.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();


//// signup controllers

const signup = async(req,res)=>{
const {name,email,password,role}= req.body;
const hashpasword = await bcrypt.hash(password,10)

const newUser = await User.insertOne({name,email,password:hashpasword,role})
console.log(name,email,password,role);

}










const login = async(req,res)=>{

  // res.json(FindUser)
  // console.log(FindUser)


try{
    const {email,password} = req.body;
  const user = await  User.findOne({email})


  if(!user){
    res.status(404).json({success:false, massage :"user not Found"})
  }
const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
  res.status(404).json({success : false , massage : "wrong password"})
}

const token = jwt.sign({_id :user._id , email : user.email},process.env.JWT_KEY,{expiresIn:"10d"}

)


   res.status(200)
   .json({message:"Login successfully ",
    success:true,
    token,
    email,
   user:{name:user.name,email:user.email,role:user.role}
  
  })







}catch(error){
res.status(500)
.json({success:false ,error: error.massage})
}

  
}



//// verify 

const verify = (req,res)=>{

  
  return res.status(200).json({success:true, user:req.user})
}









module.exports = {
  login,
  signup,
  verify
}