const Project = require("../models/project.model");
const User = require("../models/user.model");
const changelogProject = require("../models/changelog.project");
const Role = require("../models/role.model");
const { Op, where } = require("sequelize");
const EmployeesonProject = require("../models/employees.on.project.model");
const sequelize = require("../server");

exports.createProject = async (req, res) => {
  try {
    if (
      (req.user.level == 1 && req.user.designation == "Admin") ||
      (req.user.level == 0 && req.user.designation == "Superadmin")
    ) {
      const st = new Date(req.body.startdate).toLocaleDateString();
      const et = new Date(req.body.enddate).toLocaleDateString();
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
        estimatedcost: req.body.estimatedcost,
        startdate: st,
        enddate: et,
        metadata: req.body.metadata,
      });
      
      return res
        .status(200)
        .json({ project, message: "Project created successfully." });
    } else {
      return res
        .status(404)
        .json({ message: "You dont have rights to access this path." });
    }
  } catch (error) {
    // error.errors.forEach((data)=>{

    //   res.status(500).json(
    //     {message:{ [data.path]:data.message} } 
    //      );
    // })
    res.status(500).json({message:error.message})
  }
};
exports.AssignUser = async (req, res) => {
  // console.log(req.params.projectname,req.user)
  try {
    let project = await Project.findOne({
      where: { projectname: req.params.projectname },
    });
    
    let user = await User.findOne({
      where: { [Op.and]: [{ userid: req.body.userid }, { isactive: true }] },
    });
    // console.log(user.level)
    const duplicateuser = await EmployeesonProject.findOne({
      where: {
        [Op.and]: [
          { userid: req.body.userid },
          { projectname: project.projectname },
          { employeestatus: "deployed" },
        ],
      },
    });
    console.log(duplicateuser);
    if (duplicateuser == null) {
      if (req.user.level < user.level && user.isactive == true) {
        if (user.designation == "Principal Architect") {
          console.log("principle architect condition");
          await Project.update(
            { principalarchitect: user.name },
            { where: { projectname: project.projectname } }
          );
          data = await EmployeesonProject.create({
            userid: req.body.userid,
            userdesignation: user.designation,
            assignedby: req.user.id,
            projectname: project.projectname,
            nameofuser: user.name,
            employeestatus: "deployed",
          });
          return res.status(200).json({
            data,
            message: `${user.designation} created successfully.`,
          });
        }
        if (user.designation == "Project Manager") {
          console.log("project manager condition");
          await Project.update(
            { projectmanager: user.name },
            { where: { projectname: project.projectname } }
          );
          data = await EmployeesonProject.create({
            userid: req.body.userid,
            userdesignation: user.designation,
            assignedby: req.user.id,
            projectname: project.projectname,
            nameofuser:user.name,
            employeestatus: "deployed",
          });
          return res.status(200).json({
            data,
            message: `${user.designation} created successfully.`,
          });
        } else {
          data = await EmployeesonProject.create({
            userid: req.body.userid,
            userdesignation: user.designation,
            assignedby: req.user.id,
            projectname: project.projectname,
            nameofuser: user.nameofuser,
            employeestatus: "deployed",
          });
          return res.status(201).json({
            data,
            message: `${user.designation} created successfully.`,
          });
        }
      } else {
        return res
          .status(400)
          .json({ message: "You are not authorized to assign this role." });
      }
    } else {
      return res
        .status(400)
        .json({ message: "User already exists for the given project." });
    }
  } catch (error) {
    // error.errors.forEach((data)=>{

    //   res.status(500).json(
    //     {message:{ [data.path]:data.message} } 
    //      );
    // })  
    res.status(500).json({message:error.message})
  }
};
exports.getallProjects = async (req, res) => {
  try {
    if (
      (req.user.designation == "Admin" && req.user.level == 1) ||
      (req.user.designation == "Superadmin" && req.user.level == 0)
    ) {
      let data = await Project.findAll();
      return res.status(200).json(data);
    } else {
      let data = await EmployeesonProject.findAll({
        where: { userid: req.user.id },
      });

      let allproj = [];
      for (i of data) {
        proj = await Project.findOne(
          { where: { projectname: i.dataValues.projectname } },
          {
            attributes: [
              "id",
              "projectname",
              "projectaddress",
              "projectmanager",
              "principalarchitect",
              "city",
              "location",
              "projectstatus",
              "startdate",
              "enddate",
              "isActive",
            ],
          }
        );
        allproj.push(proj.dataValues);
      }
      console.log(allproj);
      return res.status(200).json(allproj);
    }
  } catch (error) {
    // return(res.status(404).json({message:"You don't have rights to access this path"}))
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateOneProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params._id);
    if (req.user.level <= 1) {
      if (project.isactive == false) {
        return res.status(500).json("Project is not longer available");
      } else {
        await changelogProject
          .create({
            projectname: project.projectname,
            projectaddress: project.projectaddress,
            owner: project.owner,
            ownercontact: project.ownercontact,
            city: project.city,
            owneremail: project.owneremail,
            startdate: project.startdate,
            enddate: project.enddate,
          })
          .then(() => {
            Project.update(req.body, { where: { id: req.params._id } })
              .then(() => {
                return res.status(200).json({ message: "Project Updated Successfully" });
              })
              .catch((error) => {
                return res.status(500).json({ error: error });
              });
          })
          .catch((error) => {
            return res.status(500).json({ message: error});
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
};

exports.deleteOneProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params._id);
    if (req.user.level <= 1) {
      if (project.isactive == false) {
        return res.status(500).json("Project already Deleted.");
      } else {
        Project.update({ isactive: false }, { where: { id: req.params._id } })
          .then(() => {
            return res
              .status(200)
              .json({ message: "Project Successfuly Deleted." });
          })
          .catch((error) => {
            return res.status(500).json(error);
          });
      }
    } else {
      return res.status(404).json("You don't have the rights to access this path.");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getOneProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params._id);
    if ((!project || project.isactive == false) && req.user.level >= 1) {
      res.status(404).json("Project is not longer available");
    } else {
      res.status(200).json(project);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getallUsersOnproject = async (req, res) => {
  try {
    const deployeduser = await EmployeesonProject.findAll({
      where: {
        projectname: req.params.projectname,
      },
      attributes: [
        "nameofuser",
        "assignedby",
        "employeestatus",
        "userdesignation",
        "userid",
      ],
    });
    // console.log(deployeduser)
    if (deployeduser.length == 0) {
      res.status(404).json("No users assigned on this project.");
    } else {
      arr = [];
      for (i of deployeduser) {
        arr.push(i.dataValues);
      }
      res.status(200).json(arr);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getdeployedUser = async (req, res) => {
  try {
    const deployeduser = await EmployeesonProject.findAll({
      where: {
        [Op.and]: [
          { projectname: req.params.projectname },
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
    if (deployeduser.length == 0) {
      res.status(404).json("No users deployed on this project.");
    } else {
      const username = deployeduser.map((obj) => obj.nameofuser);

      console.log(username);
      res.status(200).json(deployeduser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getremovedUser = async (req, res) => {
  try {
    const removeduser = await EmployeesonProject.findAll({
      where: {
        [Op.and]: [
          { projectname: req.params.projectname },
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
    console.log(removeduser);
    if (removeduser.length == 0) {
      res.status(404).json("No user removed on project.");
    } else {
      const username = removeduser.map((obj) => obj.nameofuser);

      res.status(200).json(removeduser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeUserFromProject = async (req, res) => {
  try {
    const user = await EmployeesonProject.findOne({
      where: {
        [Op.and]: [
          { userid: req.body.userid },
          { projectname: req.params.projectname },
         
        ],
      },
    });
   
    if (!user) {
      return res.status(404).json("User does not exit on this project")
    }

    const role = await Role.findAll({
      where: {
        [Op.or]: [
          { rolename: req.user.designation },
          { rolename: user.userdesignation },
        ],
      },
    });
   
    if (!role[1] && req.user.level>1) {
      return res.status(404).json("You dont have access for it")
    }
  
    if ( (req.user.level < role[1].level && role[0].department == role[1].department) ||req.user.level <= 1
    )  {
     
      if (user.employeestatus == "removed" || user.length == 0) {
        res.status(200).json({
          message: "Employee is already removed or user does not exits",
        });
      } else {
        if ( user.userdesignation == "Principal Architect" || user.userdesignation == "Project Manager"
        ) {
         
          let designation =
            user.userdesignation == "Principal Architect"? "principalarchitect": "projectmanager";
          
            await Project.update(
              { [designation]: null },
              {
                where: {
                  projectname: req.params.projectname,
                },
              }
            );
  
        }
         await EmployeesonProject.update(
          { employeestatus: "removed" },
          { where: 
           { [Op.and]:[
              { userid: req.body.userid }, 
              {projectname:req.params.projectname}
            ]}
          }
        );
        return res.status(200).json({ message: "User removed from project." });
      }
   
    }
    else{
      return res.status(404).json("You don't have the rights to access this path.")
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
