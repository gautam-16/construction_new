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
    
    if (task) {
        
        if (task.isactive ===true ) {
            return res.status(404).json({message:"Task already register"})
        }
        else{
          const obj =  {taskname:req.body.taskname,taskassignedby:req.user.id,taskassignedto:req.body.taskassignedto,phaseid:req.params.phaseid,startdate:st,enddate:et,taskstatus:"incomplete",isactive:true,}
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
            const task = await Task.update(
               obj,
               { where:{
                    taskname:req.body.taskname
                }} 
            )
        }
    }
    else{
        const task = await Task.create({
            obj,
            
        })
        await PhaseProgress.update({ totaltasks: Sequelize.literal('totaltasks + 1') }, { where: { phaseid:  req.params.phaseid}})

    }
    return res.status(202).json({message:"Task succussfully assigned"})
  
    
   } catch (error) {
      return res.status(404).json({message:error.message})
   }
    
      
}

exports.getAlltasks=async(req,res)=>{
  try {
    const tasks= await Task.findAll({where:{[Op.and]: [{ phaseid: req.params.phaseid }, { isactive: true }]}})
    if(tasks.length==0){
      return res.status(400).json({message:"No tasks found on this phase"})
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
            { taskname: req.body.taskname },
            { phaseid: req.params.phaseid }
          ],
        },
    });

    // console.log(task);
    if (!task||task.isactive===false) {
      return res.status(404).json({message:"There's no such task ,firstly create task"})
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
          taskname:req.body.taskname
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
      return res.status(404).json({message:"Task already removed or there's no such task"})
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