import { AllowedOrigins } from "./allowedOrigins.js";

export const corsOptions ={ origin :(origin,callback)=>
{
    if(AllowedOrigins.indexOf(origin) !== -1 || !origin)
    {
        callback(null,true);
    }
    else{
        callback(new Error('Not allowed by CORS'));
    }
    
},optionSuccessStatus:200};