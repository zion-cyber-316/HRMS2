import React from 'react'

import { AiFillAmazonCircle, AiOutlineFileText } from "react-icons/ai";
import { GiMoneyStack } from "react-icons/gi";
import { FaBuilding, FaCalendar, FaCalendarAlt, FaMoneyBill, FaMoneyBillWave, FaTachometerAlt, FaUsers } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

export const AdminSidebar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-teal-600 h-12 flex items-center justify-center'>
        <h1 className='text-2xl text-center'>Empolyee Ms</h1>
      </div>
      <div>
        
        <NavLink to="/admin-dashbord"
          className={({ isActive }) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}
          end>
          <FaTachometerAlt />
          <span>Dashbord</span>
        </NavLink>




       


        <NavLink to="/admin-dashbord/departments"
          className={({ isActive }) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaBuilding />
          <span>Department</span>
        </NavLink>

         <NavLink to="/admin-dashbord/employees"
          className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaUsers />
          <span>Empolyees</span>
        </NavLink>

        <NavLink to="/admin-dashbord/leave"
         className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaCalendar />
          <span>Leaves</span>
        </NavLink>


        <NavLink to="/admin-dashbord/salary"
           className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        
         {/* <NavLink to="/admin-dashbord/attendance"
       className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaCalendarAlt />
         
          <span>Attendance</span>
        </NavLink> */}

  <NavLink to="/admin-dashbord/attendance-reports"
       className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <AiOutlineFileText />
         
          <span>worker-AttendanceReport</span>
        </NavLink>



         <NavLink to="/admin-dashbord/purchase"
       className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <GiMoneyStack />
         
          <span>Purchase</span>
        </NavLink>



        <NavLink to="/admin-dashbord/setting"
       className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaTachometerAlt />
          <span>Setting</span>
        </NavLink>


      </div>
    </div>
  )
}