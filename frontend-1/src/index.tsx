import React from "react";
import {createRoot} from "react-dom/client";
import App from "./app";

let root = document.getElementById("root");
if(root){
    let rootElement = createRoot(root);
    rootElement.render(<App/>);
}
else{
    alert("No id found");
}


