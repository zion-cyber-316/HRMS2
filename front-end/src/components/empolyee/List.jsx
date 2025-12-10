import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { columns, EmployeesButtons,} from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import { useAuth } from '../../Context/AuthContext'




const List = () => {
 const [employee,setemployee] = useState([])
 const [filteremployee,setFilteremployee] = useState([])
 const {serverLink} = useAuth()

useEffect(()=>{
const fetchempdata =async()=>{
try{
  const res = await axios.get(`${serverLink}/api/employee`)
  
  console.log(res.data)
  if(res.data.success){
    let sno =1
    const data =await res.data.Employees.map((emp)=>(
      {
        _id : emp._id,
      sno : sno++,
      dep_name:emp.department.dep_name,
      name :emp.userId.name,
      dob: new Date( emp.dob).toLocaleDateString(),
      profileImage :<img width={40}  className='rounded-full' src={`${serverLink}/${emp.userId.profileImage}`}/>   ,
      action : (<EmployeesButtons Id={emp._id}/>)
      }
    ))
    setemployee(data)
    setFilteremployee(data)
    
  }

}catch(error){
    if(error.res && !error.res.data.success){
  alert(error.res)
  }
}


}




 fetchempdata()
},[])

const handleFilter =(e)=>{
const record = employee.filter((emp)=>(
  emp.name.toLowerCase().includes(e.target.value.toLowerCase())
))
setFilteremployee(record)
}



  return (
    <div className='p-5'>
      
           <div className='text-center'>
     
        <h3 className='text-2xl font-bold'>Manage Empolyees</h3>
         
   
      </div>
      
      <div className='flex justify-between items-center'>
        <input onChange={handleFilter}   type="text" placeholder='Search by emp name' className='px-4 py-0.5 border' />
        <Link to="/admin-dashbord/add-employees" className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Empolyees</Link>
        
      </div>
      <div className='mt-5'>
        <DataTable columns={columns} data={filteremployee} pagination/>
      </div>
    </div>
  )
}

export default List