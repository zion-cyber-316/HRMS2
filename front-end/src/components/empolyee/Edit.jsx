import React, { useEffect, useState } from 'react'
import axios from "axios"
import { fetchDepartments } from '../../utils/EmployeeHelper'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

const Edit = () => {

const[employee,setEmployee] =useState({
  name : '',
  maritalStatus : '',
  designation : '',
  salary : 0,
  department : ''
})
  const[departments,setdepartments]=useState(null);
  const Navigate = useNavigate()
  const {id} = useParams()
  const {serverLink} = useAuth()

useEffect(() => {
  const getDepartments = async () => {
    const deps = await fetchDepartments(serverLink);
    setdepartments(deps);
  };
  getDepartments();
}, [serverLink]);



  useEffect(()=>{


const fetchEmployee = async()=>{
  try{
    const response = await axios.get(`${serverLink}/api/employee/${id}`)
    
  console.log(response)
  if(response.data.success){
const employee = response.data.Oneemployee
setEmployee((prev)=>({...prev,
  name : employee.userId.name,
  maritalStatus : employee.maritalStatus,
  designation : employee.designation,
  salary : employee.salary,
  department :employee.department,
  purchaseaccess:employee.purchaseaccess

}))

  }
  }catch(error){
  if(error.response && !error.response.data.success){
  alert(error.response)
  }

  }
}

fetchEmployee()

  },[])
  



  const handleChange = (e)=>{
    const {name,value} =e.target

      setEmployee((prevData)=>({...prevData, [name]: value}))
    
  
  }

const handleSubmit = async (e) => {
  e.preventDefault();

 
  try {
    const response = await axios.put(
      `${serverLink}/api/employee/edit/${id}`,
      employee,
     
    );
    

    if (response.data.success) {
      Navigate("/admin-dashbord/employees");
    }
  } catch (error) {
    console.error("❌ Error while adding employee:", error.response?.data);

    // बेहतर error message दिखाओ
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong while adding employee!");
    }
  }
};

  return (

    <>{departments && employee ? (

    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6 '>Edit Employees</h2>
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
            value={employee.name}
            name = "name" 
            placeholder='Insert Name'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/>
          </div>











           {/* Marital Status */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Marital Status
            </label>
          <select 
          name="maritalStatus" 
          value={employee.maritalStatus}
          onChange={handleChange}
          placeholder="Marital Status"
          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
           required>
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="Married">Married</option>
         
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
            value={employee.designation}
            name = "designation" 
            placeholder='Designation'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>



              {/* Salary*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Salary
            </label>
            <input 
            type="Number"
            onChange={handleChange}
            value={employee.salary}
            name = "salary" 
            placeholder='Salary'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>

          
     {/* Department */}
          <div >
            <label className='block text-sm font-medium text-gray-700'>
              Department
            </label>
          <select 
          name="department" 
          onChange={handleChange}
         value={employee.department}
          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
           required>
            <option value="">Select Status</option>
            {departments.map(dep=>(
              <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
            ))}
           
         
          </select>
          </div>
  {/* Purchase option */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Purchase access
            </label>
          <select 
          name="purchaseaccess" 
          onChange={handleChange}
          value={employee.purchaseaccess}
          placeholder="Purchase Access"
          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
           required>
            <option value="">Select Access</option>
            <option value="Allowed">Allowed</option>
            <option value="Not-Allowed">Not-Allowed</option>
         
          </select>
          </div>
           
        </div>
        <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
          Edit Employee

        </button>
      </form>
    </div> ): <div> loading</div>}</>
  )
}

export default Edit