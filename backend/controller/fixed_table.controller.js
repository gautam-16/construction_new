const { json } = require('body-parser');
const Role =require('../models/role.model');
const Status=require('../models/status.model')



exports.roleCreate=async(req,res)=>{
    try {
        x=Object.keys(req.body)
        y=Object.values(req.body)
        // console.log(x)//will give all the roles

        y1=[];
    for( i of y){
    y1.push((Object.keys(i).toString()))
        }
        // console.log(y1)//will give all department details
        y2=[];
        for( i of y){
           y2.push((Object.values(i).toString()))
        }
        // console.log(y2)//will give all the level details

        count=-1;
         for(i=0;i<x.length;i++){
        // console.log(x[i])
             count=count+1;
        //     // console.log(count)
             for(j=0;j<count;j++){
                //   console.log(j)
             }
            //   console.log(y1[j])
            //   console.log(y2[j])
             await Role.create({rolename:x[i],level:y2[i],department:y1[i]})
         }     
       return res.status(200).json({message:"Role is successfully inserted"})

        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}
exports.statusCreate = async(req,res)=>{
    try {
     
       var x=Object.values(req.body)

       for(i of x){

       await Status.create({statusname:i})
       }
        return res.status(200).json({message:"Status is successfully inserted"})
       
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
