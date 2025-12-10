const mongoose = require("mongoose")
const {Schema} = require("mongoose")


const salarySchema = new Schema({
    employeeId:{type:Schema.Types.ObjectId, ref:"Employee",required:true},
    
    basicSalary :{type:Number ,required :true},
    pf :{type :Number},
    advance:{type:Number},
     others:{type:Number},

   totaldeduction:{type:Number},
    netSalary:{type:Number},
  payDate :{type :Date ,required: true},
    createAt :{type :Date ,default :Date.now},
    updateAt : {type :Date ,default :Date.now}
});

const Salary = mongoose.model("Salary",salarySchema);

module.exports = Salary;