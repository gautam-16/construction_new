const Project=require('../models/project.model')
const User = require('../models/user.model')
const EmployeeonProject=require('../models/employees.on.project.model')
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
exports.AssignUser=async(req,res)=>{
    try {
        let project=await Project.findOne({ where:{projectname:req.body.projectname}});
        let user=await User.findOne({where:{userid:req.body.userid}})
        // console.log(project)
        if(req.body.role=='principalarchitect'){
        console.log(req.user.name)
        Project.update({principalarchitect:user.userid},{where:{projectname:req.body.projectname}})
        EmployeeonProject.create({userid:user.id,userdesignation:user.designation,assignedby:req.user.name,user,projectname:project.projectname})
        return res.status(201).json({message:`${req.body.role} role assigned successfully`})
        }
        else{
            console.log(req.user.name)
            Project.update({projectmanager:user.userid},{where:{projectname:req.body.projectname}})
            EmployeeonProject.create({userid:user.id,userdesignation:user.designation,assignedby:req.user.name,user,projectname:project.projectname})
            return res.status(201).json({message:`${req.body.role} role assigned successfully`})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
        
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
