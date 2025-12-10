const mongoose = require("mongoose")
const {Schema} = require("mongoose")


const workerSchema = new Schema({
    employeeId:{type:Schema.Types.ObjectId, ref:"Employee",required:true},
    empId :{type:String, required:true ,unique :true},
    
    name :{type:String ,required :true},
    fathername :{type :String},
      dob:{type :Date },
    gender:{type:String},
     designation:{type:String},
     phonenumber:{type:String},
     joiningdate:{type:Date},

  
    createAt :{type :Date ,default :Date.now},
    updateAt : {type :Date ,default :Date.now}
});

const Worker = mongoose.model("Worker",workerSchema);

module.exports = Worker;