
const User = require('../models/user.model');
const Role = require('../models/role.model')
const changelogUser = require('../models/changelog.user')
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { sign, transporter } = require("../middlewares/jwt");
const cloudinary = require("cloudinary");
const EmployeesOnProject = require('../models/employees.on.project.model');
exports.createUser = async (req, res) => {
  try {

    let img = 'notInserted'
    if (req.files) {
      let file = req.files.file
      img = await cloudinary.uploader.upload(file.tempFilePath).url
    }
    const Password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ 
      first_name:req.body.first_name, 
    last_name:req.body.last_name, 
    contact:req.body.contact, 
    alternate_contact:req.body.alternate_contact,
     email: req.body.email,
      password: Password, 
      address:req.body.address, 
      created_by:req.user.created_by, 
      isactive:req.body.isactive, 
      profile_image: req.body.profile_image, 
      verification_document: req.body.verification_document,
       metadata: req.body.metadata })
    const url = `http://localhost:8000/user/loginUser`
    const mail = await transporter.sendMail({
      from: 'satyam.solanki@cubexo.io',
      to: user.email,
      subject: 'Verify Account',
      html: `<div>  Id : ${user.email} </div> <div> Password : ${req.body.password} </div> <div> Click on link to Login : ${url}`
    })
    console.log(mail)
    return res.status(200).json({ message: "Employee created and the email id and password is sent to mail" })

  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }

}
exports.readAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        isactive: true
      }
    },
      { attributes: ['name', 'contact','alternate_contact','address','profile_images', 'email', 'isactive', 'userid'] });
    const entries = JSON.stringify(users);
    const usersList = JSON.parse(entries)
    return res.status(200).json(usersList)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message })
  }
}
exports.readOneUser = async (req, res) => {
  try {

    const user = await User.findByPk(req.params._id);

    if (req.user.level < user.level || req.user.level == 1) {
      const data = { name: user.name, contact: user.contact, email: user.email, profile_image: user.profile_image, designation: user.designation, level: user.level, address: user.address }
      return res.status(200).json(data);
    }
    else {
      const data = { name: user.name, contact: user.contact, email: user.email, profile_image: user.profile_image, designation: user.designation, level: user.level, address: user.address }

      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message })
  }
}

exports.updateOneUser = async (req, res) => {
  try {
    const user1 = await User.findByPk(req.params._id);
    user=user1.dataValues
    await changelogUser.create({
    userid:user.userid,
    first_name:user.first_name, 
    last_name:user.last_name, 
    contact:user.contact, 
    alternate_contact:user.alternate_contact,
    address:user.address, 
    isactive:user.isactive, 
    profile_image: user.profile_image, 
    verification_document: user.verification_document,
    updatedby:req.user.id,
    metadata: user.metadata
      }).then(async () => {
       await User.update(
          req.body,
          { where: { userid: req.params._id } }
        ).then(() => { return res.status(200).json({ message: " User Successfuly Updated" }) })
          .catch((error) => { return res.status(500).json({ message: error.errors[0].message }) })

      }).catch((error) => { return res.status(500).json({ message: error }) })

  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params._id);
    if(user!==null){
      User.update(
        { isactive: false },
        { where: { userid: req.params._id } }
      ).then(() => { return res.status(200).json({ message: "Employee Deleted Successfully" }) })
        .catch((error) => { return res.status(500).json(error) })}
        else{
          return res.status(404).json({message:"User not found"})
        }

  } catch (error) {
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { password } = req.body;
    const user1 = await User.findOne({ where: { [Op.and]:[{email:req.body.email},{isactive:true}] } })
  let user=user1.dataValues

    if (user==undefined||null) {
      const employee=await EmployeesOnProject.findOne({ where: { [Op.and]:[{email:req.body.email},{isactive:true}] } })
      if(employee==undefined||null){ return res.status(400).json({ Success: false, message: "User not found" })}
     
    }
    user_password=user?user.password:employee.password
    const isMatch = await bcrypt.compare(password, user_password)

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password"
      })
    }
    else {
      // console.log(user.level);
      const token = await sign(user);
      // console.log(token);
      return res.status(201).json({
        success: true, user
        , message: "Login Successfull", token
      })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message, message: "Something went Wrong" })
  }
}

