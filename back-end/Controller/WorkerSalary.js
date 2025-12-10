
const WorkerSalary = require("../models/WorkerSalary")

///add worker Salary 

const addworkerSalary = async(req,res)=>{

try{
       const { empId,basicSalary,pf,advance,others,payDate,insentive,overtime} = req.body;

  

    const totaldeduction = parseInt(pf)+parseInt(others)+parseInt(advance)
    const totalSalary = parseInt(basicSalary)-parseInt(totaldeduction)+parseInt(insentive)+parseInt(overtime)

    const newSalary = new WorkerSalary({
       WorkerId: empId,
        basicSalary,
        pf,
        advance,
        others,
        insentive,
        overtime,
        netSalary : totalSalary,
        payDate
    })
await newSalary.save()
  return res.status(200).json({success :true,newSalary})

}catch(error){
    res.status(500).json({success :false , message :" failed to add workersalary" })
}

}

/// find Salary 


const findsalary = async(req,res)=>{
  try{

    const {id} = req.params;

    const salary = await WorkerSalary.find({WorkerId : id})


res.status(200).json({success : true , salary})
  }catch(error){

    res.status(500).json({success : false , message : " failed to find workersalary "})
  }
}


module.exports = {addworkerSalary,findsalary}