import { initialStateType, stateActionType } from "../../TypeVariables/typesOfvariables"
import { AUTH_DEFAULT, AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESS } from "./auth.types"

let initialState:initialStateType = {
    loading: false,
    error: false,
    errorLoginMessage: "",
    successLoginMessage: "",
    token: localStorage.getItem("token") ?? "",
    refreshToken : localStorage.getItem("refreshToken") ?? "",
    logOut: false,
}


export const AuthReducer = (state={...initialState}, action: stateActionType)=>{

     switch(action.type){

        case AUTH_LOADING :
            return {
                ...state,
                loading: true,
                logOut: false,
            };

        case AUTH_ERROR :
            console.log() 
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: action?.payload?.errorMessage,
                logOut: false,
            };

        case AUTH_SUCCESS : 

            localStorage.setItem("token", action?.payload?.token);
            localStorage.setItem("refreshToken", action?.payload?.refreshToken);

            return {
                error: false,
                errorMessage:"",
                token: action?.payload?.token,
                refreshToken: action?.payload?.refreshToken,
                successLoginMessage: "You are logged-in",
                logOut: false,
            };

        case AUTH_DEFAULT : 
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            
            return {
                ...state,
                loading: false,
                error: false,
                errorMessage:"",
                successLoginMessage:"",
                token:"",
                refreshToken:"",
                logOut: true,
            }


        default : 
            return {
               ...initialState,
            };

     }

}