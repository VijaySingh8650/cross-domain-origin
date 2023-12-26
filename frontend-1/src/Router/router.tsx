import React from 'react';
import {Routes, Route} from "react-router-dom";
import Login from '../Components/Login';
import Register from '../Components/Register';
import PrivateRoute from './privateRoute';
import Home from '../Components/Home';
import { useSelector } from 'react-redux';

const Router = () => {
  

  return (
    <Routes>

        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={
          <PrivateRoute>

              <Home/>

          </PrivateRoute> 
        }/>
        <Route path="/register" element={<Register/>}/>
      
    </Routes>
  )
}

export default Router
