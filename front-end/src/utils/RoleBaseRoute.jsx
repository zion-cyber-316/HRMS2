// import React from 'react'
// import { useAuth } from '../Context/AuthContext'
// import { Navigate } from 'react-router-dom';
// const RoleBaseRoute = ({children,requiredRole}) => {
//  const {user,loding} = useAuth();
// if(loding){
//     return <div>Loding ...</div>
// }

// if(!requiredRole.includes(user.role)){
//     <Navigate to="/unauthrized" />
// }
// return user ? children :<Navigate to ="/login" />


// }

// export default RoleBaseRoute






import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom';

const RoleBaseRoute = ({ children, requiredRole }) => {
  
  const { user, loading } = useAuth();

  // Loading state (auth verification running)
  if (loading) {
    return <div>Loading...</div>;
  }

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch
  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthrized" replace />;
  }

  // Allowed content
  return children;
};

export default RoleBaseRoute;
