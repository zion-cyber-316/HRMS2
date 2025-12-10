const Employee = require("../models/Employee");
const Salary = require("../models/Salary")

const addSalary = async(req,res)=>{
try{
    const { employeeId,basicSalary,pf,advance,others,payDate} = req.body;

  

    const totaldeduction = parseInt(pf)+parseInt(others)+parseInt(advance)
    const totalSalary = parseInt(basicSalary)-parseInt(totaldeduction)

    const newSalary = new Salary({
        employeeId,
        basicSalary,
        pf,
        advance,
        others,
        totaldeduction,
        netSalary : totalSalary,
        payDate
    })

    // console.log(newSalary)
await newSalary.save()
  return res.status(200).json({success :true,newSalary})
}catch(error){
return res.status(500).json({success :false,error:"salary add server error"})
}
}




const getSalary = async(req,res)=>{
   try {
    const { id } = req.params;
    let salary
     salary = await Salary.find({ employeeId: id.toString() }).populate("employeeId","employeeId");
    if(!salary || salary.length < 1){
      const employee = await Employee.findOne({userId :id})

           salary = await Salary.find({ employeeId:employee._id }).populate("employeeId","employeeId");
    }

    return res.status(200).json({
      success: true,
      salary
    });
  } catch (error) {
    console.error("Salary fetch error:", error.message);
    return res.status(500).json({
      success: false,
      error: "salary get server error"
    });
  }




//   try{
// const {id} =req.params;
// const salary = await Salary.find({employeeId : id})
// console.log(salary)
// return res.status(200).json({success : true, salary})
//   }catch(error){

//     return res.status(500).json({success :false,error:"salary get server error"})
//   }

}

module.exports={addSalary,getSalary}