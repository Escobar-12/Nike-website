export const VerifyRoles = (...allowedRoles) =>
{
    return (req,res,next)=>
    {
        console.log(req.roles);
        if(!req?.roles) 
            {
                console.log("No roles");
                return res.sendStatus(401);
            }
        const allowRoles = [...allowedRoles];
        const role = req.roles.map(role => allowedRoles.includes(role)).find(val => val===true);
        if(!role) 
            {
                console.log("No access allowed");
                return res.sendStatus(401);
            }
        next();
    }
}
