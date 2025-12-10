import React from 'react'
import { useAuth } from '../Context/AuthContext'
import {Navigate} from "react-router-dom"

const PrivateRoutes = ({children}) => {
const token = localStorage.getItem("token")
  const{loding} = useAuth();
if(loding){
   return <div>Loding ... </div>
}
return token ? children :<Navigate to ="/login" />

}

export default PrivateRoutes