import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { filteredLinks, links } from '../Constants';
import "../Styles/navbar.css";
import { useSelector, useDispatch } from 'react-redux';
import { StyleButton } from '../Styles/style-components';
import { defaultLoginAction } from '../Store/Authorization/auth.action';



const Navbar = () => {
  const {token}  = useSelector((state:any)=>state.loginAuth);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () =>{
    dispatch(defaultLoginAction());
    navigate("/login");
  }
  
  return (
    <div className='container'>
   
        {
          !token ? 
          links?.map((item)=>{
            return <NavLink key={item?.path} to={item?.path} style={{color: "white", textDecoration:"none"}}> {item.pathname}</NavLink>
          })  
          : 
          filteredLinks?.map((item)=>{
            return <NavLink key={item?.path} to={item?.path} style={{color: "white", textDecoration:"none"}}> {item.pathname}</NavLink>
          }) 

        }

        {
          token && <StyleButton onClick={handleLogout}>Logout</StyleButton>
        }
        
      
    </div>
  )
}

export default Navbar
