import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { columns, DelWorkersButtons } from '../../utils/delworkerHelper'
import DataTable from 'react-data-table-component'
import { useAuth } from '../../Context/AuthContext'


const DeleteWorkerList = () => {
const [delworkers,setDelworkers]=useState([])
 const [filterworkers,setFilterworkers] = useState([])
 const {serverLink} = useAuth()


useEffect(()=>{
 const fetchworkers = async()=>{
 try{
  
const res = await axios.get(`${serverLink}/api/deleteworkers/get`);
if(res.data.success){
    let sno =1
    const data =await res.data.workers.map((worker)=>(
      {
        _id : worker._id,
      sno : sno++,
      name:worker.name,
      gender :worker.gender,
      fathername : worker.fathername,
      designation:worker.designation,
      date : new Date(worker.dob).toLocaleDateString(),
         joiningdate : new Date(worker.joiningdate).toLocaleDateString(),
      phonenumber:worker.phonenumber,

      action :(<DelWorkersButtons _id={worker._id} />)
      }
    ))
    setDelworkers(data)
    setFilterworkers(data)
  }

  

 }catch(errorr){
  console.log(errorr)
 }

 }






fetchworkers()
},[])


const handleFilter =(e)=>{
const record = delworkers.filter((worker)=>(
  worker.name.toLowerCase().includes(e.target.value.toLowerCase())
))
setFilterworkers(record)
}





  return (

    <div className='p-5'>
      
           <div className='text-center'>
     
        <h3 className='text-2xl font-bold'>Delete Worker List</h3>
         
   
      </div>
      
      <div className='flex justify-between items-center mt-2'>
        <input onChange={handleFilter}  type="text" placeholder='Search by worker name' className='px-4 py-0.5 border' />
        
        
      </div>
      <div className='mt-1'>
        <DataTable columns={columns} data={filterworkers}/>
      </div>
    </div>
  )
}

export default DeleteWorkerList