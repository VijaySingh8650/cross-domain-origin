import React , {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { defaultLoginAction, reGeneratetoken } from '../Store/Authorization/auth.action';
import { useNavigate } from 'react-router-dom';
import "../Styles/login.css";

const Home = () => {
  const {token, refreshToken} = useSelector((state: any)=>state.loginAuth);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  

  useEffect(()=>{

    if(token && refreshToken){
      console.log("lsjkfafkdhakgh");

      callbackfunction(token, refreshToken);
       
    }
    else{
      navigate("/login")
    }



  },[token, refreshToken]);


  async function callbackfunction (token:string, refreshToken:string) {

   

      let response = await axios.get(`${process.env.REACT_APP_API}/api/authorized`,
      {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': token,
         "Refreshtoken": refreshToken
       }
      }
      );

      if(response.status === 200){
   
        
        if(response?.data?.message === "Please login again"){
            dispatch(defaultLoginAction());
            navigate("/login");
            return;
        }

        setUser(response?.data?.message);
        if(response?.data?.regenerate){
          let data: {token:string, refreshToken: string} = {
            token: response?.data?.token,
            refreshToken: response?.data?.refreshToken
          }
          dispatch(reGeneratetoken(data));
       }

      }
      
    


  }   

  return (
    <div className='loginContainer'>
      <h1>Welcome To Home</h1>
      <p>{user}</p>
    </div>
  )
}

export default Home
