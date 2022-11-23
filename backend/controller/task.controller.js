const Task  = require('../models/task.model');
const changelogTask = require('../models/changelog.task');
const changelogPhase = require('../models/changelog.phase');
const Sequelize = require('sequelize')
const PhaseProgress= require('../models/phaseprogress.models')
const { Op, where } = require("sequelize");
const EmployeesOnPhase = require('../models/employees.on.phase.model');
const TaskProgress = require('../models/taskprogress.models');


exports.createTask = async(req,res)=>{
   try {
    const st = new Date(req.body.startdate).toLocaleDateString();
      const et = new Date(req.body.enddate).toLocaleDateString();

    const user = await EmployeesOnPhase.findOne({
        where: {
          [Op.and]: [
            { userid: req.body.taskassignedto },
            { phaseid: req.params.phaseid },
            {  employeestatusphase: 'deployed' }
          ],
        },
      });
   
    
      if (!user) {
        return res.status(404).json("There's is no such user on the project to assign it")
      }
      const task = await Task.findOne({
        where: {
          [Op.and]: [
            { taskname: req.body.taskname },
            { phaseid: req.params.phaseid }
          ],
        },
      });
    
      const obj =  {taskname:req.body.taskname,taskassignedby:req.user.id,taskassignedto:req.body.taskassignedto,phaseid:req.params.phaseid,startdate:st,enddate:et,taskstatus:"incomplete",isactive:true,}
    if (task) {
        
        if (task.isactive ===true ) {
          return res.status(404).json({message:"Task already register"})
        }
        else{
            await changelogTask.create({
                taskname:task.taskname,
                taskassignedby:task.taskassignedby,
                taskassignedto:task.taskassignedto,
                  phaseid:task.phaseid,
                  updatedby:req.user.id,
                  startdate:task.startdate,
                  enddate:task.enddate,
                  taskstatus:task.taskstatus,
                  isactive:task.isactive,
            })
            await Task.update(
               obj,
               { where:{
                    taskname:req.body.taskname
                }} 
            )
            await PhaseProgress.update({ totaltasks: Sequelize.literal('totaltasks + 1') }, { where: { phaseid:  req.params.phaseid}})
            await TaskProgress.create({taskid:task.id})
        }
    }
    else{
     
        const task = await Task.create(
            obj
            
        )
        await PhaseProgress.update({ totaltasks: Sequelize.literal('totaltasks + 1') }, { where: { phaseid:  req.params.phaseid}})
        await TaskProgress.create({taskid:task.id})

    }
    return res.status(202).json({message:"Task succussfully assigned."})
  
    
   } catch (error) {
      return res.status(404).json({message:error.message})
   }
    
      
}

exports.getAlltasks=async(req,res)=>{
  try {
    const tasks= await Task.findAll({where:{[Op.and]: [{ phaseid: req.params.phaseid }, { isactive: true }]}})
    if(tasks.length==0){
      return res.status(400).json({message:"No tasks found on this phase."})
    }
    return res.status(200).json(tasks)
  } catch (error) {
    return res.status(500).json({message:error.message})
    
  }
}

exports.updateTask = async (req,res)=>{
  try {
    const task = await Task.findOne({
      where: {
          [Op.and]: [
            { taskname: req.body.currTaskname },
            { phaseid: req.params.phaseid }
          ],
        },
    });

    // console.log(task);
    if (!task||task.isactive===false) {
      return res.status(404).json({message:"No task found!"})
    }
    await changelogTask.create({
      taskname:task.taskname,
      taskassignedby:task.taskassignedby,
      taskassignedto:task.taskassignedto,
        phaseid:task.phaseid,
        updatedby:req.user.id,
        startdate:task.startdate,
        enddate:task.enddate,
        taskstatus:task.taskstatus,
        isactive:task.isactive,
  })
  await Task.update(
     req.body,
     { where:{
          taskname:req.body.currTaskname
      }} 
  )
  return res.status(201).json({message:"Task Updated successfully"})
  } catch (err) {
   res.status(500).json({message:err.message})
  }
}

exports.deleteTask = async (req,res)=>{
  try {
    const task = await Task.findOne({
      where: {
          [Op.and]: [
            { taskname: req.body.taskname },
            { phaseid: req.params.phaseid }
          ],
        },
    });
    if ( !task || task.isactive===false) {
      return res.status(404).json({message:"Task is already removed or this task does not exist"})
    }
    await Task.update(
      {isactive:false},
      { where:{
           taskname:req.body.taskname
       }} 
   )
   await PhaseProgress.update({ totaltasks: Sequelize.literal('totaltasks - 1') }, { where: { phaseid:  req.params.phaseid}})
   await TaskProgress.destroy({
    where: {
      taskid:task.id
    }
})

   return res.status(201).json({message:"Task Updated successfully"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}
exports.updatetaskprogress=async(req,res)=>{
  try {
    const task =await Task.findOne({where:{[Op.and]:[{phaseid:req.params.phaseid},{id:req.body.taskid}]}})

    if(req.user.id==task.taskassignedto){
      if(req.body.progress<=10)
      {
        const taskprogress=await TaskProgress.findOne({where:{taskid:req.body.taskid}})
        if(eval(`${taskprogress.progress}+${req.body.progress}`)>=100){
          return res.status(200).json({message:"request sent to senior to complete task"})
        }
      await TaskProgress.update({progress:Sequelize.literal(`progress+${req.body.progress}`)},{where:{taskid:req.body.taskid}})
        return res.status(200).json({mesasge:"Progress updated successfully"})
    
  }
  return res.status(400).json({mesasge:'Cannot update progress more than 10 percent'})
}
return res.status(404).json({message:"You do not have rights to access this path."})
} catch (error) {
    return res.status(500).json({message:error.message})
    
  }
}