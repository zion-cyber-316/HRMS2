import React, { useEffect, useState } from 'react'
import axios from "axios"
import { fetchDepartments } from '../../utils/EmployeeHelper'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

const Add = () => {

  const[departments,setdepartments]=useState([]);
  const [formData ,setformData] = useState({})
  const Navigate = useNavigate()
  const {serverLink} = useAuth()


  useEffect(()=>{

const getDepartments = async ()=>{
  const departments = await fetchDepartments()
setdepartments(departments)
}
getDepartments()

  },[])

  const handleChange = (e)=>{
    const {name,value,files} =e.target
    if(name == "image"){
setformData((prevData)=>({...prevData, [name]: files[0]}))
    }else{
      setformData((prevData)=>({...prevData, [name]: value}))
    }
    // console.log(formData)
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataobj = new FormData();
  Object.keys(formData).forEach((key) => {
    formDataobj.append(key, formData[key]);
  });

  console.log(formData)

  try {
    const response = await axios.post(
      `${serverLink}/api/employee/add`,
      formDataobj,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6 '>Add New Employees</h2>
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



         {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input 
            type="email"
            onChange={handleChange}
            name = "email" 
            placeholder='Insert Email'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>


 {/* Employees */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Employee ID
            </label>
            <input 
            type="text"
            onChange={handleChange}
            name = "employeeId" 
            placeholder='Employee ID'
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


           {/* Marital Status */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Marital Status
            </label>
          <select 
          name="maritalStatus" 
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
            name = "designation" 
            placeholder='Designation'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>


     {/* Department */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Department
            </label>
          <select 
          name="department" 
          onChange={handleChange}
         
          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
           required>
            <option value="">Select Status</option>
            {departments.map(dep=>(
              <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
            ))}
           
         
          </select>
          </div>

              {/* Salary*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Salary
            </label>
            <input 
            type="Number"
            onChange={handleChange}
            name = "salary" 
            placeholder='Salary'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>

              {/* Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password 
            </label>
            <input 
            type="password"
            onChange={handleChange}
            name = "password" 
            placeholder='*********'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>


          {/* Role */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Role
            </label>
          <select 
          name="role" 
          onChange={handleChange}
          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
           required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="Employee">Employee</option>
         
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
          placeholder="Purchase Access"
          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
           required>
            <option value="">Select Access</option>
            <option value="Allowed">Allowed</option>
            <option value="Not-Allowed">Not-Allowed</option>
         
          </select>
          </div>

           {/* Image Upload */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Upload Image 
            </label>
            <input 
            type="file"
            onChange={handleChange}
            name = "image" 
            placeholder='upload Image'
            accept='image/*'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            /> 
          </div>

        </div>
        <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
          Add Employee

        </button>
      </form>
    </div>
  )
}

export default Add