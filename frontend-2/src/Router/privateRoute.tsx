import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ChildrenType {
    children : ReactNode
}
const PrivateRoute: React.FC<ChildrenType> = ({children}) => {
  const {token, refreshToken} = useSelector((state:any)=>state.loginAuth);

  if(token && refreshToken){
    return children;
  }

  
  return <Navigate to="/login"/>;
}

export default PrivateRoute;
