
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../Context/AuthContext';


export const columns =[

  {
    name : "S no",
    selector :  (row) => row.sno,
    width:"60px"
  },
  {
    name :"Name",
    selector: (row) => row.name,
    sortable: true,
    width:"160px"
  },
    {
    name :"Image",
    selector: (row) => row.profileImage,
    sortable: true,
    width:"100px"
  },
    {
    name :"Department",
    selector: (row) => row.dep_name,
    sortable: true,
    width:"120px"
  },
    {
    name :"DOB",
    selector: (row) => row.dob,
    sortable: true,
    width:"160px"
  },
  {
    name : "Action",
    selector: (row) => row.action
  }
]


export const fetchDepartments = async () => {
  try {
    const res = await axios.get(`https://hrms2-back-end.onrender.com/api/department`);
    if (res.data.success) {
      return res.data.Departments;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching departments:", error.response || error);
    return [];
  }
};

//  export const fetchDepartments =async()=>{
//   const {serverLink} = useAuth()
//     let departments
// try{
//   const res = await axios.get(`${serverLink}/api/department`)

//   if(res.data.success){
//     departments = res.data.Departments 
//   }

// }catch(error){
//     if(error.res && !error.res.data.success){
//   alert(error.res)
//   }
// }
// return departments

// }


///////    empoloyees for Salary form 

 export const getEmployees =async(id,)=>{
   
    let employees
try{
  const res = await axios.get(`https://hrms2-back-end.onrender.com/api/employee/department/${id}`)
console.log(res)
  if(res.data.success){
    employees = res.data.employees
  }

}catch(error){
    if(error.res && !error.res.data.success){
  alert(error.res)
  }
}
return employees

}





export const EmployeesButtons = ({Id})=>{
  const Navigate = useNavigate()
 
 return (
<div className="flex space-x-3"> 

  <button className="px-3 py-1 text-white bg-teal-600 rounded"
  onClick={()=>Navigate(`/admin-dashbord/employees/${Id}`)}
  >View</button>




  <button className="px-3 py-1 text-white bg-blue-600 rounded"
 onClick={()=>Navigate(`/admin-dashbord/employees/edit/${Id}`)}
  >Edit</button>




    <button className="px-3 py-1 text-white bg-yellow-600 rounded"
 onClick={()=>Navigate(`/admin-dashbord/employees/salary/${Id}`)}
  >Salary</button>




  <button className="px-3 py-1 text-white bg-red-600 rounded"
   onClick={()=>Navigate(`/admin-dashbord/leave/${Id}`)}
  >Leaves</button>
</div>


  )

  



}
