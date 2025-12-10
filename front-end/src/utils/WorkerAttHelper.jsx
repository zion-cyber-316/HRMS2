import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"



export const columns =[

  {
    name : "S no",
    selector :  (row) => row.sno,
      width : "70px"
  },
  {
    name :"Name",
    selector: (row) => row.name,
    sortable: true,
    width : "120px"
  },
   
  {
    name :" Father name",
    selector: (row) => row.fathername,
     width : "150px",
    sortable: true
  },
  {
    name :"Designation",
    selector: (row) => row.designation,
     width : "150px",
    sortable: true
  },
 
 
  {
    name : "Action",
    selector: (row) => row.action
  },
   {
    name : "Over-Time",
    selector: (row) => row.OverTime,
    with: "150px"
  }
]





export const WorkerAttButtons = ({status,id,statusChange})=>{
  const markworker = async(status,id)=>{

 
const res = await axios.put(`https://hrms2-back-end.onrender.com/api/workerAttendance/update/${id}`,{status})

if(res.data.success){
  statusChange()
}

  }
    return(
       <div>
 {status == null ? (

<div className="flex space-x-2">
<button 
className="px-4 py-2 bg-green-500 text-white"
onClick={()=> markworker("Present",id)}>
  
Present

</button>
<button 
className="px-4 py-2 bg-red-500 text-white"
onClick={()=> markworker("Absent",id)}>
Absent

</button>
{/* <button 
className="px-4 py-2 bg-gray-500 text-white"
onClick={()=> markworker("Sick",id)}>
Sick

</button>
<button 
className="px-4 py-2 bg-yellow-500 text-white"
onClick={()=> markworker("Leave",id)}>
Leave

</button> */}


</div>


        ):(
            <p className="bg-gray-100 w-20 text-center py-2 rounded">{status}</p>
        ) }


       </div>
    )
 
}






export const OverTime = ({id,OT,statusChange}) => {
  const [overtime, setOvertime] = useState("");
   

  const handleChange = (e) => {
    setOvertime(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
     const OtUpdate = async()=>{

    try{
      const res = await  axios.put(`https://hrms2-back-end.onrender.com/api/workerAttendance/updateOT/${id}`,{overtime})
if(res.data.success){
  statusChange()
  console.log(OT)


}
    }catch(error){
      console.log(error)
    }
  }
  OtUpdate()
  };
// useEffect(()=>{
//   console.log(OT)

// },[])



  return (
    <>

    {OT == null ? (<form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="Number"
          value={overtime}
          placeholder="Insert OT"
          className="border w-20 px-2 py-1"
          required
        />
        <button
          type="submit"
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>):( <p className="bg-gray-100 w-20 text-center py-2 rounded">{`${OT} Hours`}</p>)}
      
    </>
  );
};

