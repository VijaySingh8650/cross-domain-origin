import {combineReducers, applyMiddleware, legacy_createStore} from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./Authorization/auth.reducer";
import { RegisterReducer } from "./Register/register.reducer";


let rootReducer = combineReducers({
    loginAuth : AuthReducer,
    registerAuth : RegisterReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
