import React, { useEffect } from 'react'
import Navbar from './Navbar/Navbar';
import "./Styles/global.css";
import Router from './Router/router';
import { useSelector } from 'react-redux';
let createHost = require('cross-domain-storage/host');
let storageHost = createHost([
  {
      origin: 'http://localhost:3001',
      allowedMethods: ['get', 'set', 'remove'],
  },
  {
      origin: 'http://localhost:3002',
      allowedMethods: ['get', 'set', 'remove'],
  },
  {
      origin: 'http://localhost:3003',
      allowedMethods: ['get', 'set', 'remove'],
  }
]);

const App = () => {

  const {logOut, token, refreshToken} = useSelector((state:any)=>state.loginAuth);

  useEffect(()=>{

     if(logOut){

      storageHost.close();

     }
    
  },[token, refreshToken, logOut])

  return (
    <div>
        <Navbar/>
        <Router/>
    </div>
  )
}

export default App
