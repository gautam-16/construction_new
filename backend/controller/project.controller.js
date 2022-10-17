const Project=require('../models/project.model')
const User = require('../models/user.model')
const EmployeeonProject=require('../models/employees.on.project.model')
const sequelize = require('../server')
const { Sequelize } = require('sequelize')

exports.createProject=async(req,res)=>{
    try {
       
       const st = new Date(req.body.startdate).toLocaleDateString()
       const et = new Date(req.body.enddate).toLocaleDateString()
       console.log(st,et)
        const project = await Project.create({
             projectname: req.body.projectname,
             projectaddress: req.body.projectaddress,
             owner:req.body.owner,
             projectmanager: req.body.projectmanager,
             createdbyadmin:req.user.id,
             city:req.body.city,
             projectmanager:req.body.projectmanager,
             principalarchitect:req.body.principalarchitect,
             location:req.body.location,
             principalarchitect:req.body.principalarchitect,
             owneremail:req.body.owneremail,
             ownercontact:req.body.ownercontact,
             startdate:st,
             enddate:st,
             metadata: req.body.metadata,
          })
          console.log(project)
          return res.status(200).json({project,message:"project created successfully"})
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
exports.getallProject=async(req,res)=>{
    try{
        let user=req.user;
          if (req.user.level < user.level || req.user.level == 1) {
            let data= await Project.findall({where:{isActive:true}})
            return res.status(200).json(data);
          }
          else {
            let data= await EmployeeonProject.findall({where:{userid:req.user.userid}})
            console.log(data)
            // return res.status(200).json(data);
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: error.message })
        }
      }
