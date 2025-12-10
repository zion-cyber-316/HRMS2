import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext'

const Addepartment = () => {
  const [department,setdepartment]=useState({
    dep_name : " ",
    description :" "
  })
const Navigate = useNavigate()
const {serverLink} = useAuth()


  const handleChange = (e)=>{
const {name,value} = e.target
setdepartment({...department,[name] : value})
  }




  const handleSubmit = async(e)=>{
e.preventDefault();




try{
const response = await axios.post(`${serverLink}/api/department/add`,department,
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
        <h2 className='text-2xl font-bold mb-6'>Add Department</h2>
        <form onSubmit={handleSubmit} >
          <div>
            <label
             htmlFor="dep-name"
            className='text-sm font-medium text-gray-700'

            
          >Department</label>

            <input type="text" 
            onChange={handleChange}
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
             placeholder='description'
             className='mt-2 p-1 block w-full border border-gray-300 rounded-md'
             rows="4"
             ></textarea>
            <div>
              <button
              type='submit'
              className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
              
              
              >Add department</button>
            </div>
            
          </div>
        </form>
      </div>
  
  )
}

export default Addepartment