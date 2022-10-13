const createTableRole =require('../models/role.model');
const createTableStatus=require('../models/status.model')

exports.roleCreate = async(req,res)=>{
    try {
      y=Object.values(req.body)
      x=Object.keys(req.body)
    count=-1;
for(i=0;i<x.length;i++){
    // console.log(x[i])
    count=count+1;
    // console.log(count)
    for(j=0;j<count;j++){
        // console.log(j)
    }
    // console.log(y[j])
    await createTableRole.create({rolename:x[i],level:y[i]})
}     
        return res.status(200).json({message:"Role is successfully inserted"})
       
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.statusCreate = async(req,res)=>{
    try {
     
       var x=Object.values(req.body)

       for(i of x){

       await createTableStatus.create({statusname:i})
       }
        return res.status(200).json({message:"Status is successfully inserted"})
       
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}