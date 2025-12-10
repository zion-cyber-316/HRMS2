const DeleteWorker = require("../models/DeleteWorkers")


/// get deleteworkers 



const getdeleteworkers = async(req,res)=>{

    const workers = await DeleteWorker.find()

    res.status(200).json({success : true ,workers})



}



/// get deleteworkers find by id 


const getworker = async(req,res)=>{
    const {id}= req.params;
    const finddelworker  = await DeleteWorker.findById(id)
      res.status(200).json({success : true ,finddelworker})
}
module.exports = {getdeleteworkers, getworker}