const jwt = require("jsonwebtoken");

exports.isAuthenticated =async(req,res,next)=>{
    try{ 
         let x=`${req.headers.authorization}`
          x = x.slice(7, x.length);
          // console.log(x)
        const user = jwt.verify(x,"SATYAM");
       if(!user){
        res.status(401).json({
            message:"Please login first"
        });
    }
    next();
  }
  catch(error){
    res.status(500).json({
        success:false,
        message:error.message
  
    })
  }
  }