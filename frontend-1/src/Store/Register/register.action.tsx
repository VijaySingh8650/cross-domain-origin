import { Dispatch } from "redux";
import { REGISTER_DEFAULT, REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS } from "./register.types";
import { loginType } from "../../TypeVariables/typesOfvariables";
import axios from "axios";


export const registerAction = (data:loginType) => async(dispatch: any) =>{

    dispatch({type: REGISTER_LOADING});
    try{
       let response = await axios.post(`${process.env.REACT_APP_API}/api/register`, data);
       if(response.status === 200){
           console.log(response, "register");
           dispatch({type: REGISTER_SUCCESS, payload: {successMessage: response?.data?.message}});

       }
    }
    catch(err){

        dispatch({type: REGISTER_ERROR});

    }

}

export const defaultRegisterAction = () => (dispatch:any)=>{
    
    dispatch({type: REGISTER_DEFAULT});

}