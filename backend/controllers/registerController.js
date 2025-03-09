import bcrypt from "bcrypt";
import fs from "fs/promises"; 
import path from "path";
import { fileURLToPath } from "url";

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

export const handleRegister = async (req, res) => {
    const { user, password } = req.body;
    
    if (!user || !password) 
        return res.status(400).json({ message: "Username and password required" });

    try {
        const userDB = await loadUserDB();

        if (!Array.isArray(userDB)) {
            userDB = [];
        }

        if (userDB.find(u => u.username === user)) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Hash password
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = { user: user, password: hashedPwd };

        // Add new user to DB
        userDB.push(newUser);
        await fs.writeFile(userDBPath, JSON.stringify(userDB, null, 2));
        const filedata = await fs.readFile(userDBPath,'utf-8');
        console.log(JSON.parse(filedata));
        console.log("User registered:", newUser);
        res.status(201).json(filedata);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
