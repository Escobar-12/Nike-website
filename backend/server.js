import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import router from "./routes/login.routes.js";
import cors from 'cors'
import verifyJWT from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOrigins.js";
import { credentials } from "./middleware/credentials.js";

import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path"
import { handleLogOut } from "./controllers/logoutController.js";

dotenv.config();
const app = express();
const Port = process.env.Port || 5004;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use('/login',router);
app.get('/logout',handleLogOut);


app.get('/',(req,res)=>
{
    res.sendStatus(200)
});

app.use(verifyJWT);

app.get('/db',async (req,res)=>
{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const pathtoDB = path.join(__dirname,'config','userDB.json');
    const data = await fs.readFile(pathtoDB,'utf-8');
    console.log(data);
    res.sendStatus(200);
})


app.listen(Port,()=>
{
    connectDB();
    console.log(`Server started at ${Port}`)
});