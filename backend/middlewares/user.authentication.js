const jwt = require("jsonwebtoken");

exports.isAuthenticated =async(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1]
      //   console.log(token)
       const user= jwt.verify(token, process.env.JWT_SECRET)
          if (err) 
          {
          return res.status(403).json({message:"Please Login First.Unauthorized to access this path"});
          }
          else
          {
          req.user = user;
          console.log(user);
          next();
          }
        }
 catch (error) {
    return res.status(500).json({message:error.message}) 
    }
}