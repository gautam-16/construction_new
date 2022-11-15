const sequelize=require('../server')
const Phase=require('../models/phase.model');
const Project = require('../models/project.model');



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