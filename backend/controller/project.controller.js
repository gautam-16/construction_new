const Project = require('../models/project.model')
const User = require('../models/user.model')
const changelogProject = require('../models/changelog.project')
const EmployeesonProject = require('../models/employees.on.project.model')
const sequelize = require('../server')
const { Sequelize } = require('sequelize')
const { emptyQuery } = require('pg-protocol/dist/messages')

exports.createProject=async(req,res)=>{
    try {
       if((req.user.level==1)&&(req.userdesignation=='Admin')||(req.user.level==0&&req.user.designation=='Superadmin')){
       const st = new Date(req.body.startdate).toLocaleDateString()
       const et = new Date(req.body.enddate).toLocaleDateString()
        const project = await Project.create({
             projectname: req.body.projectname,
             projectaddress: req.body.projectaddress,
             owner:req.body.owner,
             projectmanager: req.body.projectmanager,
             createdbyadmin:req.user.id,
             city:req.body.city,
             location:req.body.location,
             principalarchitect:req.body.principalarchitect,
             owneremail:req.body.owneremail,
             ownercontact:req.body.ownercontact,
             startdate:st,
             enddate:st,
             metadata: req.body.metadata,
          })
          return res.status(200).json({project,message:"project created successfully"})}
          else{
            return res.status(404).json({message:"You dont have rights to access this path"})
          }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.AssignUser = async (req, res) => {
  try {
    let project = await Project.findOne({ where: { id: req.params._id } });
    let user = await User.findOne({where:{userid:req.body.userid }})
    if (req.user.level<user.level&&user.isactive==true){
      if(user.designation=='Principal Architect'){
        await Project.update({ principalarchitect: user.name }, { where: { projectname: project.projectname } })
        data=await EmployeesonProject.create({ userid: user.userid,
           userdesignation: user.designation, 
           assignedby: req.user.name,projectname: project.projectname })
           data.designation=user.designation;
        return res.status(200).json({data,message:`${data.designation} created successfully`})
      }
      if(user.designation=='Project Manager'){
        await Project.update({ projectmanager: user.name }, 
          { where: { projectname:project.projectname } })
        
      data = await EmployeesonProject.create({ userid:user.userid, 
        userdesignation: user.designation,
           assignedby: req.user.name,projectname: project.projectname })
           data.designation=user.designation;
        return res.status(200).json({data,message:`${data.designation} created successfully`})
      }
      else{
        data=EmployeesonProject.create({userid:user.userid, userdesignation: user.designation, assignedby: req.user.name,projectname: project.projectname })
        data.designation=user.designation;
        return res.status(200).json({data,message:`${data.designation} created successfully`})
      }
    }
    else {
      return res.status(404).json({message:"You are not authorized to create this role."})
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })

  }
}
exports.getallProjects=async(req,res)=>{
    try{
      if((req.user.designation=='Admin'&&req.user.level==1)
      ||(req.user.designation=='Superadmin'&&req.user.level==0)){

            let data= await Project.findAll({where:{isactive:true}})
            console.log(data)
            return res.status(200).json(data);
          }
          else {
            // console.log(req.user.id)
            let data= await EmployeeonProject.findAll({where:{userid:req.user.id}})
            // console.log(data)
            return res.status(200).json(data);
          }
        }
          // return(res.status(404).json({message:"You don't have rights to access this path"}))
           catch (error) {
          console.log(error);
          res.status(500).json({ message: error.message })
        }
      }

exports.updateOneProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params._id);
    if (req.user.level <= 1) {
      if (project.isactive==false) {
         return res.status(500).json("Project is not longer available")
      }else{
      await changelogProject.create({
        projectname: project.projectname,
        projectaddress: project.projectaddress,
        owner: project.owner,
        ownercontact: project.ownercontact,
        city: project.city,
        owneremail: project.owneremail,
        startdate: project.startdate,
        enddate: project.enddate
      }).then(() => {
        Project.update(
          req.body,
          { where: { id: req.params._id } }
        ).then(() => { return res.status(200).json({ message: "Successfuly Updated" }) }).catch((error) => { return res.status(500).json({ error: error.message }) })

      }).catch((error) => { return res.status(500).json({ message: error.message }) })
    }
    }
    else {
      return res.status(404).json("You don't have access")
    }

  } catch (error) {
    return res.status(500).json(error)
  }
}

exports.deleteOneProject = async(req,res)=>{
  try {
    const project = await Project.findByPk(req.params._id);
    if (req.user.level <= 1) {
      if (project.isactive==false) {
        return res.status(500).json("Project is already Deleted")
     }else{
      Project.update(
        { isactive: false },
        { where: { id: req.params._id } }
      ).then(() => { return res.status(200).json({ message: "Project Successfuly Deleted" }) }).catch((error) => { return res.status(500).json(error) })
      }
    }
    else {
      return res.status(404).json("You dont have access for it")
    }
  } catch (error) {
  }
}
