import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import fs from "fs/promises"; 
import { fileURLToPath } from "url";

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

export const handleLogin = async (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) return res.status(400).json({ success: false, message: "Username and password required" });

    try
    {
        const userDB = await loadUserDB();

        const userFound = userDB.find(person => person.user === user);
        if (!userFound) {
            return res.status(400).json({ success: false, message: "Username not found" });
        }

        // Check password
        const match = await bcrypt.compare(password,userFound.password);
        if (!match) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        // Generate JWTs
        const accessToken = jwt.sign(
            { username: userFound.user },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );

        const refreshToken = jwt.sign(
            { username: userFound.user },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const otherUsers = userDB.filter(person => person.user !== userFound.user);
        const currentUser = { user: userFound.user, password: userFound.password, refreshToken };

        const updatedUserDB = [...otherUsers, currentUser];

        await fs.writeFile(userDBPath, JSON.stringify(updatedUserDB, null, 2));

        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite:"None", secure:true }); // secure:true
        res.json({ accessToken });
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
