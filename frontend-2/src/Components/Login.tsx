import React , {useEffect, useState} from 'react'
import { StyleButton } from '../Styles/style-components';
import "../Styles/login.css";
import { loginType } from '../TypeVariables/typesOfvariables';
import {useDispatch, useSelector} from "react-redux";
import { defaultLoginAction, loginAction } from '../Store/Authorization/auth.action';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [loginData, setLoginData] = useState<loginType>({
     email : "",
     password : "",
  });
  const dispatch: any = useDispatch();
  const navigate  = useNavigate();
  const {error, errorLoginMessage, token, refreshToken} = useSelector((state:any)=>state.loginAuth);

  useEffect(()=>{

    if(error && errorLoginMessage==="Unauthorised"){

        dispatch(defaultLoginAction())
        navigate("/register");

    }

  },[error, errorLoginMessage]);


  useEffect(()=>{

    if(token && refreshToken){
        navigate("/");
    }

  },[token, refreshToken])

  const handleChange = (e:any):void =>{
    const {value, name} = e.target;
    setLoginData({
        ...loginData,
        [name] : value
    })
  }

  const handleClick = () =>{
       console.log(loginData);
       dispatch(loginAction(loginData));

  }

  return (
    <div className='loginContainer'>
        <h1>Log-in</h1>
        <input type="text" name="email" value={loginData?.email} placeholder='Email' onChange={handleChange}/>
        <input type="password" name="password" value={loginData?.password} placeholder='Password' onChange={handleChange}/>
        <StyleButton onClick={handleClick} disabled={!loginData?.email || !loginData?.password}>Login</StyleButton>

      
    </div>
  )
}

export default Login
