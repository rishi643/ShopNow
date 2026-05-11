import jwt from "jsonwebtoken";

const adminAuth = async (req,res,next) => {
    try {
        const {token} = req.headers
        if(!token) {
            return res.json({success:false,message:"Not Authorized Login Again"});
        }
        
        jwt.verify(token,process.env.JWT_SECRET,(err,data)=>{
            // console.log("ok");
            if(err) {
                return res.json({success:false,message:"Not Authorized Login Again"});
            } else {
                next();
            }
        });
        
    } catch (error) {
        return res.json({success:false,message:"Not Authorized Login Again"});
    }
};
export default adminAuth;