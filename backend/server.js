import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import router from "./routes/login.routes.js";
import cors from 'cors'

dotenv.config();
const app = express();
const Port = process.env.Port || 5000;

app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>
{
    res.sendStatus(200)
});

app.use('/login',router);

app.listen(Port,()=>
{
    connectDB();
    console.log(`Server started at ${Port}`)
});