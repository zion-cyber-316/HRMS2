// import React, { useEffect } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'

// function RefreshHandler( {setIsAuthenticated} ) {

// const location = useLocation();
// const navigate = useNavigate();

// useEffect(()=>{
//     if(localStorage.getItem('token')){
//         setIsAuthenticated(true);


//         if(
//             location.pathname === "/Login" ||
//              location.pathname === "/signup" ||
//              location.pathname === "/login" ||
//              location.pathname === "/"
           

//         ){
//             navigate ('/admin-dashbord',{replace : false})

//         }
//     }else{
//       navigate("/login")
//     }
// },[location,navigate,setIsAuthenticated])




//   return (
//     null
//   )
// }

// export default RefreshHandler





















import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({ setIsAuthenticated }) {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);

      // If authenticated user tries to access auth pages
      if (
        location.pathname === "/Login" ||
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/"
      ) {
        navigate('/admin-dashbord', { replace: true });  // ⬅ one-time redirect
      }
    } else {
      // User not authenticated → redirect to login
      if (location.pathname !== "/login") {
        navigate("/login", { replace: true }); 
      }
    }

  }, [location.pathname]);   // ⬅ ONLY pathname dependency

  return null;
}

export default RefreshHandler;
