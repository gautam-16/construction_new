const createTableRole =require('../models/role.model');
const createTableStatus=require('../models/status.model')

exports.roleCreate = async(req,res)=>{
    try {
        console.log(req.body)
       var x=Object.values(req.body)
       console.log(x)
       for(i of x){
        console.log(i)
       await createTableRole.create({rolename:i})
       }
        return res.status(200).json({message:"Role is successfully inserted"})
       
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.statusCreate = async(req,res)=>{
    try {
        console.log(req.body)
       var x=Object.values(req.body)
       console.log(x)
       for(i of x){
        console.log(i)
       await createTableStatus.create({statusname:i})
       }
        return res.status(200).json({message:"Status is successfully inserted"})
       
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}