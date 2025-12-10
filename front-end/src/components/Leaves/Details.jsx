import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';




const Details = () => {
    const {id} = useParams();
    const [leave,setLeave] = useState(null)
const navigate =useNavigate()
const {serverLink} = useAuth()



    useEffect(()=>{
  const fetchleave = async()=>{
    try{
      const response = await axios.get(`${serverLink}/api/leave/detail/${id}`)
      console.log(response.data.leave)
      if(response.data.success){
        setLeave(response.data.leave)
      }

    }catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response)
      }
    }
  }
  fetchleave()

  
},[id])


const ChangeStatus = async(id ,status)=>{


     try{
      const response = await axios.put(`${serverLink}/api/leave/${id}`,{status})
    
      if(response.data.success){
  navigate('/admin-dashbord/leave')
      }

    }catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response)
      }
    }

}

  return ( 
<>  {leave ? (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
    <h2 className='text-3xl font-bold mb-8 text-center'>
    Leave Detail
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
            <img src={`${serverLink}/${leave.employeeId.userId.profileImage}`}
            className='rounded-full border w-72' />
        </div>
<div>
    <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>Name :</p>
        <p className='font-medium'>{leave.employeeId.userId.name}</p>

    </div>
    <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>Employee ID :</p>
        <p className='font-medium'>{leave.employeeId.employeeId}</p>

    </div>
    <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>Leave Type:</p>
        <p className='font-medium'>{leave.leaveType}</p>

    </div>
    <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'> Reason :</p>
        <p className='font-medium'>{leave.reason}</p>

    </div>
    <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>Department :</p>
        <p className='font-medium'>{leave.employeeId.department.dep_name}</p>

    </div>
    <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>Start Date :</p>
        <p className='font-medium'>{new Date(leave.startDate).toLocaleDateString()}</p>

    </div>
     <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>End Date :</p>
        <p className='font-medium'>{new Date(leave.endDate).toLocaleDateString()}</p>

    </div>



     <div className='flex space-x-3 mb-2'>
        <p className='text-lg font-bold'>
            {leave.status === "Pending" ? "Action" : "Status :"}
        </p>
    
{leave.status === "Pending" ? (
  <div>
    <button className='px-2 py-0.5 bg-green-500 hover:bg-green-700'
    onClick={()=>ChangeStatus(leave._id,"Approved")}
    >Approved</button>
    <button className='px-2 py-0.5 bg-red-500 hover:bg-red-700 ml-2'
     onClick={()=>ChangeStatus(leave._id,"Rejected")}
    >Reject</button>
  </div>
) : (
<p className='font-medium'>{leave.status}</p>
)}



      

    </div>



</div>
</div>

</div>
): <div>Loading</div>}


</>

  )
}

export default Details