exports.getRole = async (req, res) => {
  try {
    let user;
    const role = await Role.findOne({ where: { rolename: req.user.designation } })

    if (req.user.level === 1 || req.user.level == 0) {
      user = await Role.findAll({
        where: {

          level: {
            [Op.gte]: req.user.level
          }


        }
      });
    }
    else {
      user = await Role.findAll({
        where: {
          [Op.and]: [{
            level: {
              [Op.gt]: req.user.level
            }
          },
          {
            department: role.department
          }

          ]

        }
      });
    }

    const entries = JSON.stringify(user);
    const roleArray = JSON.parse(entries)

    const roleNameArray = roleArray.map((x) => {

      return { rolename: x.rolename, id: x.id, level: x.level };
    })
    return res.status(200).json(roleNameArray)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

}
exports.changePassword = async (req, res) => {
  try {
    const isMatch = await bcrypt.compare(req.body.oldpassword, req.user.password)
    console.log(isMatch)
    if (isMatch) {
      if (req.body.newpassword == req.body.oldpassword) {
        return res.status(400).json({ message: "You have entered an old password." })
      }
      if (req.body.newpassword == req.body.confirmpassword) {
        const Password = await bcrypt.hash(req.body.newpassword, 10)
        console.log(req.user.id)
        User.update({ password: Password }, { where: { userid: req.user.id } })
        return res.status(201).json({ message: "Password Changed successfully." })
      }
      else {
        return res.status(400).json({ message: "Passwords don't match" })
      }
    }
    else {
      return res.status(404).json({ message: "Invalid Password." })
    }
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

exports.forgotPassword = async (req, res) => {

  if (req.body.email) {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user || user.isactive == false) {
      return res.status(404).json({ Success: false, message: "User not found" })
    }

    else {
      const host = req.body.port
      console.log(req.body)
      const url = `${host}/resetpassword`
      const mail = await transporter.sendMail({
        to: user.email,
        subject: 'Reset Password',
        html: `<div>  Reset your  passsword </div><div> Click on link to reset Password : ${url}`
      }).then(() => { return res.status(200).json({ message: "Password Reset Link has been sent to your Email." }) })
        .catch((err) => { return res.status(500).json({ err, message: "Mail not sent" }) })
    }
  }
  else {
    return res.status(404).json({ message: "Please enter a valid Email" })
  }

}

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user || user.isactive == false) {
      return res.status(400).json({ Success: false, message: "User not found" })
    }
    else {
      if (req.body.newpassword == req.body.confirmpassword) {
        const Password = await bcrypt.hash(req.body.newpassword, 10);
        User.update(
          { password: Password },
          { where: { email: user.email } }
        ).then(() => { return res.status(200).json({ message: "Password changed Successfully" }) }).catch((error) => { return res.status(500).json({ error: error.message }) })
      }
      else {
        return res.status(404).json({ message: "New Password and Confirm Password do not match." })
      }
    }
  }
  catch (error) {
    return res.status(500).json({ message: error.message })

  }

}
exports.Updateowndetails = async (req, res) => {
  try {
    const user = await User.findOne({ where: { userid: req.params.id } })
    if (user) {
      console.log('inside user condition')
      await changelogUser.create({
        userid: user.dataValues.userid,
        name: user.dataValues.name,
        email: user.dataValues.email,
        contact: user.dataValues.contact,
        password: user.dataValues.password,
        address: user.dataValues.address,
        verification_document: user.dataValues.verification_document,
        profile_image: user.dataValues.profile_image,
        updatedby: user.dataValues.userid,
        level: user.dataValues.level,
        designation: user.dataValues.designation,
        metadata: user.dataValues.metadata
      })
      User.update(req.body, { where: { userid: req.params.id } })

      return res.status(200).json({ message: "User updated Successfully!" })
    }

    else {
      return res.status(404).json({ message: "User not found" })
    }
  }
  catch (error) {
    return res.status(500).json({ "message": error })

  }
}