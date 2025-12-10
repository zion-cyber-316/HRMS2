// import React, { useEffect } from 'react'
// import { useContext } from 'react';
// import { createContext } from 'react'
// import { useState } from 'react'

// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// const userContext = createContext();

// function AuthContext({children}) {
// const [user,setUser] = useState(null);
// const [loading,setLoading] = useState(true)




//  const navigate = useNavigate()
// useEffect(()=>{
   
// const userVerify =async()=>{
   
//     try{
//          const token = localStorage.getItem("token")
//          if(token){
//                     const response = await axios.get("http://localhost:5000/auth/verify",{
//                         headers :{
//                             "Authorization" :`Bearer ${token}`
//                         }
//                     });

                    
// if(response.data.success){
//     setUser(response.data.user)
// }

//     }else{
//        setUser(null)
//        setLoading(false)
//     }

//          }
// catch(error){
//         if(error.response){
//            setUser(null)
//         }

//     }finally{
//         setLoading(false)
//     }
// }
// userVerify();
// },[])

// const login =(user)=>{
//     setUser(user)


// }


// const logout = ()=>{
//     setUser(null)
// localStorage.removeItem("token")
// navigate("/login")


// }



//   return (
//  <userContext.Provider value={{user,login,logout,loading}} >

// {children}

//  </userContext.Provider>
//   )
// }

// export const useAuth = ()=>useContext(userContext)

// export default AuthContext











































import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const userContext = createContext();

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  const serverLink = "https://hrms2-back-end.onrender.com"

  useEffect(() => {
    const userVerify = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser(null);
          return;
        }

        const response = await axios.get(`${serverLink}/auth/verify`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }

      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);   // <-- Always stop loading
      }
    };

    userVerify();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  

  return (
    <userContext.Provider value={{ user, login, logout, loading,serverLink }}>
      {children}
    </userContext.Provider>
  );
}

export const useAuth = () => useContext(userContext);

export default AuthContext;
