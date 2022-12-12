const Message=require('../models/message.models')
const EmployeeOnPhase=require('../models/employees.on.phase.model')
const EmployeesOnProject = require('../models/employees.on.project.model')
const { Op, where } = require("sequelize");

exports.broadcastMessage=async(req,res)=>{
    try {
        const query=req.body.key == "projectname"? EmployeesOnProject: EmployeeOnPhase;
        const employees=await query.findAll({where:{[req.body.key]:req.params.value}})
      console.log(employees);
        arr=[]
        for(i of employees){
            arr.push(i.id)
        }
        for (i of arr){
        const message=await Message.create({
            senderid:req.user.id,
            recieverid:i,
            message:req.body.message

        })}
        return res.status(200).json({"Message":"Message sent in the group successfully."})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

exports.sendMessagetoAllusers=async(req,res)=>{
    try {
        const employees=await EmployeesOnProject.findAll()
        arr=[]
        for (i of employees){
            arr.push(i.id)
        }
        for (i of arr){
            const message=await Message.create({
                senderid:req.user.id,
                recieverid:i,
                message:req.body.message
            })
        }
        return res.status(200).json({"message":"Message sent to all projects."})
        
    } catch (error) { 
        return res.status(500).json({message:error.message})
        
    }

}
exports.sendMessagetoUser=async(req,res)=>{
    try {
        const user= await EmployeesOnProject.findOne({where:{[Op.and]:[{id:req.body.id},{projectname:req.params.projectname}]}})
        if(!user){
            return res.status(404).json({"Message":"No user found to send message."})
        }
        const message=await Message.create({
            senderid:req.user.id,
            recieverid:req.body.id,
            message:req.body.message

        })
        return res.status(200).json({"message":"message sent successfully."})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}
exports.getAllmessages=async(req,res)=>{
    try {
        const user=await EmployeesOnProject.findOne({where:{projectname:req.params.projectname}})
        const messages=await Message.findall({where:{recieverid:req.user.id}})
        if(!messages){

        }
        console.log(message)
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}