import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

const EditDepartment = () => {
    const {id} = useParams();
    const [department,setdepartment] = useState([])
    const Navigate = useNavigate()
const {serverLink} = useAuth()
    useEffect(()=>{
const fetchData = async()=>{
  try{
    const response = await axios.get(`${serverLink}/api/department/${id}`)
    console.log(response)
  
  if(response.data.success){
setdepartment(response.data.department)
  }
  }catch(error){
  if(error.response && !error.response.data.success){
  alert(error.response)
  }

  }
}
fetchData()
},[])
  const handleChange = (e)=>{
const {name,value} = e.target
setdepartment({...department,[name] : value})
  }

   const handleSubmit = async(e)=>{
e.preventDefault();




try{
const response = await axios.put(`${serverLink}/api/department/${id}`,department,
  {headers :{
    "Authorization" : `Bearer ${localStorage.getItem("token")}`
   }}
)



if(response.data.success){
  Navigate("/admin-dashbord/departments")
}

}catch(error){
  
  if(error.response && !error.response.data.success){
  alert(error.response)
  }

}


  }


  return (
 <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6'>Edit Department</h2>
        <form onSubmit={handleSubmit} >
          <div>
            <label
             htmlFor="dep-name"
            className='text-sm font-medium text-gray-700'

            
          >Department</label>

            <input type="text" 
            onChange={handleChange}
            value={department.dep_name || ""}
            name='dep_name'
            placeholder='enter department name'
            className='mt-1 w-full p-2 border brder-gray-300 rounded-md'
            required
            />
          </div>
          <div className='mt-3'>
            <label
             htmlFor="description"
             className='block text-sm font-medium text-gray-700'
            
            >Description</label>
            <textarea 
            name="description" 
            onChange={handleChange}
            value={department.description || ""}
             placeholder='description'
             className='mt-2 p-1 block w-full border border-gray-300 rounded-md'
             rows="4"
             ></textarea>
            <div>
              <button
              type='submit'
              className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
              
              
              >Edit department</button>
            </div>
            
          </div>
        </form>
      </div>
  
  )
}

export default EditDepartment