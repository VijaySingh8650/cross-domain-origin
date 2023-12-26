import React, { useEffect } from 'react'
import Navbar from './Navbar/Navbar';
import "./Styles/global.css";
import Router from './Router/router';
import { useDispatch, useSelector } from 'react-redux';
import { defaultLoginAction, reGeneratetoken } from './Store/Authorization/auth.action';
let createGuest = require("cross-domain-storage/guest");
export const hostStorage = createGuest("http://localhost:3001");

const App = () => {

  const dispatch:any = useDispatch();
  const {token, refreshToken, logOut} = useSelector((state:any)=>state.loginAuth);
  
  useEffect(()=>{

    getStorageOfHost();
      
  },[]);

  useEffect(()=>{
    let parentAccessToken:string ="";
    let parentRefreshToken: string ="";
      hostStorage.get("token",(err:any,value:string)=>{
       if(err){
        console.log(err)
       }else if(value){
        parentAccessToken = value;
       }
     });
     hostStorage.get("refreshToken",(err:any,value:string)=>{
      if(err){
       console.log(err)
      }else if(value){
       parentRefreshToken = value;
      }
    });

     if(parentAccessToken && parentRefreshToken){
         getStorageOfHost();
     }else{
      localStorage.clear();
     }


  },[token, refreshToken, logOut]);

  function getStorageOfHost(){

    let data:{token:string, refreshToken:string} = {token:"", refreshToken:""};
    
    hostStorage?.get("refreshToken", (err:any, value:string)=>{
         if(err){
         localStorage.clear();}
         else {
          data.refreshToken = value;
          hostStorage?.get("token", (err:any, value:string)=>{
            if(err)console.log(err, "error");
            else {
             data.token = value;
              if(data?.token && data?.refreshToken){
                dispatch(reGeneratetoken(data));
              }
              else{
                dispatch(defaultLoginAction());
              }
            }
          })
          
        }
    });

  }
  

  return (
    <div>
        <Navbar/>
        <Router/>
    </div>
  )
}

export default App
