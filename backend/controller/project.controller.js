const Project = require('../models/project.model')
const User = require('../models/user.model')
const changelogProject = require('../models/changelog.project')
const { Op } = require("sequelize");
const EmployeesonProject = require('../models/employees.on.project.model')
const sequelize = require('../server')

exports.createProject = async (req, res) => {
  try {
    if ((req.user.level == 1) && (req.user.designation == 'Admin') || (req.user.level == 0 && req.user.designation == 'Superadmin')) {
      const st = new Date(req.body.startdate).toLocaleDateString()
      const et = new Date(req.body.enddate).toLocaleDateString()
      const project = await Project.create({
        projectname: req.body.projectname,
        projectaddress: req.body.projectaddress,
        owner: req.body.owner,
        projectmanager: req.body.projectmanager,
        createdbyadmin: req.user.id,
        city: req.body.city,
        location: req.body.location,
        principalarchitect: req.body.principalarchitect,
        owneremail: req.body.owneremail,
        ownercontact: req.body.ownercontact,
        estimatedcost:req.body.estimatedcost,
        startdate: st,
        enddate: et,
        metadata: req.body.metadata,
      })
      return res.status(200).json({ project, message: "project created successfully" })
    }
    else {
      return res.status(404).json({ message: "You dont have rights to access this path" })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
exports.AssignUser = async (req, res) => {
try {
    let project = await Project.findOne({ where:{projectname:req.params.projectname} });
    let user = await User.findOne({where:{userid:req.body.userid }})
    const duplicateuser= await EmployeesonProject.findOne({where:{[Op.and]:[{userid:req.body.userid},{projectname:project.projectname}]}})
    console.log(duplicateuser)
  if(duplicateuser==null){
      if (req.user.level<user.level&&user.isactive==true){
        if(user.designation=='Principal Architect')
        {
          await Project.update({ principalarchitect: user.name }, { where: { projectname: project.projectname}});
          data=await EmployeesonProject.create({ userid: user.userid,
             userdesignation: user.designation, 
             assignedby: req.user.name,projectname: project.projectname,nameofuser:user.name,employeestatus:'deployed' })
             
          return res.status(200).json({data,message:`${user.designation} created successfully`})
        }
        if(user.designation=='Project Manager'){
          await Project.update({ projectmanager: user.name }, 
            { where: { projectname:project.projectname } })
          
        data = await EmployeesonProject.create({ userid:user.userid, 
          userdesignation: user.designation,
             assignedby: req.user.name,projectname: project.projectname,nameofuser:user.name,employeestatus:'deployed' })
          return res.status(200).json({data,message:`${user.designation} created successfully`})
        }
        else{
                data=await EmployeesonProject.create({userid:user.userid, userdesignation: 
                user.designation, assignedby: req.user.name,projectname: project.projectname,nameofuser:user.name,employeestatus:'deployed' })
                return res.status(201).json({data,message:`${user.designation} created successfully`})
                    }
                  }
    else {
              return res.status(400).json({message:"You are not authorized to create this role."})
            }
                    }
  else{
          return res.status(400).json({message:"User already exists for the given project."})
    }
    

    }
catch (error) {
    return res.status(500).json({ message: error.message })

  }
}
exports.getallProjects = async (req, res) => {
  try {
    if ((req.user.designation == 'Admin' && req.user.level == 1)
      || (req.user.designation == 'Superadmin' && req.user.level == 0)) {

      let data = await Project.findAll()
      return res.status(200).json(data);
    }
    else {
      // console.log(req.user.id)
      let data = await EmployeeonProject.findAll({ where: { userid: req.user.id } })
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
      if (project.isactive == false) {
        return res.status(500).json("Project is not longer available")
      } else {
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

exports.deleteOneProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params._id);
    if (req.user.level <= 1) {
      if (project.isactive == false) {
        return res.status(500).json("Project is already Deleted")
      } else {
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

exports.getOneProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params._id);
    if (!project || project.isactive == false) {
      res.status(404).json("Project is not longer available")
    } else {
      res.status(200).json(project)
    }

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.allUsersOnproject = async(req,res)=>{
  try {
    const deployeduser = await EmployeesonProject.findAll({
      where: {
         projectname: req.params.projectname 
      },
      attributes:['nameofuser']
    })
    if (deployeduser.length==0) {
      res.status(404).json("There's is no any user assigned on this proejct")
    } else {
      const username = deployeduser.map((obj) => obj.nameofuser);
     
      console.log(username);
      res.status(200).json(username)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.deployedUser = async (req, res) => {
  try {
    const deployeduser = await EmployeesonProject.findAll({
      where: {
        [Op.and]: [{ projectname: req.params.projectname }, { employeestatus: 'deployed' }]
      },
      attributes:['nameofuser']
    })
    if (deployeduser.length==0) {
      res.status(404).json("There's is no any user assigned on this proejct")
    } else {
      const username = deployeduser.map((obj) => obj.nameofuser);
     
      console.log(username);
      res.status(200).json(username)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.removedUser = async (req, res) => {
  try {
    const removeduser = await EmployeesonProject.findAll({
      where: {
        [Op.and]: [{ projectname: req.params.projectname }, { employeestatus: 'free' }]
      },
      attributes:['nameofuser']
    })
    if (removeduser.length==0) {
      res.status(404).json("There's is no any user removed on this project")
    } else {
      const username = removeduser.map((obj) => obj.nameofuser);
  
      res.status(200).json(username)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.removeUser = async (req, res) => {
  try {

    const user = await EmployeesonProject.findAll({ where: { [Op.and]:[{userid: req.body.userid },{projectname:req.params.projectname}] }});
  
    if (user.employeestatus == 'free' || user.length==0) {
      res.status(200).json("Employee is already removed or there's no such user")
    }
    else {
      const removeUser = await EmployeesonProject.update({ employeestatus: 'free' }, { where: { userid: req.body.userid } })
      return res.status(200).json("User removed from project")
    }
  }

  catch (error) {
   return res.status(500).json({message:error.message})
  }
}
