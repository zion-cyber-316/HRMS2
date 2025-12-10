import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';




const DelworkerDetails = () => {
    const {id} = useParams();
    const [worker,setWorker] = useState(null)
    const {serverLink} = useAuth()




    useEffect(()=>{
  const fetchempData = async()=>{
    try{
      const response = await axios.get(`${serverLink}/api/deleteworkers/details/${id}`)
      
      if(response.data.success){
        console.log(response.data.finddelworker)
        setWorker(response.data.finddelworker)
      }

    }catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response)
      }
    }
  }
  fetchempData()

  
},[id])


  return ( 
<>  {worker ? (
    <div className='max-w-3xl mx-auto mt-3 bg-white p-4 rounded-md shadow-md'>
    <h2 className='text-3xl font-bold mb-4 text-center underline'>
        Delete Worker Detail
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        
<div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Name :</p>
        <p className='font-medium'>{worker.name}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Father Name :</p>
        <p className='font-medium'>{worker.fathername}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>DOB:</p>
        <p className='font-medium'>{new Date(worker.dob).toLocaleDateString()}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Gender :</p>
        <p className='font-medium'>{worker.gender}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Designation :</p>
        <p className='font-medium'>{worker.designation}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Contact Number :</p>
        <p className='font-medium'>{worker.phonenumber}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'> Joining Date :</p>
        <p className='font-medium'>{new Date(worker.joiningdate).toLocaleDateString()}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Leave Date :</p>
        <p className='font-medium'>{new Date(worker.outdate).toLocaleDateString()}</p>

    </div>
     <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Reason For Leave :</p>
        <p className='font-medium'>{worker.reason}</p>

    </div>
</div>
    </div>

</div>
): <div>Loading</div>}


</>

  )
}

export default DelworkerDetails;