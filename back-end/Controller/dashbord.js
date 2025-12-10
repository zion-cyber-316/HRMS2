const Department = require("../models/Departments.js");
const Employee = require("../models/Employee.js")
const Leave    = require("../models/Leave.js")

const getSummary = async(req,res)=>{
    try{
const totalEmployees = await Employee.countDocuments();

const totalDepartments = await Department.countDocuments();

const totalSalaries = await Employee.aggregate([
    {$group: {_id: null, totalSalary: {$sum : { $toDouble: "$salary" }}}}
])

const employeeAppliedForLeave = await Leave.distinct('employeeId')


const leaveStatus = await Leave.aggregate([
    {$group: {
        _id : "$status",
        count: {$sum: 1}
    }}
])

const leavSummary = {
    appliedFor: employeeAppliedForLeave.length,
    approved: leaveStatus.find(item => item._id === "Approved")?.count || 0,
    rejected: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
    pending: leaveStatus.find(item => item._id === "Pending")?.count || 0,

}

return res.status(200).json({
    success:true,
    totalEmployees,
    totalDepartments,
    totalSalary: totalSalaries[0].totalSalary || 0,
    leavSummary
})

    }catch(error){
        return res.status(500).json({success : false, error : "dashbord summary Error"})
    }
    

}


module.exports = {getSummary}