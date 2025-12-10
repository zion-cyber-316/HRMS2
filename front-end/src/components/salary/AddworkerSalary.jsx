import React from 'react'
import { useState,useEffect } from 'react'
import { useAuth } from '../../Context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddworkerSalary = () => {
const [salary,setSalary] = useState({})
const [worker,setWorker]= useState([])
const {user,serverLink} = useAuth()

const Navigate = useNavigate()

 const handleChange = (e)=>{
    const {name,value} =e.target

      setSalary((prevData)=>({...prevData, [name]: value}))
    
  
  }

  useEffect(()=>{
  

  const getWorkers = async()=>{
  try{
      const res = await axios.get(`${serverLink}/api/workers/get/${user._id}`);
    setWorker(res.data.findworkers)
  }catch(error){
    console.log(error)
  }
  }


  getWorkers();
  
},[])
  




const handleSubmit = async (e) => {
  e.preventDefault();

  // console.log(salary)

 
  try {
    const response = await axios.post(
      `${serverLink}/api/workersalary/add`,
      salary,
     
    );

    console.log(response)

    if (response.data.success) {
      Navigate("/employee-dashbord/workers");
    }
  } catch (error) {
    
  }
};







  return (

    
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6 '> Add worker Salary</h2>
      <form onSubmit={handleSubmit} >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

          
 {/* Employee  */}

          <div >
            <label className='block text-sm font-medium text-gray-700'>
            Employee Id
            </label>
          <select 
          name="empId" 
          onChange={handleChange}
       
          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
           required>
            <option value="">Select Employee</option>
            {worker.map(emp=>(
              <option key={emp._id} value={emp._id}>{emp.empId}</option>
            ))}
           
          </select>
          </div>

           {/*  Basic Salary */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
            Basic Salary 
            </label>
            <input 
            type="number"
            onChange={handleChange}
          
            name = "basicSalary" 
            placeholder='Basic Salary'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>



              {/*PF*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
             PF
            </label>
            <input 
            type="number"
            onChange={handleChange}
       
            name = "pf" 
            placeholder='PF'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>


                {/*Advance */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
             Advance
            </label>
            <input 
            type="number"
            onChange={handleChange}
       
            name = "advance" 
            placeholder='Advance'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>   
          
          
             {/* Others*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
             Others
            </label>
            <input 
            type="number"
            onChange={handleChange}
       
            name = "others" 
            placeholder='others'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>
              {/* overtime*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
             Over-Time
            </label>
            <input 
            type="number"
            onChange={handleChange}
       
            name = "overtime" 
            placeholder='overtime'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>
              {/*Insentive*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
             Insentive
            </label>
            <input 
            type="number"
            onChange={handleChange}
       
            name = "insentive" 
            placeholder='insentive'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>
             

                   {/*Pay Dates */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
         Pay Dates 
            </label>
            <input 
            type="date"
            onChange={handleChange}
       
            name = "payDate" 
            
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>
           
        </div>
        <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
          Add Salary

        </button>
      </form>
    </div>
  )
}

export default AddworkerSalary