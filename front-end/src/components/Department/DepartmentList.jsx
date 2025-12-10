import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {  useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
import { useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext'




const DepartmentList = () => {
const [departments,setdepartments] = useState([])
const [filterDepartment,setfilterDeparment] = useState([])
const {serverLink} = useAuth()




// const onDepartmentDelete = (id)=>{
//   const data = departments.filter(dep => dep._id != id)
//   setdepartments(data)
//   setfilterDeparment(data)
// }


/// fech data 

useEffect(()=>{

const fetchdata =async()=>{
try{
  const res = await axios.get(`${serverLink}/api/department`)
  console.log(res)
  if(res.data.success){
    let sno =1
    const data =await res.data.Departments.map((dep)=>(
      {
        _id : dep._id,
      sno : sno++,
      dep_name:dep.dep_name,
      action :(<DepartmentButtons _id={dep._id} />)
      }
    ))
    setdepartments(data)
    setfilterDeparment(data)
  }

}catch(error){
    if(error.res && !error.res.data.success){
  alert(error.res)
  }
}


}


 fetchdata()
},[])



const filterDepartments = (e) =>{
  
const records = departments.filter((dep)=>
dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
setfilterDeparment(records)
}



  return (
    <div className='p-5'>
    
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Departments</h3>
         
   
      </div>
      <div className='flex justify-between items-center'>
        <input onChange={filterDepartments}  type="text" placeholder='Search by dep name' className='px-4 py-0.5 border' />
        <Link to="/admin-dashbord/add-department" className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Department</Link>
      </div>
      <div className='mt-5'>
        <DataTable
      columns={columns} data = {filterDepartment} pagination
        />
      </div>
    </div>
  )
}

export default DepartmentList