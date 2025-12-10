
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthContext'

import { Link } from 'react-router-dom'
import axios from 'axios'
import { columns, WorkersButtons } from '../../utils/WorkerHelper'
import DataTable from 'react-data-table-component'




const WorkerList = () => {
  const [workers,setWorkers] = useState([])
   const [filterworkers,setFilterworkers] = useState([])

  const {user,serverLink} = useAuth()
  const Id = user._id
useEffect(()=>{
  

  const getWorkers = async()=>{
  try{
      const res = await axios.get(`${serverLink}/api/workers/get/${Id}`);
    
if(res.data.success){
    let sno =1
    const data =await res.data.findworkers.map((worker)=>(
      {
        _id : worker._id,
        empId :worker.empId,
      sno : sno++,
      name:worker.name,
      gender :worker.gender,
      fathername : worker.fathername,
      designation:worker.designation,
      date : new Date(worker.dob).toLocaleDateString(),
         joiningdate : new Date(worker.joiningdate).toLocaleDateString(),
      phonenumber:worker.phonenumber,

      action :(<WorkersButtons _id={worker._id} />)
      }
    ))
    setWorkers(data)
    setFilterworkers(data)
  }




  }catch(error){
    console.log(error)
  }
  }


  getWorkers();
  
},[])


const handleFilter =(e)=>{
const record = workers.filter((worker)=>(
  worker.name.toLowerCase().includes(e.target.value.toLowerCase())
))
setFilterworkers(record)
}





  return (
    <div className='p-2'>
      
           <div className='text-center'>
     
        <h3 className='text-2xl font-bold underline'>Manage Worker</h3>
         
   
      </div>
      
      <div className='flex justify-between items-center mt-2'>
        <input onChange={handleFilter}  type="text" placeholder='Search by worker name' className='px-4 py-0.5 border' />
        <div>
          
        <Link to="/employee-dashbord/add-workers" className='px-4 py-1 bg-teal-600 rounded text-white'>Add  Worker</Link>
         <Link to="/employee-dashbord/add/workersalary" className='px-4 py-1 bg-yellow-600 rounded text-white'>Add Salary</Link>
          <Link to="/employee-dashbord/delete-workers" className='px-4 py-1 bg-red-600 rounded text-white'>Deleted Workers </Link>
        </div>
        
      </div>
      <div className='mt-1'>
        <DataTable columns={columns} data={filterworkers}/>
      </div>
    </div>
  )
}

export default WorkerList