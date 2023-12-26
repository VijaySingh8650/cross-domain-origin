import React , {useEffect, useState} from 'react'
import { StyleButton } from '../Styles/style-components';
import "../Styles/login.css";
import { loginType } from '../TypeVariables/typesOfvariables';
import {useDispatch, useSelector} from "react-redux";
import { defaultRegisterAction, registerAction } from '../Store/Register/register.action';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<loginType>({
     email : "",
     password : "",
  });
  const dispatch: any = useDispatch();
  const {successRegisterMessage} = useSelector((state:any)=>state.registerAuth);
  const {token, refreshToken} = useSelector((state:any)=>state.loginAuth);

  useEffect(()=>{

    if(successRegisterMessage){


        dispatch(defaultRegisterAction());
        navigate("/login");
        
    }

  },[successRegisterMessage]);



  useEffect(()=>{

    if(token && refreshToken){
        navigate("/");
    }

  },[token, refreshToken]);


  const handleChange = (e:any):void =>{
    const {value, name} = e.target;
    setLoginData({
        ...loginData,
        [name] : value
    })
  }

  const handleClick = () =>{
       console.log(loginData);
       dispatch(registerAction(loginData));

  }

  return (
    <div className='loginContainer'>
        
        <h1>Sign-up</h1>
        <input type="text" name="email" value={loginData?.email} placeholder='Email' onChange={handleChange}/>
        <input type="password" name="password" value={loginData?.password} placeholder='Password' onChange={handleChange}/>
        <StyleButton onClick={handleClick} disabled={!loginData?.email || !loginData?.password}>Sign-up</StyleButton>

      
    </div>
  )
}

export default Register;

