import jwt from "jsonwebtoken";

export const authUser = (req,res,next)=>{
    const {token} = req.headers;

    
    
    jwt.verify(token,process.env.JWT_SECRET,(err,data)=>{
        if(err) {
           return res.json({success:false,message:"Unauthorized User Login Again"});
        } else {
             
            req.body.userId = data.id;
            next();
        }
    })
}