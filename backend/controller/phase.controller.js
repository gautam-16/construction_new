const sequelize=require('../server')
const Phase=require('../models/phase.model')



exports.createPhase=async()=>{
    try {
        if (
            (req.user.level == 1 && req.user.designation == "Admin") ||
            (req.user.level == 0 && req.user.designation == "Superadmin")
          ) {
            const st = new Date(req.body.startdate).toLocaleDateString();
            const et = new Date(req.body.enddate).toLocaleDateString();
            const phase = await Phase.create({
              phasename: req.body.phasename,
              projectid: req.body.projectid,
              phaseweightage: req.body.phaseweightage,
              projectmanager: req.body.projectmanager,
              phasestartdate:st,
              phasenddate: et,
              phasestatus: req.body.phasestatus,
              metadata: req.body.metadata,
            });
            return res.status(200).json({ phase, message: "Phase created successfully" });
          } 
          else {
            return res.status(404).json({ message: "You don't have rights to access this path" });
          }
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}