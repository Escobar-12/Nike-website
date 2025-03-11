import { AllowedOrigins } from "../config/allowedOrigins.js";


export const credentials = (req,res,next) =>
{
    const origin = req.headers.origin;
    if(AllowedOrigins.includes(credentials))
    {
        res.header("Access-Control-Allow-Credentials",true);
    }
    next();
}