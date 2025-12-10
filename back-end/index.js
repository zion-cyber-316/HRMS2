const express = require("express")
const app = express();
require("dotenv").config();
const database = require("./database/db.js");
const cors = require("cors")
const AuthRouter = require("./Routes/Auth.js")
const Deparment = require("./Routes/departments.js")
const Employee = require("./Routes/employee.js")
const SalaryRouter = require("./Routes/salary.js")
const LeaveRouter = require("./Routes/Leave.js")
const ChangePassword = require("./Routes/setting.js");
const dashbordRouter = require("./Routes/dashbord.js");
const PurchaseRouter = require("./Routes/Purchase.js")
const WorkersRouter = require("./Routes/Workers.js")
const DeleteWorkers = require("./Routes/deleteworkers.js")
const WorkerAttandance = require("./Routes/WorkerAtt.js")
const WorkerSalary = require("./Routes/workerSalary.js")
const Port = process.env.PORT

// conecteing database 
database();

app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'))
app.use("/auth",AuthRouter)
app.use("/api/department",Deparment)
app.use("/api/employee",Employee)
app.use("/api/salary",SalaryRouter)
app.use("/api/leave",LeaveRouter)
app.use("/api/setting",ChangePassword)
app.use("/api/dashbord",dashbordRouter)
app.use("/api/purchase",PurchaseRouter)
app.use("/api/workers",WorkersRouter)
app.use("/api/deleteworkers",DeleteWorkers)
app.use("/api/workerAttendance",WorkerAttandance)
app.use("/api/workersalary",WorkerSalary)




/// conecting server 
app.listen(Port,()=>{
  console.log(`server is listening on port ${Port}`)
})


