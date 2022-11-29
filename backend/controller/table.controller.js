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
const { json } = require('body-parser');

exports.createAlltables=async(req,res)=>{
    try {
        await Role.sync();
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
        return res.status(200).json({success:true,message:"All Tables created successfully."})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }
}
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

