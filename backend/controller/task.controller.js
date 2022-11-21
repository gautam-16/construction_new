const Task  = require('../models/task.model');
const changelogTask = require('../models/changelog.task');
const changelogPhase = require('../models/changelog.phase');
const PhaseProgress= require('../models/phaseprogress.models')
const { Op, where } = require("sequelize");
const EmployeesOnPhase = require('../models/employees.on.phase.model');
exports.createTask = async(req,res)=>{
   try {
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
      const st = new Date(req.body.startdate).toLocaleDateString();
      const et = new Date(req.body.enddate).toLocaleDateString();
    const duplicateTask = await Task.findOne({
        where: {
            [Op.and]: [
              { taskname: req.body.taskname },
              { phaseid: req.params.phaseid }
            ],
          },
      });
    if (duplicateTask) {
        
        if (duplicateTask.taskstatus=='ongoing' || duplicateTask.taskstatus=='completed' ) {
            return res.status(404).json({message:"Task already register"})
        }
        else{
            await changelogPhase.create({
                taskname:duplicateTask.taskname,
                taskassignedby:duplicateTask.taskassignedby,
                taskassignedto:duplicateTask.taskassignedto,
                  phaseid:duplicateTask.phaseid,
                  updatedby:req.user.id,
                  startdate:duplicateTask.startdate,
                  enddate:duplicateTask.enddate,
                  taskstatus:duplicateTask.taskstatus,
                  isactive:duplicateTask.isactive,
            })
            const task = await Task.updateOne(
                {taskname:req.body.taskname,
                taskassignedby:req.user.id,
                taskassignedto:req.body.taskassignedto,
                  phaseid:req.params.phaseid,
                  startdate:st,
                  enddate:et,
                  taskstatus:"ongoing",
                  isactive:true,},
               { where:{
                    taskname:req.body.taskname
                }} 
            )
        }
    }
    else{
        const task = await Task.create({
            taskname:req.body.taskname,
              taskassignedby:req.user.id,
              taskassignedto:req.body.taskassignedto,
                phaseid:req.params.phaseid,
                startdate:st,
                enddate:et,
                taskstatus:"ongoing",
                isactive:true,
            
        })
    }
  
    await PhaseProgress.updateOne({ totaltasks: Sequelize.literal('totaltasks + 1') }, { where: { phaseid:  req.params.phaseid}})

    return res.status(202).josn({message:"Task succussfully assigned"})
   } catch (error) {
      return res.status(404).json({message:error.message})
   }
    
      
}


