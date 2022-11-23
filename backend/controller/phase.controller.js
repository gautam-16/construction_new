const sequelize=require('../server')
const Phase=require('../models/phase.model');
const Project = require('../models/project.model');
const Role = require("../models/role.model");
const { Op, where } = require("sequelize");
const EmployeesonProject = require("../models/employees.on.project.model");
const changelogPhase = require('../models/changelog.phase')
const EmployeesOnPhase = require('../models/employees.on.phase.model');
const PhaseProgress = require('../models/phaseprogress.models');

exports.createPhase=async(req,res)=>{
    try {
      if (
        (req.user.level == 1 && req.user.designation == "Admin") ||
        (req.user.level == 0 && req.user.designation == "Superadmin")
        ) {
          const st = new Date(req.body.phasestartdate).toLocaleDateString();
          const et = new Date(req.body.phaseenddate).toLocaleDateString();
          duplicatephase= await Phase.findOne( {where: {
            [Op.and]: [
              { projectname: req.params.projectname },
              { phasename:req.body.phasename},]}})
          
              if(duplicatephase==null){
                const phase = await Phase.create({
                    phasename: req.body.phasename,
                    projectname: req.params.projectname,
                    phaseweightage: req.body.phaseweightage,
                    projectmanager: req.body.projectmanager,
                    phasestartdate:st,
                    phaseenddate:et,
                    createdbyadmin:req.body.createdbyadmin,
                    phasestatus: req.body.phasestatus,
                    metadata: req.body.metadata,
                  });
                  await PhaseProgress.create({phaseid:phase.id})
                  return res.status(200).json({ phase, message: "Phase created successfully." });
            }
            else{
                return res.status(400).json({message: "Phase already exists." });
            }
            
          } 
          else {
            return res.status(404).json({ message: "You don't have rights to access this path." });
          }
        
    } catch (error) {
      
        res.status(500).json({message:error.message})
    }
}


exports.assignUserOnPhase = async(req,res)=>{
try {
  const user = await EmployeesonProject.findOne({
    where: {
      [Op.and]: [
        { userid: req.body.userid },
        { projectname: req.body.projectname },
        {  employeestatus: 'deployed' }
      ],
    },
  });
  console.log(user);
  if (!user) {
    return res.status(404).json("There's is no such user on the project to assign it")
  }
  

  const role = await Role.findAll({
    where: {
      [Op.or]: [
        { rolename: req.user.designation },
        { rolename: user.userdesignation },
        
      ],
    },
  });
  // console.log(role[1]);
  if (!role[1] && req.user.level>=1) {
    return res.status(404).json("You dont have access for it")
  }
if (( req.user.level >= role[1].level) && (req.user.level>=2 || role[0].department != role[1].department )) {
    return res.status(404).json("You dont have access for it")
  }
    
    const duplicateuser = await EmployeesOnPhase.findOne({
      where: {
        [Op.and]: [
          { userid: req.body.userid },
          { phaseid: req.params.phaseid }
        ],
      },
    });

  if (duplicateuser) {
    if (duplicateuser.employeestatusphase=='deployed') {
      return res
        .status(400)
        .json({ message: "User already exists for the given project." });
    }
    else{
          await EmployeesOnPhase.updateOne({employeestatusphase:"deployed"},{ where: {
            [Op.and]: [
              { userid: req.body.userid },
              { phaseid: req.params.phaseid },
            ],
          }},).then(()=>{return res.status(202).json(`uccessfully assigned on phase ${req.params.phase}`)})
    }
  }
  
  data = await EmployeesOnPhase.create({
    userid: req.body.userid,
    designation: user.userdesignation,
    assignedbyphase: req.user.id,
    phaseid : req.params.phaseid,
    projectname:req.body.projectname,
    nameofuser: user.nameofuser,
    employeestatusphase: "deployed",
  });
  return res.status(201).json({
    data,
    message: `${user.userdesignation} created successfully`,
  });


} catch (error) {
  // error.errors.forEach((data)=>{

  //   res.status(500).json(
  //     {message:{ [data.path]:data.message} } 
  //      );
  // })
  res.status(500).json({message:error.message})
}

 
  
   
}

