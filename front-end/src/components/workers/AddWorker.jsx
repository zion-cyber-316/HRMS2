import React, { useEffect, useState } from 'react'
import axios from "axios"

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

const AddWorker = () => {
    const {user,serverLink} = useAuth();
  const userId = user._id
  const navigate = useNavigate()

  const [worker,setWorker] = useState([])
  const [length,setLength] = useState('')

useEffect(()=>{
  

  const getWorkers = async()=>{
  try{
      const res = await axios.get(`${serverLink}/api/workers/get/${user._id}`);
    setLength(res.data.findworkers.length)
  }catch(error){
    console.log(error)
  }
  }


  getWorkers();
  
},[])
  

    const handleSubmit = async (e)=>{
      e.preventDefault();
      
     console.log(worker)
    

        try{
          const res = await axios.post(`${serverLink}/api/workers/add`,{...worker,userId})
        console.log(res)
        if(res.data.success){
          navigate("/employee-dashbord/workers")
        }
      }catch(error){
        console.log(error)
      }


    
    }
      

    const handleChange = (e)=>{
      const {name,value} = e.target;
setWorker((prevState)=>({...prevState,[name]:value}))
        
    }
  
  return (

    <> <h3 className='text-center underline'>{`Total Workers = ${length}`}</h3>
     <div className='max-w-4xl mx-auto mt-2 bg-white p-8 rounded-md shadow-md'>
      
      <h2 className='text-2xl font-bold mb-6 '>Add New Worker</h2>
     
      <form onSubmit={handleSubmit} >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

          {/* Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input 
            type="text"
            onChange={handleChange}
            name = "name" 
            placeholder='Insert Name'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/>
          </div>
{/* empId */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              EmpId
            </label>
            <input 
            type="text"
            onChange={handleChange}
            name = "empId" 
            placeholder='Insert EmpId'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/>
          </div>



         {/* Father Name  */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Father Name
            </label>
            <input 
            type="text"
            onChange={handleChange}
            name = "fathername" 
            placeholder='Insert Fathername'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>




          
 {/* Date of Birth*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Date of Birth
            </label>
            <input 
            type="date"
            onChange={handleChange}
            name = "dob" 
            placeholder='DOB'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>

 {/* Gender */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Gender
            </label>
          <select 
          name="gender" 
          onChange={handleChange}
          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
           required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">other</option>
          </select>
          </div>




           {/* Designation*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Designation
            </label>
            <input 
            type="text"
            onChange={handleChange}
            name = "designation" 
            placeholder='Designation'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>

{/* Mobile */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Mobile Number
            </label>
            <input 
            type="text"
            onChange={handleChange}
            name = "phonenumber" 
            placeholder='phonenumber'
            maxLength={10}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md '
            required/> 
          </div>

 {/* Date of joining*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Joining Date
            </label>
            <input 
            type="date"
            onChange={handleChange}
            name = "joiningdate" 
            placeholder='joiningdate'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>
   
      

      



        </div>
        <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
          Add Worker

        </button>
      </form>
    </div></>
    
  )
}

export default AddWorker;