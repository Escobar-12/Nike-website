import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises"
import dotenv from "dotenv";

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
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(401);
    const refreshToken = cookie.jwt;

    try
    {
        const userDB = await loadUserDB();

        const userFound = userDB.find(person => person.refreshToken === refreshToken);
        if (!userFound) {
            return res.sendStatus(403);
        }

        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,
            (err,decoded) =>
            {
                if(err || userFound.user === decoded.user) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    { username: decoded.user },
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
