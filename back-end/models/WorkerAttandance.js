

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const workerAttendanceSchema = new Schema({
  workerId: {
    type: Schema.Types.ObjectId,
    ref: "Worker",
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Absent", "Present", "Sick", "Leave","Not Marked"],
    default: "Not Marked"
  },
   overtime: {
    type: Number,
   
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const WorkerAttendance = mongoose.model("WorkerAttendance", workerAttendanceSchema);
module.exports = WorkerAttendance;




































// const mongoose = require("mongoose")
// const {Schema} = require("mongoose")


// const workerAttendanceSchema = new Schema({
//     workerId:{type:Schema.Types.ObjectId, ref:"Worker",required:true},
    
//     date :{
//         type:String,
//         required : false
//     },

//     status:{
//         type:String,
//         enum:["Absent","Present","Sick","Leave"],
//         required : true
//     },
  
  
//     createAt :{type :Date ,default :Date.now},
//     updateAt : {type :Date ,default :Date.now}
// });

// const WorkerAttendance = mongoose.model("workerAttendance",workerAttendanceSchema);

// module.exports = WorkerAttendance;