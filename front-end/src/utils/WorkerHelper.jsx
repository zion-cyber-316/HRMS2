import { useNavigate } from "react-router-dom"
import axios from "axios"

export const columns =[

  {
    name : "S no",
    selector :  (row) => row.sno,
      width : "40px"
  },
  {
    name :"Name",
    selector: (row) => row.name,
    sortable: true,
    width : "100px"
  },
    {
    name :"EmpID",
    selector: (row) => row.empId,
    sortable: true,
    width : "90px"
  },
    {
    name :"DOB",
    selector: (row) => row.date,
    sortable: true,
    width : "100px"
  },
  {
    name :" Father name",
    selector: (row) => row.fathername,
    sortable: true,
     width : "130px"
  },
  {
    name :"Designation",
    selector: (row) => row.designation,
    sortable: true,
      width : "130px"
  },
  {
    name :"Joining",
    selector: (row) => row.joiningdate,
    sortable: true,
      width : "100px"
  },
  {
    name :"Contact",
    selector: (row) => row.phonenumber,
    sortable: true
  },
  {
    name : "Action",
    selector: (row) => row.action
  }
]



export const WorkersButtons = ({_id })=>{
  const navigate = useNavigate()

  return (
<div className="flex space-x-1"> 
  <button className="px-1 py-1 text-white bg-teal-600 rounded"

  onClick={()=> navigate(`/employee-dashbord/worker/edit/${_id}`)}
  
  >Edit</button>
 <button className="px-1 py-1 text-white bg-yellow-600 rounded"

  onClick={()=> navigate(`/employee-dashbord/view/workersalary/${_id}`)}
  
  >Salary</button>


   <button className="px-1 py-1 text-white bg-red-600 rounded"
  onClick={()=>navigate(`/employee-dashbord/worker/deleteform/${_id}`)}
  
  >Delete</button> 
</div>


  )
}