const Worker = require("../models/Worker");
const WorkerAttendance = require("../models/WorkerAttandance");



const defaulWorkerAtt = async(req,res,next)=>{
    try{
        const date = new Date().toISOString().split("T")[0];
        const existingAttandance = await WorkerAttendance.findOne({date});

        if(!existingAttandance){
            const workers = await Worker.find({});
            const attendance = workers.map(work =>
            ({date, workerId : work._id , status: null}))

            await WorkerAttendance.insertMany(attendance)
        }

next();


    }catch(error){

res.status(500).json({success : false ,error :error})
    }



}

module.exports = {defaulWorkerAtt}