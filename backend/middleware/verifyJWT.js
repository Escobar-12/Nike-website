import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);

    console.log("Verifying JWT...");
    
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log("Invalid or expired token");
            return res.status(403).json({ message: "Forbidden: Invalid token" }); 
        }

        console.log("JWT verified successfully!");
        req.user = decoded.username; 
        next();
    });
};

export default verifyJWT;
