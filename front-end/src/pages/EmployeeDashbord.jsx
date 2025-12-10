import React from 'react'
import SideBar from '../components/EmployeeDashbord/SideBar'
import Navbar from '../components/Dashbord/Navbar'
import { Outlet } from 'react-router-dom'
const EmployeeDashbord = () => {
  return (
    <div className='flex'>
  <SideBar/>
<div className='flex-1 ml-64 bg-gray-300 h-screen' >
  <Navbar/>
<Outlet/>
</div>
</div>
  )
}

export default EmployeeDashbord