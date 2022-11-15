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
const Status=require('../models/status.model')
const Task=require('../models/task.model')
const TaskProgress=require('../models/taskprogress.models')
const User=require('../models/user.model')
exports.createTableEmployeesOnProject= async(req,res)=>{
    console.log();
    try{
        await EmployeesOnProject.sync();
        return res.status(200).json({success:true,message:"Employees on project table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableImages= async(req,res)=>{
    try{
        await Images.sync();
        return res.status(200).json({success:true,message:"Images table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableNotification= async(req,res)=>{
    try{
        await Notification.sync();
        return res.status(200).json({success:true,message:"Notification table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTablePhase= async(req,res)=>{
    try{
        await Phase.sync();
        return res.status(200).json({success:true,message:"Phase table created successfully."})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createProjectTable= async(req,res)=>{
    try{
        await Project.sync();
        return res.status(200).json({success:true,message:" Project Table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableProjectProgress= async(req,res)=>{
    try{
        await Progress.sync();
        return res.status(200).json({success:true,message:"Project Progress table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableRole= async(req,res)=>{
    try{
        await Role.sync();
        return res.status(200).json({success:true,message:" Role Table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableStatus= async(req,res)=>{
    try{
        await Status.sync();
        return res.status(200).json({success:true,message:"Status table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableTask= async(req,res)=>{
    try{
        await Task.sync();
        return res.status(200).json({success:true,message:"Task table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableUser= async(req,res)=>{
    try{
        await User.sync();
        return res.status(200).json({success:true,message:" User Table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}

exports.createTablechangelogProject= async(req,res)=>{
    try{
        await changelogProject.sync();
        return res.status(200).json({success:true,message:" changelog Project Table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTablechangelogUser= async(req,res)=>{
    try{
        await changelogUser.sync();
        return res.status(200).json({success:true,message:" changelog User Table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableMessage= async(req,res)=>{
    try{
        await Message.sync();
        return res.status(200).json({success:true,message:"Message Table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}

exports.createTablePhaseProgress= async(req,res)=>{
    try{
        await PhaseProgress.sync();
        return res.status(200).json({success:true,message:"Phase Progress Table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}

exports.createTableTaskProgress= async(req,res)=>{
    try{
        await TaskProgress.sync();
        return res.status(200).json({success:true,message:"Task Progress Table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}



exports.createAlltables=async(req,res)=>{
    try {
        await EmployeesOnProject.sync(); 
        await Images.sync();
        await Notification.sync();
        await Notification.sync();
        await Phase.sync();
        await Project.sync();
        await Progress.sync();
        await Role.sync();
        await Status.sync();
        await Task.sync();
        await User.sync();
        await changelogProject.sync();
        await changelogUser.sync();
        await Message.sync()
        await PhaseProgress.sync()
        await TaskProgress.sync()

        return res.status(200).json({success:true,message:" All Tables created successfully."})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }
}