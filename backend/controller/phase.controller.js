const sequelize=require('../server')
const Phase=require('../models/phase.model');
const Project = require('../models/project.model');
const changelogPhase = require('../models/changelog.phase')


exports.createPhase=async(req,res)=>{
    try {
      if (
        (req.user.level == 1 && req.user.designation == "Admin") ||
        (req.user.level == 0 && req.user.designation == "Superadmin")
        ) {
          const st = new Date(req.body.phasestartdate).toLocaleDateString();
          const et = new Date(req.body.phaseenddate).toLocaleDateString();
          console.log(et,st)
          duplicatephase= await Phase.findOne({where:{phasename:req.body.phasename}})
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
                  return res.status(200).json({ phase, message: "Phase created successfully" });
            }
            else{
                return res.status(400).json({message: "Phase already exists." });
            }
            
          } 
          else {
            return res.status(404).json({ message: "You don't have rights to access this path" });
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
            return res.status(404).json({message:"No such phase exists on this Project."})
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
      return res.status(404).json("You don't have access");
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
      return res.status(404).json("You dont have access for it");
    }
  } catch (error) {return res.status(500).json({message:error.message})}
};