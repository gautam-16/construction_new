const sequelize=require('../server')
const Phase=require('../models/phase.model');
const Project = require('../models/project.model');
const changelogPhase = require('../models/changelog.phase');
const EmployeesOnPhase = require('../models/employees.on.phase.model');
const { EmployeesonPhase } = require('./table.controller');
const { Op, where } = require("sequelize");


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
          console.log(duplicatephase);
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
        return res.status(500).json({message:error.message})
        
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
    if (req.user.level <= 1) {
      if (phase.isactive == false) {
        return res.status(500).json("Phase is not longer available");
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
    return res.status(500).json({message:error.message});
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
    const employees=await EmployeesOnPhase.findAll({where:{phasename:req.params.phasename}})
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
    const employees = await EmployeesonPhase.findAll({
      where: {
        [Op.and]: [
          { phasename: req.params.phasename },
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
    const employees = await EmployeesonPhase.findAll({
      where: {
        [Op.and]: [
          { phasename: req.params.phasename },
          { employeestatus: "Removed" },
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
    const user = await EmployeesonPhase.findOne({
      where: {
        [Op.and]: [
          { userid: req.body.userid },
          { phasename: req.params.phasename },
        ],
      },
    });
    const role = await Role.findAll({
      where: {
        [Op.or]: [
          { rolename: req.user.designation },
          { rolename: user.userdesignation },
        ],
      },
    });
    if ( (req.user.level < role[1].level && role[0].department == role[1].department) ||req.user.level <= 1)  { 
      if (user.employeestatus == "Removed" || user.length == 0) {
        res.status(200).json({message: "Employee is already removed or user does not exits"});
      } 
      else {
         await EmployeesonPhase.update({ employeestatus: "Removed" },{where: {[Op.and]:[{ userid: req.body.userid }, 
              {phasename:req.params.phasename}]}});

        return res.status(200).json({ message: "User removed from phase" });
      }
    }
    else{
      return res.status(404).json("You dont have the rights to access this.")
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
