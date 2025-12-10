import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { columns, PurchasButtons } from '../../utils/PHelperEmp'
import { useAuth } from '../../Context/AuthContext'



const EmployeePurchase = () => {

  const{user,serverLink}= useAuth()
  const[Purchase,setPurchase] = useState([])


   const fetchpurchase = async()=>{
    console.log(user._id)
    
try{
  const res = await axios.get(`${serverLink}/api/purchase/${user._id}`)
  
  // console.log(res.data)
  if(res.data.success){
    let sno =1
    const data =await res.data.purchase.map((item)=>(
      {
        _id : item._id,
      sno : sno++,
      employeeId : item.employeeId.employeeId,
      name : item.employeeId.userId.name,
      project: item.projectname,
      itemType :item.typeofitem,
      
        Amount :item.totalamount,
      Date:
      (new Date(item.purchasedate).toLocaleDateString()),
    

      action : (<PurchasButtons Id={item._id}/>)
      }
    ));
    setPurchase(data)
   
 
    
  }

}catch(error){
    if(error.res && !error.res.data.success){
  alert(error.res)
  }
}

    }

    useEffect(()=>{
      fetchpurchase()

    },[])



  return (
    <div className='p-5'>
      
           <div className='text-center'>
     
        <h3 className='text-2xl font-bold'>Manage Purchase</h3>
         
   
      </div>
      
      <div className='flex justify-between items-center'>
        
        <Link to="/employee-dashbord/add-purchase" className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Purchase</Link>
        
      </div>
      <div className='mt-5'>
        <DataTable columns={columns} data={Purchase} pagination/>
      </div>
    </div>
  )
    
  
}

export default EmployeePurchase