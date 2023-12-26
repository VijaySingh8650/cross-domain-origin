import { initialRegisterStateType, stateActionType } from "../../TypeVariables/typesOfvariables";
import { REGISTER_DEFAULT, REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS } from "./register.types";

let initialState: initialRegisterStateType = {
    successRegisterMessage: "",
    errorRegisterMessage:"",
    loading: false,
    error: false
}
export const RegisterReducer = (state={...initialState}, action: stateActionType)=>{

    switch(action.type){

       case REGISTER_LOADING :
           return {
               ...state,
               loading: true,
           };

       case REGISTER_ERROR: 
           return {
               ...state,
               error: true,
               loading: false,
               errorRegisterMessage: action?.payload?.errorMessage
           };

       case REGISTER_SUCCESS :

           return {
               error: false,
               successRegisterMessage : action?.payload?.successMessage
           };

        case REGISTER_DEFAULT :
            return {
                ...state,
                error: false,
                errorRegisterMessage: "",
                loading: false,
            }


       default : 
           return {
              ...initialState,
           };

    }

}