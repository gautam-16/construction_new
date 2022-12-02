const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
exports.isAuthenticated =async(req,res,next)=>{
    try {
        const users = await User.findAll({where:{
            isactive:true
            }})
            if (users==0) {
                req.user={created_by:1}
                next()
                return
            }
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            const user= jwt.verify(token, process.env.JWT_SECRET)
              req.user = user;
              next();
        }else{
            return res.status(404).json("Please login first")
        }
       
          }
 catch (error) {
    return res.status(500).json({message:error.message}) 
    }
}