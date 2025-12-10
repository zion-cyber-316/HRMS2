import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { AdminSidebar } from '../components/Dashbord/AdminSidebar';
import Navbar from '../components/Dashbord/Navbar';
import AdminSummary from '../components/Dashbord/AdminSummary';
import {Outlet} from 'react-router-dom'

const AdminDashboard = () => {
  const{user} =useAuth();



  return (
<div className='flex'>
  <AdminSidebar/>
<div className='flex-1 ml-64 bg-gray-300 h-screen' >
  <Navbar/>
<Outlet/>
</div>
</div>
  )
}

export default AdminDashboard