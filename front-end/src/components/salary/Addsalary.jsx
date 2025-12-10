import React, { useEffect, useState } from 'react'
import axios from "axios"
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

const Addsalary = () => {
  

const[salary,setSalary] =useState({
  employeeId : null,
  basicSalary : 0,
  allowances : 0,
  deductions : 0,
  payDate : null
})
  const[departments,setdepartments]=useState([]);
  const [employees,setEmployees] = useState([ ])
  const Navigate = useNavigate()

  const {serverLink} = useAuth()





  useEffect(()=>{

const getDepartments = async ()=>{
  const departments = await fetchDepartments()
setdepartments(departments)
}
getDepartments()

  },[])


const handleDepartment =async (e)=>{
  const emps = await getEmployees(e.target.value)
  setEmployees(emps)

}





 



  const handleChange = (e)=>{
    const {name,value} =e.target

      setSalary((prevData)=>({...prevData, [name]: value}))
    
  
  }





const handleSubmit = async (e) => {
  e.preventDefault();

  // console.log(salary)

 
  try {
    const response = await axios.post(
      `${serverLink}/api/salary/add`,
      salary,
     
    );

    console.log(response)

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

    <>{departments ? (

    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6 '> Add Salary</h2>
      <form onSubmit={handleSubmit} >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

           {/* Department */}
          <div >
            <label className='block text-sm font-medium text-gray-700'>
              Department
            </label>
          <select 
          name="department" 
          onChange={handleDepartment}
      
          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
           required>
            <option value="">Select department</option>
            {departments.map(dep=>(
              <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
            ))}
           
         
          </select>
          </div>





 {/* Employee  */}

          <div >
            <label className='block text-sm font-medium text-gray-700'>
            Employee Id
            </label>
          <select 
          name="employeeId" 
          onChange={handleChange}
       
          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
           required>
            <option value="">Select Employee</option>
            {employees.map(emp=>(
              <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
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



                   {/* Deductions
          <div>
            <label className='block text-sm font-medium text-gray-700'>
           Deductions
            </label>
            <input 
            type="number"
            onChange={handleChange}
       
            name = "deductions" 
            placeholder='Deductions'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div> */}
  


  
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
    
  
  ): <div> loading</div>}</>
  )
}

export default Addsalary







