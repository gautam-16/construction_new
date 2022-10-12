const createTableRole =require('../models/role.model');

exports.roleCreate = async(req,res)=>{
    try {
        await createTableRole.create({RoleName:req.body.role})
        return res.status(200).json({createTableRole,message:"Role is successfully inserted"})
       
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}