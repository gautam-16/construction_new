const express=require('express')
const createTableEmployeesOnProject=require('../models/employees.on.project.model')
const createTableImages=require('../models/images.model')
const createTableNotification=require('../models/notification.model')
const createTablePhase=require('../models/phase.model')
const createTableProject=require('../models/project.model')
const createTableProjectProgress=require('../models/projectprogress.model')
const createTableRole=require('../models/role.model')
const createTableStatus=require('../models/status.model')
const createTableTask=require('../models/task.model')
const createTableUser=require('../models/user.model')
exports.createTableEmployeesOnProject= async(req,res)=>{
    console.log();
    try{
        await createTableEmployeesOnProject.sync();
        return res.status(200).json({success:true,message:"Employees on project table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableImages= async(req,res)=>{
    try{
        await createTableImages.sync();
        return res.status(200).json({success:true,message:"Images table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableNotification= async(req,res)=>{
    try{
        await createTableNotification.sync();
        return res.status(200).json({success:true,message:"Notification table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTablePhase= async(req,res)=>{
    try{
        await createTablePhase.sync();
        return res.status(200).json({success:true,message:"Phase table created successfully."})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createProjectTable= async(req,res)=>{
    try{
        await createTableProject.sync();
        return res.status(200).json({success:true,message:" Project Table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableProjectProgress= async(req,res)=>{
    try{
        await createTableProjectProgress.sync();
        return res.status(200).json({success:true,message:"Project Progress table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableRole= async(req,res)=>{
    try{
        await createTableRole.sync();
        return res.status(200).json({success:true,message:" Role Table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableStatus= async(req,res)=>{
    try{
        await createTableStatus.sync();
        return res.status(200).json({success:true,message:"Status table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableTask= async(req,res)=>{
    try{
        await createTableTask.sync();
        return res.status(200).json({success:true,message:"Task table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}
exports.createTableUser= async(req,res)=>{
    try{
        await createTableUser.sync();
        return res.status(200).json({success:true,message:" User Table created successfully."})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }

}