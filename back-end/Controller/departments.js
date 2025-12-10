const Deparment =require('../models/Departments.js')



//// add Department

const addDepartment = async(req,res)=>{
   try{
     const{dep_name,description} =req.body;
const newDepartment = new Deparment({
    dep_name,
    description
})
await newDepartment.save();
return res.status(200).json({success :true , department :newDepartment})
   }catch(err){
   return  res.status(500).json({success :false ,error : " add department server eror"})
   }



}




/// get Department 

const getDepartment = async(req,res)=>{
   try{
     const Departments = await Deparment.find();
    return res.status(200).json({success:true,Departments})
   }catch(error){
     return  res.status(500).json({success :false ,error : " get department server eror"})
   }
}


//// edit department 

const geteditDepartment = async(req,res)=>{
   try{
      const {id} = req.params;
      const department = await Deparment.findById({_id : id})
       return res.status(200).json({success:true,department})
   }catch(error){
     return  res.status(500).json({success :false ,error : " get department server eror"})
   }
}



const EditDepartment = async(req,res)=>{
   try{
      const {id} = req.params;
       const{dep_name,description} =req.body;
       const upddepartment = await Deparment.findByIdAndUpdate({_id:id},{dep_name,description})
     
       return res.status(200).json({success:true,upddepartment})
   }catch(error){
     return  res.status(500).json({success :false ,error : " edit department server eror"})
   }
}

//// delete department 
const deleteDepartment = async(req,res)=>{
   try{
      const {id} = req.params;
      const Deletedepartment = await Deparment.findByIdAndDelete({_id : id})
       return res.status(200).json({success:true,Deletedepartment})
   }catch(error){
     return  res.status(500).json({success :false ,error : " Delete department server eror"})
   }
}



module.exports = {
   addDepartment,getDepartment,geteditDepartment,EditDepartment,deleteDepartment
}