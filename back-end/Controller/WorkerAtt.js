const WorkerAttendance = require("../models/WorkerAttandance");


////  get attendance 
const getAttandance = async(req,res)=>{
try{
 const date = new Date().toISOString().split("T")[0];
 const attendance = await WorkerAttendance.find({date}).populate("workerId")

 res.status(200).json({success :true ,attendance})


}catch(error){

 res.status(500).json({success :false , error : error})

}

}


// update Attendance 

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params; // workerId
    const { status } = req.body;
    const date = new Date().toISOString().split("T")[0];

    const attendance = await WorkerAttendance.findOneAndUpdate(
      { workerId: id, date },
      { status },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      attendance
    });

  } catch (error) {
    console.log("Error in updateAttendance:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// updateOT 

const Otupdate = async(req,res)=>{
 try {
    const { id } = req.params; // workerId
    const { overtime } = req.body;
    const date = new Date().toISOString().split("T")[0];

    const attendance = await WorkerAttendance.findOneAndUpdate(
      { workerId: id, date },
      { overtime },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
    
    });

  } catch (error) {
    console.log("Error in updateAttendance:", error);
    res.status(500).json({ success: false, msg: error.message });
  }

}



///get atttendence 

const getworker = async(req,res)=>{

  try {
    const { id } = req.params; // workerId
    
    const date = new Date().toISOString().split("T")[0];

    const worker = await WorkerAttendance.find(
      {  date },
    
    );

    res.status(200).json({
      success: true,
      worker
    });

  } catch (error) {
    console.log("Error in updateAttendance:", error);
    res.status(500).json({ success: false, msg: error.message });
  }



}


///attendanceReport Day Ways 


const attendanceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;
    const query = {};

    if (date) {
      query.date = date;
    }

    const attendanceData = await WorkerAttendance.find(query)
      .populate("workerId")
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

   const groupData = attendanceData.reduce((result, record) => {
  const dateKey = new Date(record.date).toISOString().split("T")[0];

  if (!result[dateKey]) {
    result[dateKey] = [];
  }

  result[dateKey].push({
    name: record.workerId?.name,
    fathername: record.workerId?.fathername,
    designation: record.workerId?.designation,
    overtime: record.overtime,
    status: record.status || "Not Marked"
  });

  return result;
}, {});

    return res.status(200).json({ success: true, groupData });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};






//// monthly attendance reports 


const monthlyAttendanceSummary = async (req, res) => {
  try {
    const { month } = req.query; // Ex: "2025-12"
    if (!month) {
      return res.status(400).json({ success: false, message: "Month is required (YYYY-MM)" });
    }

    const matchMonth = new RegExp(`^${month}`); // Match dates starting with that month

    const result = await WorkerAttendance.aggregate([
      {
        $match: {
          date: matchMonth  // date format should be "YYYY-MM-DD" string
        }
      },
      {
        $lookup: {
          from: "workers",
          localField: "workerId",
          foreignField: "_id",
          as: "worker"
        }
      },
      { $unwind: "$worker" },
      {
        $group: {
          _id: "$workerId",
          name: { $first: "$worker.name" },
           fathername: { $first: "$worker.fathername" },
            designation: { $first: "$worker.designation" },
          empId: { $first: "$worker.empId" },
          totalPresent: {
            $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] }
          },
          totalAbsent: {
            $sum: { $cond: [{ $eq: ["$status", "Absent"] }, 1, 0] }
          },
          totalOvertime: { $sum: "$overtime" }
        }
      },
      { $sort: { name: 1 } } // sort alphabetically
    ]);

    res.status(200).json({ success: true, data: result });

  } catch (err) {
    console.error("Monthly Report Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getAttandance,updateAttendance,Otupdate,getworker,attendanceReport,monthlyAttendanceSummary}