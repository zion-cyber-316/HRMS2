import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext'

const DeleteWorkerform = () => {

    const {user,serverLink}= useAuth()
    const userId = user._id;
const id = useParams()
  const navigate = useNavigate()

  const [worker,setWorker] = useState('')




  useEffect(()=>{
    
  const getWorkers = async()=>{
  try{
      const res = await axios.get(`${serverLink}/api/workers/getOne/${id.id}`);

      if(res.data.success){
        
console.log(res.data.findOneWorker)
 setWorker(res.data.findOneWorker)

      }
     




  }catch(error){
    console.log(error)
  }
  }


  getWorkers();


  },[])

    const handleSubmit = async (e)=>{
      e.preventDefault();
     
     
    

        try{
         const res = await axios.post(`${serverLink}/api/workers/delete/${id.id}`,{...worker,userId})
      
        if(res.data.success){
          console.log(res.data.delworker)
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
     <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6 '>Delete Worker</h2>
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
            value={worker.name || ""}
            name = "name" 
            placeholder='Insert Name'
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
             value={worker.fathername || ""}
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
             value={worker.dob ? new Date(worker.dob).toISOString().slice(0, 10) : ""}
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
            value={worker.gender || ""}
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
              value={worker.designation || ""}
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
              value={worker.phonenumber || ""}
            name = "phonenumber" 
            placeholder='phonenumber'
            maxLength={10}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md '
            
            required/> 
          </div>

{/* Date of joining*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Joiningdate
            </label>
            <input 
            type="date"
            onChange={handleChange}
             value={worker.joiningdate ? new Date(worker.joiningdate).toISOString().slice(0, 10) : ""}
            name = "joiningdate" 
            placeholder='joiningdate'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            
            required/> 
          </div>

          {/* Out Date*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Out Date
            </label>
            <input 
            type="date"
            onChange={handleChange}
             
            name = "outdate" 
            placeholder='Outdate'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            
            required/> 
          </div>


 {/* Reason*/}

   <div className='mt-1'>
            <label
             htmlFor="reason"
             className='block text-sm font-medium text-gray-700'
            
            >Reason</label>
            <textarea 
            name="reason" 
            onChange={handleChange}
             placeholder='reason'
             className='mt-2 p-1 block w-full border border-gray-300 rounded-md'
             rows="4"
             ></textarea>
            
            
          </div>
   
      

      



        </div>
        <button className='w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
          Delete Worker

        </button>
      </form>
    </div>
  )
}

export default DeleteWorkerform