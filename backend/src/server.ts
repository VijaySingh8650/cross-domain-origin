import express from "express";
import  cors from "cors";
import  env from "dotenv";
import  {connectDB} from "./connectDB/connect";
import userRouter from "./routers/user.router";
import { notFound } from "./middlewares/notfound.midlleware";

env.config(); //to access .env file
const app = express();
app.use(express.json()); //will convert the json data into js object
app.use(cors({
   origin: ["http://localhost:3001", "http://localhost:3002"],
   methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use("/api", userRouter);
app.use("*", notFound);



app.listen(process.env.PORT, ()=>{
    connectDB();
    console.log(`I m running on port ${process.env.PORT}`);
})


