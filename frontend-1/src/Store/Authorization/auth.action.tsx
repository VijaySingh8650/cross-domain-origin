import { AnyAction, Dispatch } from "redux";
import { AUTH_DEFAULT, AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESS } from "./auth.types";
import axios from "axios";
import { loginType } from "../../TypeVariables/typesOfvariables";
import { ThunkDispatch } from 'redux-thunk';




export const loginAction = (data: loginType) => async(dispatch: any) =>{

    dispatch({type: AUTH_LOADING});
    try{
    
         let response = await axios.post(`${process.env.REACT_APP_API}/api/login`, data);
         if(response?.data?.message === "Unauthorised"){

             dispatch({type: AUTH_ERROR, payload: {errorMessage: response?.data?.message}});

         }
         else if(response.data?.message === "You are logged-in"){
            dispatch({type: AUTH_SUCCESS, payload: {token: response?.data?.token, refreshToken : response?.data?.refreshToken}});
         }

    }
    catch(err){

        dispatch({type: AUTH_ERROR});

    }


}

export const defaultLoginAction = () => (dispatch:any)=>{

    dispatch({type: AUTH_DEFAULT});

}

export const reGeneratetoken = (data:{token:string, refreshToken:string}) => (dispatch:any)=>{
    dispatch({type: AUTH_SUCCESS, payload:{token: data.token, refreshToken: data.refreshToken}});
}

