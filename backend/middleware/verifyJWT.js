import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isInBlackList } from "../config/blockedAccessTokens.js";

dotenv.config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

    console.log("Verifying JWT...");
    
    const token = authHeader.split(" ")[1];
    if(isInBlackList(token))
    {
        console.log("Token is blacklisted");
        return res.status(403).json({ message: "Forbidden: Token is revoked" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log("Invalid or expired token");
            return res.status(403).json({ message: "Forbidden: Invalid token" }); 
        }

        console.log("JWT verified successfully!");
        req.user = decoded.userInfo.username;
        req.roles = decoded.userInfo.roles;
        next();
    });
};

export default verifyJWT;
