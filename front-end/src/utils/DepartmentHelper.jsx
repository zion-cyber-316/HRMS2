import { useNavigate } from "react-router-dom"
import axios from "axios"

export const columns =[

  {
    name : "S no",
    selector :  (row) => row.sno
  },
  {
    name :"Department name",
    selector: (row) => row.dep_name,
    sortable: true
  },
  {
    name : "Action",
    selector: (row) => row.action
  }
]



export const DepartmentButtons = ({_id , onDepartmentDelete})=>{
  const navigate = useNavigate()
//   const handleDelete = async(id)=>{

//  try{
//     const response = await axios.delete(`http://localhost:5000/api/department/${id}`)
//     console.log(response)
  
//   if(response.data.success){
// onDepartmentDelete(id)
//   }
//   }catch(error){
//   if(error.response && !error.response.data.success){
//   alert(error.response)
//   }

//   }

//   }
  return (
<div className="flex space-x-3"> 
  <button className="px-3 py-1 text-white bg-teal-600 rounded"

  onClick={()=> navigate(`/admin-dashbord/department/${_id}`)}
  
  >Edit</button>



  {/* <button className="px-3 py-1 text-white bg-red-600 rounded"
  onClick={()=>handleDelete(_id)}
  
  >Delete</button> */}
</div>


  )
}