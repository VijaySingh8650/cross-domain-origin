import express from "express";
import { regenerateToken, login, registerUer } from "../controller/user.controller";
import { validationOftoken } from "../middlewares/tokenValidation";

const app = express.Router();


app.route("/register").post(registerUer);
app.route("/login").post(login);
app.route("/validation").get(validationOftoken,regenerateToken);


export default app;
