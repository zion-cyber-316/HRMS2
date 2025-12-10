import React, { useState } from 'react'

import { useAuth} from '../../Context/AuthContext'
import axios from 'axios'

const AdminSetting = () => {

  const {user,logout,serverLink} = useAuth()
  const [setting,setSetting]=useState({
    userId : user._id,
    oldPassword : " ",
    newPassword:"",
    confirmPassword : ""
  });
  const [error,setError]=useState(null) ;

  const handleChange=async(e)=>{
    const {name,value}= e.target;
    setSetting({...setting, [name] : value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(user._id)
  if(setting.newPassword !== setting.confirmPassword){
    setError("Password not matched")
  }else{
    try{
      const response = await axios.put(`${serverLink}/api/setting/changeAdmin-password`,setting)

      if(response.data.success){
        logout()
        setError("")
      }

    }catch(error){
    if(error.response && !error.response.data.success){
      setError(error.response.data.error)
    }
    }
  }

  }
  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      <h2 className='text-2xl font-bold mb-6'> Change Admin Password</h2>
      <p className='text-red-500'>{error}</p>
      <form onSubmit={handleSubmit}>

        {/* Department Name */}
        <div>
          <label className='text-sm font-medium text-gray-700'>
            old Password
          </label>
          <input 
          type="password"
          name='oldPassword'
          placeholder='Change Password'
          onChange={handleChange}
          className='mt-1 w-full p-2 border border-gray-300 rounded-md'
          required />
        </div>


          <div>
          <label className='text-sm font-medium text-gray-700'>
            New Password
          </label>
          <input 
          type="password"
          name='newPassword'
          placeholder='New Password'
          onChange={handleChange}
          className='mt-1 w-full p-2 border border-gray-300 rounded-md'
          required />
        </div>



          <div>
          <label className='text-sm font-medium text-gray-700'>
            confirm Password
          </label>
          <input 
          type="password"
          name='confirmPassword'
          placeholder='Confirm Password'
          onChange={handleChange}
          className='mt-1 w-full p-2 border border-gray-300 rounded-md'
          required />
        </div>
        <button
        type='submit'
        className='w-full mt-6 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
          Change Password
        </button>
      </form>
    </div>
  )
}

export default AdminSetting