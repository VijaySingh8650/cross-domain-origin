import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import { BrowserRouter } from "react-router-dom";

let root = document.getElementById("root");
if(root){
    let rootElement = createRoot(root);
    rootElement.render(
        <BrowserRouter>

            <Provider store={store}>

                <App/>

            </Provider>

        </BrowserRouter>
    );
}
else{
    alert("No id found");
}


