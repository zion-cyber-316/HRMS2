const mongoose = require("mongoose")
const {Schema} = require("mongoose")


const deleteworkerSchema = new Schema({
    employeeId:{type:Schema.Types.ObjectId, ref:"Employee",required:true},
    
    name :{type:String ,required :true},
    fathername :{type :String},
      dob:{type :Date },
    gender:{type:String},
     designation:{type:String},
     phonenumber:{type:String},
     joiningdate:{type:Date},
     outdate:{type:Date},
     reason:{type:String},

  
    createAt :{type :Date ,default :Date.now},
    updateAt : {type :Date ,default :Date.now}
});

const DeleteWorker = mongoose.model("DeleteWorker",deleteworkerSchema);

module.exports = DeleteWorker;