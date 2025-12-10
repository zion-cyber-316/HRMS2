const mongoose = require("mongoose")
const {Schema} = require("mongoose")


const employeeSchema = new mongoose.Schema({
    userId:{type:Schema.Types.ObjectId, ref:"User",required:true},
    employeeId :{type:String, required : true, unique :true},
    dob :{type:Date},
    gender:{type:String},
    maritalStatus:{type:String},
    designation:{type:String},
      department:{type:Schema.Types.ObjectId, ref:"Department",required:true},
    salary: {type: String, required : true},
    purchaseaccess:{type:String, required :true},
    
    createAt :{type :Date ,default :Date.now},
    updateAt : {type :Date ,default :Date.now}
});

const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;