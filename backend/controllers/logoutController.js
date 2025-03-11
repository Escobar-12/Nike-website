import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises"


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

export const handleLogOut =async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(204);
    const refreshToken = cookie.jwt;

    try
    {
        const userDB = await loadUserDB();

        const userFound = userDB.find(person => person.refreshToken === refreshToken);
        if (!userFound) {
            res.clearCookie('jwt',{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite:"None", secure:true }); // secure:true
            return res.sendStatus(403);
        }
        // delete token from DB

        const otherUsers = userDB.filter(person => person.refreshToken !== userFound.refreshToken);
        const currentUser = { ...userFound , refreshToken:'' };

        const updatedUserDB = [...otherUsers, currentUser];

        await fs.writeFile(userDBPath, JSON.stringify(updatedUserDB, null, 2));
        res.clearCookie('jwt',{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000 , sameSite:"None", secure:true}); // secure:true
        res.status(200).json({ message: "Logged out successfully" });

    }
    catch(err)
    {
        console.log(err);
        res.sendStatus(400);
    }
};
