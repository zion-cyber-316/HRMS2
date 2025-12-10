import { useNavigate } from "react-router-dom"


export const columns =[

  {
    name : "S no",
    selector :  (row) => row.sno,
     
  },
  {
    name :"Name",
    selector: (row) => row.name,
    sortable: true,
  
  },
   {
    name :"Date Of Birth",
    selector: (row) => row.date,
    sortable: true,
  
  },
 
  {
    name :" Father name",
    selector: (row) => row.fathername,
    sortable: true
  },


  {
    name : "Action",
    selector: (row) => row.action
  }
]



export const DelWorkersButtons = ({_id })=>{
  const navigate = useNavigate()

  return (
<div className="flex space-x-3"> 
  <button className="px-3 py-1 text-white bg-teal-600 rounded"

  onClick={()=> navigate(`/employee-dashbord/delworker/details/${_id}`)}
  
  >Veiw</button>



  
</div>


  )
}