exports.getallPhaseonProject=async(req,res)=>{
    try {
        const allphase=await Phase.findAll({where:{projectname:req.params.projectname}})
        if(allphase.length==0){
            return res.status(404).json({message:"No phase is alloted to this project."})
        }
        else{
            return res.status(200).json({allphase})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}
exports.getOnePhaseonProject=async(req,res)=>{
    try {
        const phase=await Phase.findOne({where:{id:req.body.phaseid}})
        if(phase==null){
            return res.status(404).json({message:"No phase alocated on this Project."})
        }
        else{
            return res.status(200).json({phase})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}


exports.updateOnePhase =  async(req,res)=>{
  try {
    const phase = await Phase.findByPk(req.params._id);
    const duplicatephase=await Phase.findOne({where:{phasename:req.body.phasename}})
    console.log(duplicatephase)
    if(duplicatephase){
      return res.status(400).json({message:"Phasename already exists"})
    }
    if (req.user.level <= 1) {
      if (phase.isactive == false) {
        return res.status(500).json("Phase is n longer available");
      } else {
        await changelogPhase
          .create({
            phaseid:phase.id,
            phasename:phase.phasename,
            projectname:phase.projectname,
            phaseweightage: phase.phaseweightage,
            phasestartdate: phase.phasestartdate,
            phaseenddate: phase.phaseenddate,
            phasestatus: phase.phasestatus,
            isactive:phase.isactive,
            createdbyadmin:phase.createdbyadmin,
            updatedbyadmin:req.user.id,
            metadata:phase.metadata
          })
          .then(async() => {
           await Phase.update(req.body, { where: { id: req.params._id } })
             
                return res.status(200).json({ message: "Successfuly Updated" });
             
          })
          .catch((error) => {
            return res.status(500).json({message:error.message});
          });
      }
    } else {
      return res.status(404).json("You don't have the rights to access this path.");
    }
  } catch (error) {
    error.errors.forEach((data)=>{

      res.status(500).json(
        {message:{ [data.path]:data.message} } 
         );
    })
  }

}

exports.deleteOnePhase = async (req, res) => {
  try {
    const phase = await Phase.findByPk(req.params._id);
    if (req.user.level <= 1) {
      if (phase.isactive == false) {
        return res.status(500).json("Phase is already Deleted");
      } else {
        phase.update({ isactive: false }, { where: { id: req.params._id } })
          .then(() => {
            return res
              .status(200)
              .json({ message: "Phase Successfuly Deleted" });
          })
          .catch((error) => {
            return res.status(500).json({message:error.message});
          });
      }
    } else {
      return res.status(404).json("You don't have the rights to access this path.");
    }
  } catch (error) {return res.status(500).json({message:error.message})}
};
exports.getallEmployeesonPhase=async(req,res)=>{
  try {
    const employees=await EmployeesOnPhase.findAll({where:{phaseid:req.params.phaseid}})
    if(employees.length==0){
      return res.status(404).json({message:"No user assigned on this phase."})
    }
     else {
      arr = [];
      for (i of employees) {
        arr.push(i.dataValues);
      }
      res.status(200).json(arr);
    }

  }
   catch (error) {
    return res.status(500).json({message:error.message})
    
  }
}
exports.getemployeesdeployedonPhase = async (req, res) => {
  try {
    const employees = await EmployeesOnPhase.findAll({
      where: {
        [Op.and]: [
          { phaseid: req.params.phaseid },
          { employeestatus: "deployed" },
        ],
      },
      
      attributes: [
        "nameofuser",
        "assignedby",
        "employeestatus",
        "userdesignation",
        "userid",
      ],
    });
    if (employees.length == 0) {
      res.status(404).json("No user deployed on phase.");
    } else {arr = [];
      for (i of employees) {
        arr.push(i.dataValues);
      }
      res.status(200).json(arr);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getemployeesremovedfromPhase = async (req, res) => {
  try {
    const employees = await EmployeesOnPhase.findAll({
      where: {
        [Op.and]: [
          { phaseid: req.params.phaseid },
          { employeestatus: "removed" },
        ],
      },
      attributes: [
        "nameofuser",
        "assignedby",
        "employeestatus",
        "userdesignation",
        "userid",
      ],
    });
    if (employees.length == 0) {
      res.status(404).json("No user deployed on phase.");
    } else {arr = [];
      for (i of employees) {
        arr.push(i.dataValues);
      }
      res.status(200).json(arr);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteUserFromPhase = async (req, res) => {
  try {
    const user = await EmployeesOnPhase.findOne({
      where: {
        [Op.and]: [
          { userid: req.body.userid },
          { phaseid: req.params.phaseid },
          { employeestatusphase:'deployed'}
        ],
      },
    });
    if (!user) {
      return res.status(404).json("User does not exit on this project")
    }
    
    const role = await Role.findAll({});
    if ( (req.user.level < role[1].level && role[0].department == role[1].department) ||req.user.level <= 1
    )  {
      if (user.employeestatusphase == "removed" || user.length == 0) {
        res.status(200).json({message: "Employee is already removed or user does not exits",});
      }
         const removed=await EmployeesOnPhase.update({ employeestatusphase: "removed" },
          { where: 
           { [Op.and]:[
              { userid: req.body.userid }, 
              {phaseid:req.params.phaseid}]}});
        return res.status(200).json({ message: "User removed from project." });
      }
    else{
      return res.status(404).json("You don't have the rights to access this path.")
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
