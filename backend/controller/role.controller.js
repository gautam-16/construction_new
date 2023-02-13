const sequelize=require('../server')
const Phase=require('../models/phase.model');
const Project = require('../models/project.model');
const Role = require("../models/role.model");
const { Op, where } = require("sequelize");
const EmployeesonProject = require("../models/employees.on.project.model");
const changelogPhase = require('../models/changelog.phase')
const EmployeesOnPhase = require('../models/employees.on.phase.model');
const PhaseProgress = require('../models/phaseprogress.models');
const Task  = require('../models/task.model');
const changelogTask = require('../models/changelog.task');
const User = require('../models/user.model');



exports.createRole=async(req,res)=>{
    try {

        
        const role=await Role.findAll({where:{rolename:req.body.rolename}})
        console.log(role)
        if(role==[]){
            return res.status(400).json({message:"Role already exists"})
        }
        else{
            const role=await Role.create({
                rolename:req.body.rolename,
                level:req.body.level,
                permissions:req.body.permissions,
                department:req.body.department
            })
            return res.status(200).json({message:` New role ${role} created successfully.`})
        }
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
    
}

exports.findRole=async(req,res)=>{
    try {
        const role=await Role.findAll({where:{rolename:req.body.rolename}})
        if(!role){
            return res.status(400).json({message:"Role does not exists"})
        }
        else{ return res.status(200).json({role})}
           
        }
         catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}
exports.updateRole=async(req,res)=>{
    try {  

        let role=await Role.findOne({where:{rolename:req.body.rolename}})
        if(!role){
            return res.status(400).json({message:"Role does not exists"})
        }
      
        else{ 
            role=await Role.findOne({where:{rolename:req.body.rolename}})
                const f=req.body.permissions.filter((x,y)=>{
                    if(!role.dataValues.permissions.includes(x)){
                        role.dataValues.permissions.push(x)
                    }
                })
                role=await Role.update({permissions:role.dataValues.permissions},{where:{rolename:req.body.rolename}})
                return res.status(200).json({role,message:"Permissions updated successfully."})
            }
        }

         catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}
exports.removeRolePermissions=async(req,res)=>{
    try {  

        let role=await Role.findOne({where:{rolename:req.body.rolename}})
        if(!role){
            return res.status(400).json({message:"Role does not exists"})
        }
      
        else{ 
            role=await Role.findOne({where:{rolename:req.body.rolename}})
            console.log(role.dataValues.permissions)
           var x=role.dataValues.permissions.filter((a,b)=>{
                if(a!=req.body.permissions[b])return a;
            })
            console.log(x)
            role=await Role.update({permissions:x},{where:{rolename:req.body.rolename}})
                return res.status(200).json({role,message:"Permissions updated successfully."})

            }
        
    }
    catch(error){
        return res.status(500).json({message:error.message})

    }
}
