
const User = require("../models/Users.js")
const bcrypt = require("bcrypt")
//// for employee 
const changePassword = async(req,res)=>{


try{
    const {userId, oldPassword, newPassword} = req.body;

    const user = await User.findById(userId)
    
    if(!user){
        return res.status(404).json({success : false , error : "user not found"})
    }
    const isMatch = await bcrypt.compare(oldPassword,user.password)

    if(!isMatch){
        return res.status(404).json({success : false , error : " wrong old password "})
    }
    const hashpasword = await bcrypt.hash(newPassword,10);

    const newUser  = await User.findByIdAndUpdate({_id: userId},{password : hashpasword})
return res.status(200).json({success:true})
}catch(error){
      console.log("changePassword error:", error);
    return res.status(500).json({success :false, error:"setting error"});
}


}




//// for Admin

const changeAdminPassword = async(req,res)=>{


try{
    const {userId, oldPassword, newPassword} = req.body;

    const user = await User.findById(userId)
    
    if(!user){
        return res.status(404).json({success : false , error : "user not found"})
    }
    const isMatch = await bcrypt.compare(oldPassword,user.password)

    if(!isMatch){
        return res.status(404).json({success : false , error : " wrong old password "})
    }
    const hashpasword = await bcrypt.hash(newPassword,10);

    const newUser  = await User.findByIdAndUpdate({_id: userId},{password : hashpasword})
return res.status(200).json({success:true})
}catch(error){
      console.log("changePassword error:", error);
    return res.status(500).json({success :false, error:"setting error"});
}


}


module.exports = {changePassword,changeAdminPassword}