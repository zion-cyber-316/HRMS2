import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

const Viewsalary = () => {
  const[salaries,setSalaries] = useState(null)
  const[filteredSalaries,setFilteredSalaries] = useState(null)
  const {id} = useParams();
  const {serverLink} = useAuth()
  let sno = 1;

  const fetchSalaries = async()=>{

try{
const response = await axios.get(`${serverLink}/api/salary/${id}`)
console.log(response.data)
if(response.data.success){
  setSalaries(response.data.salary)
  setFilteredSalaries(response.data.salary)
}
}catch(error){
if(error.response && !error.response.data.success){
  alert(error.message)
}
}
  }

useEffect(()=>{
  
  fetchSalaries()
},[])


const filterSalaries = (q)=>{
  const filterRecords = salaries.filter((leave)=>
  leave.employeeId.toLocalLowercase().includes(q.toLocalLowercase())
);
setFilteredSalaries(filterRecords)
}



  return (
  <> 

  {filteredSalaries === null ?(
    <div>Loding...</div>
  ) :(



    <div className='overflow-x-auto p-5'>
<div className='text-center'>
  <h2 className='text-2xl font-bold'>Salary History</h2>
</div>

<div className='flex justify-end my-3'>
  <input 
  className='border px-2 rounded-md py-0.5 border-gray-300'
  type="text" 
  placeholder='search by Emp Id'
  onChange={filterSalaries}/>

</div>

{filteredSalaries.length > 0 ?(
  <table className='w-full text-sm text-left text-gray-500'>
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
<tr>
  <th className='px-6 py-3 '>S no</th>
    <th className='px-6 py-3 '>Empolyee ID</th>
      <th className='px-6 py-3 '>Salary</th>
        <th className='px-6 py-3 '>Pf</th>
          <th className='px-6 py-3 '>Advance</th>
            <th className='px-6 py-3 '>Others</th>
          <th className='px-6 py-3 '>Totaldeductions</th>
            <th className='px-6 py-3 '>netSalary</th>
            <th className='px-6 py-3 '>Pay Date</th>
  
</tr>
    </thead>

<tbody>
  {filteredSalaries.map((salary)=>(
    <tr key={salary._id}
    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
      <td className='px-6 py-3'> {sno++}</td>
      <td className='px-6 py-3'> {salary.employeeId.employeeId}</td>
      <td className='px-6 py-3'> {salary.basicSalary}</td>
      <td className='px-6 py-3'> {salary.pf}</td>
       <td className='px-6 py-3'> {salary.advance}</td>
        <td className='px-6 py-3'> {salary.others}</td>
      <td className='px-6 py-3'> {salary.totaldeduction}</td>
      <td className='px-6 py-3'> {salary.netSalary}</td>
      <td className='px-6 py-3'> { new Date(salary.payDate).toLocaleDateString()}</td>

    </tr>
  ))}
</tbody>





  </table>

) :<div> Norecords </div>

}
    </div>



  )};
  



  </>
  );
}

export default Viewsalary