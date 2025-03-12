import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userDBPath = path.join(__dirname, "..", "config", "userDB.json");

async function loadUserDB() {
    try {
        const data = await fs.readFile(userDBPath, "utf-8");
        return JSON.parse(data) || { users: [] }; 
    } catch (error) {
        console.error("Error reading userDB.json:", error);
        return { users: [] };
    }
}

export const handleRefreshToken =async (req, res) => {
    if (!req.cookies?.jwt) {
        console.log("No JWT cookie found");
        return res.sendStatus(401);
    }

    const refreshToken = req.cookies.jwt;

    try
    {
        const userDB = await loadUserDB();

        const userFound = userDB.find(person => person.refreshToken === refreshToken);
        if (!userFound) {
            return res.sendStatus(403);
        }
        const roles = Object.values(userFound.roles);
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,
            (err,decoded) =>
            {
                if(err || userFound.user === decoded.user) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    { userInfo:{
                        username: decoded.user,
                        roles:roles
                    }},
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                );
                res.json({accessToken});

            }
        );
    }
    catch(err)
    {
        console.log(err);
        res.sendStatus(400);
    }
};
