const express=require('express')
const changelogProject=require('../models/changelog.project')
const changelogUser = require('../models/changelog.user')
const EmployeesOnProject=require('../models/employees.on.project.model')
const Images=require('../models/images.model')
const Message=require('../models/message.models')
const Notification=require('../models/notification.model')
const Phase=require('../models/phase.model')
const PhaseProgress=require('../models/phaseprogress.models')
const Project=require('../models/project.model')
const ProjectProgress=require('../models/projectprogress.model')
const Role=require('../models/role.model')
const Task=require('../models/task.model')
const TaskProgress=require('../models/taskprogress.models')
const User=require('../models/user.model')
const changelogPhase=require('../models/changelog.phase')
const EmployeesOnPhase=require('../models/employees.on.phase.model')
const changelogTask=require('../models/changelog.task')
const apifeature=require('../models/api_feature')
const { json } = require('body-parser');
const { Op } = require("sequelize");

exports.createAlltables=async(req,res)=>{
    try {
        await Role.sync({alter:true});
        await User.sync();
        await Project.sync();
        await Phase.sync();
        await Task.sync();
        await EmployeesOnProject.sync(); 
        await EmployeesOnPhase.sync();
        await ProjectProgress.sync();
        await PhaseProgress.sync();
        await TaskProgress.sync();
        await Message.sync();
        await Notification.sync();
        await Images.sync();
        await changelogUser.sync();
        await changelogProject.sync();
        await changelogPhase.sync();
        await changelogTask.sync()
        await apifeature.sync()
        return res.status(200).json({success:true,message:"All Tables created successfully."})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }
}
exports.roleCreate=async(req,res)=>{
    try {
        console.log(req.body.rolename,req.body.permissions)
    const role=await Role.findOne({where:{rolename:req.body.rolename}})
        if(role){
            return res.status(400).json({message:"Role already exists"})
        }
        else{
           await Role.create({
                rolename:req.body.rolename,
                level:req.body.level,
                permissions:req.body.permissions,   
            }).then(()=>{return res.status(201).json({message:"Role created successfully"})}).catch((err)=>{return res.status(400).json({message:err.message})})
        }
    }
     catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}

exports.Insertapifeatures=async(req,res)=>{
    try { 
        console.log(req.body)
        const feature=await apifeature.findOne({where:{[Op.and]:[{apiname:req.body.apiname},{api_status:'active'}]}})
        console.log(feature)
        if(feature==null){
            console.log(req.body.api_status,req.body.apiname,req.body)
            await apifeature.create({
                apiname:req.body.apiname,
                api_status:req.body.api_status
            })
        return res.status(201).json({message:"Inserted api successfully."})
        }
        else return res.status(400).json({message:"Api already exists"})
    }
    catch(error){
        return res.status(500).json({message:error.message})

    }
}
exports.Findallapifeatures=async(req,res)=>{
    try { 
        console.log(req.body)
        const feature=await apifeature.findAll()
        obj={}
        for(i of feature){
            x=i.apiname
            y=i.id
            obj[x]=y
            
        }
        return res.status(200).json({obj})
    }
    catch(error){
        return res.status(500).json({message:error.message})

    }
}

