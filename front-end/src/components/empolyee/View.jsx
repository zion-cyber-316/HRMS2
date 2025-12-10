import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';




const View = () => {
    const {id} = useParams();
    const [employee,setEmployee] = useState(null)
    const {serverLink} = useAuth()




    useEffect(()=>{
  const fetchempData = async()=>{
    try{
      const response = await axios.get(`${serverLink}/api/employee/${id}`)
      
      if(response.data.success){
        setEmployee(response.data.Oneemployee)
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
<>  {employee ? (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
    <h2 className='text-3xl font-bold mb-8 text-center'>
        Employee Detail
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
            <img src={`${serverLink}/${employee.userId.profileImage}`}
            className='rounded-full border w-72' />
        </div>
<div>
    <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Name :</p>
        <p className='font-medium'>{employee.userId.name}</p>

    </div>
    <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Employee ID :</p>
        <p className='font-medium'>{employee.employeeId}</p>

    </div>
    <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>DOB:</p>
        <p className='font-medium'>{new Date(employee.dob).toLocaleDateString()}</p>

    </div>
    <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Gender :</p>
        <p className='font-medium'>{employee.gender}</p>

    </div>
    <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Department :</p>
        <p className='font-medium'>{employee.department.dep_name}</p>

    </div>
    <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Marital Status :</p>
        <p className='font-medium'>{employee.maritalStatus}</p>

    </div>
     <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Purchase Access :</p>
        <p className='font-medium'>{employee.purchaseaccess}</p>

    </div>
</div>
    </div>

</div>
): <div>Loading</div>}


</>

  )
}

export default View


