import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LeaveButtons } from '../../utils/LeaveHelper'
import DataTable from 'react-data-table-component'
import { columns } from '../../utils/LeaveHelper'
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext'

const Table = () => {
const [leaves,setLeaves]=useState([])
const [filteredLeaves,setFilteredLeaves] = useState([])
const {serverLink} = useAuth()

    const fetchleaves = async()=>{
try{
  const res = await axios.get(`${serverLink}/api/leave`)
  
  console.log(res.data)
  if(res.data.success){
    let sno =1
    const data =await res.data.Leaves.map((leave)=>(
      {
        _id : leave._id,
      sno : sno++,
      employeeId : leave.employeeId.employeeId,
      name : leave.employeeId.userId.name,
      leaveType: leave.leaveType,
      department :leave.employeeId.department.dep_name,
      days:
      new Date(leave.endDate).getDate() -
      new  Date(leave.startDate).getDate(),
      status : leave.status,

      action : (<LeaveButtons Id={leave._id}/>)
      }
    ));
    setLeaves(data)
    setFilteredLeaves(data)
 
    
  }

}catch(error){
    if(error.res && !error.res.data.success){
  alert(error.res)
  }
}

    }



useEffect(()=>{
fetchleaves()
},[])



const filterByInput = (e)=>{
  const data = leaves.filter((leave)=>
  leave.employeeId
.toLowerCase()
.includes(e.target.value.toLowerCase()));
setFilteredLeaves(data)

}

const filterByButton = (status)=>{
  const data = leaves.filter((leave)=>
  leave.status
.toLowerCase()
.includes(status.toLowerCase()));
setFilteredLeaves(data)

}






  return (
    <div className='p-6'>     <div className='text-center'>
            <h3 className='text-2xl font-bold'> Mange Leaves</h3>
        </div>
        <div className='flex justify-between items-center'>
<input onChange={filterByInput} type="text" placeholder='Search dep name ' className='px-4 py-0.5 border' />
<div className='space-x-3'>
<button onClick={()=> filterByButton("Pending")} className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'>Pending</button>
<button onClick={()=> filterByButton("Approved")} className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'>Approved</button>
<button onClick={()=> filterByButton("Rejected")} className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'>Rejected</button>
</div>
        </div>
        
        <div className='mt-3'>
          <DataTable columns={columns} data={filteredLeaves} pagination/>
        </div>
        
        
        </div>
  )
}

export default Table