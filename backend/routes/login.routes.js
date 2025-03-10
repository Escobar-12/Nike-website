import express from 'express'
import {handleRegister} from "../controllers/registerController.js"
import { handleLogin } from '../controllers/authController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import {handleRefreshToken} from '../controllers/refreshTokenController.js';


import { fileURLToPath } from 'url';
import path from 'path';
import fs from "fs/promises";


const router = express.Router();

router.use(express.json());

router.post('/register',handleRegister);
router.post('/signin',handleLogin);
router.get('/refresh',handleRefreshToken);
router.get('/clearDB',async (req,res)=>
{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const pathDB = path.join(__dirname,"..","config","userDB.json");
    await fs.writeFile(pathDB,JSON.stringify([], null, 2));
    res.sendStatus(200);
})


export default router;