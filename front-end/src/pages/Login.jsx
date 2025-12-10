import React, { useState } from 'react'
import axios from "axios"
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const [email,setEmail] = useState('');
const [password,setPassword] = useState('')
const {login,serverLink} = useAuth()
const Navigate = useNavigate();



const handleSubmit = async(e)=>{
    e.preventDefault()
 try{
   
    const response = await axios.post(`${serverLink}/auth/login`,{email,password});
if(response.data.success){
  login(response.data.user)
  localStorage.setItem('token',response.data.token)
  if(response.data.user.role==="admin"){
    Navigate("/admin-dashbord")
  }else{
    Navigate("/employee-dashbord")
  }

    
}

 }catch(err){
    console.log(err)
 }



}


  return (
   <div className='flex flex-col items-center h-screen justify-center
   bg-gradient-to-b from-teal-600 from-50% from-gray-100 to-50%  space-y-6'>
   <h1 className='font-sevillana text-3xl text-white'> Employess Manegment system</h1>


<div className='border shadow p-6 w-88 bg-white'>

     <h2 className='text-2xl font-bold mb-4'>Login Form</h2>


     <form onSubmit={handleSubmit} >


<div className='mb-4'>
    <label className='block text-gray-700' htmlFor="email">Email</label>
<input  className='w-full px-3 py-2 border' type='email' placeholder='Enter your Email' id='email' onChange={(e)=>setEmail(e.target.value)}></input> 
</div>

<div className='mb-4'>
    <label className='block text-gray-700' htmlFor="Password">Password</label>
<input    className='w-full px-3 py-2 border'  type='Password' placeholder='*********'  id='Password'
 onChange={(e)=>setPassword(e.target.value)}
 

>


</input>
</div>

<div className='mb-4 flex items-center justify-between'>
    <label className='inline-flex items-center'>
<input type="checkbox" className='form-checkbox'  />
<span className='ml-2 text-gray-700'>Remember me </span>

    </label>
    <a href="#" className='text-teal-600'> Forget Password</a>
</div>

<div className='mb-4'>

    <button
    type='submit'
    className='w-full bg-teal-600  text-white py-2'
    
    >Login</button>
</div>


   </form>
   
</div>
  


  
   
   
   </div>
  )
}

export default Login
