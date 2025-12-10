const mongoose = require("mongoose")
const {Schema} = require("mongoose")


const WorkersalarySchema = new Schema({
    WorkerId:{type:Schema.Types.ObjectId, ref:"Worker",required:true},
    
    basicSalary :{type:Number ,required :true},
    pf :{type :Number},
    advance:{type:Number},
     others:{type:Number},

   overtime:{type:Number},
   insentive:{type:Number},
    netSalary:{type:Number},
  payDate :{type :Date ,required: true},
    createAt :{type :Date ,default :Date.now},
    updateAt : {type :Date ,default :Date.now}
});

const WorkerSalary = mongoose.model("WorkerSalary",WorkersalarySchema);

module.exports = WorkerSalary;