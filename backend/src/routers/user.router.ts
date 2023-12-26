import express from "express";
import {  login, registerUer, authorizedRoute } from "../controller/user.controller";
import { validationOftoken, redirectToValidation } from "../middlewares/tokenValidation";

const app = express.Router();


app.route("/register").post(registerUer);
app.route("/login").post(login);
app.route("/validation").get(validationOftoken);
app.route("/authorized").get(redirectToValidation, validationOftoken, authorizedRoute);


export default app;
