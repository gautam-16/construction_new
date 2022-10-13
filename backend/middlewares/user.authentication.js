const jwt = require("jsonwebtoken");
require('dotenv').config({path:'backend/config/.env'})
exports.isAuthenticated =async(req,res,next)=>{
  const authHeader = req.headers.authorization 
  if (authHeader) {
      const token = authHeader.split(' ')[1]
     const user= jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.user = user
        //   console.log(req.user);
          next()
      });
  } else {
      res.sendStatus(401);
  }
  }