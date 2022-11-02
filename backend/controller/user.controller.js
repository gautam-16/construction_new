
const User = require('../models/user.model');
const Role = require('../models/role.model')
const changelogUser = require('../models/changelog.user')
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { sign, transporter } = require("../middlewares/jwt")
exports.getRole = async (req, res) => {
  try {
    let user;
    const role = await Role.findOne({where:{rolename:req.user.designation}})
    if (req.user.level === 1) {
      user = await Role.findAll({
        where: {
        [Op.and]: [{
            level: {
              [Op.gte]: 1
            }
          },
          {
            department:role.department
          }
          ]

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
              department:role.department
            }

          ]

        }
      });
    }
    const entries = JSON.stringify(user);
    const roleArray = JSON.parse(entries)

    const roleNameArray = roleArray.map((x) => {
      return x.rolename;
    })
    res.status(200).json(roleNameArray)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}
exports.createUser = async (req, res) => {
  try {
    const role = await Role.findOne({ where: { level: req.body.level } })
    const Password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name, email: req.body.email, contact: req.body.contact
      , password: Password, address: req.body.address
      , verification_document: req.body.verification_document, profile_image: req.body.profile_image
      , created_by: req.body.created_by,level:req.body.level, designation: req.body.designation
      , metadata: req.body.metadata
    })
    // then((data) => { return data })
    //   .catch((error) => { res.status(500).json({ "error": error.message, message: "Employee not created" }) })
    const url = `http://localhost:8000/user/loginUser`
    const mail = await transporter.sendMail({
      from: 'satyam.solanki@cubexo.io',
      to: user.email,
      subject: 'Verify Account',
      html: `<div>  Id : ${user.email} </div> <div> Password : ${req.body.password} </div> <div> Click on link to Login : ${url}`
    }).then(() => { res.status(200).json({ message: "Employee created and the email id and password is sent to mail" }) })
      .catch((err) => { res.status(500).json({ message: error.message }) })


  }
  catch (error) {
    res.status(500).json({ error: error.message, message: "User not created." })

  }

}

exports.readUser = async (req, res) => {
  try {

    const users = await User.findAll({ attributes: ['name', 'contact', 'email'] });
    const entries = JSON.stringify(users);
    const usersList = JSON.parse(entries)

    return res.status(200).json(usersList)

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}
exports.readOneUser = async (req, res) => {
  try {

    const user = await User.findByPk(req.params._id);
    if (req.user.level < user.level || req.user.level == 1) {
      const data = [{ name: user.name }, { contact: user.contact }, { email: user.email }, { address: user.address }, { profile_image: user.profile_image }, { designation: user.designation }]
      return res.status(200).json(data);
    }
    else {
      const data = [{ name: user.name }, { contact: user.contact }, { email: user.email }, { profile_image: user.profile_image }, { designation: user.designation }]

      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}

exports.updateOneUser = async (req, res) => {
  try {

    const user = await User.findByPk(req.params._id);
    if (user.level > req.user.level) {
     await changelogUser.create({
        userid: user.userid,
        name: user.name, 
        email: user.email, 
        contact: user.contact,
        password: user.password,
        address: user.address,
        verification_document: user.verification_document,
        profile_image: user.profile_image,
        updatedby:req.user.id,
        level: user.level,
        designation: user.designation,
        metadata: user.metadata
      }).then(() => {
          User.update(
            req.body,
            { where: { userid: req.params._id } }
          ).then(() => { return res.status(200).json({ message: "Successfuly Updated" }) }).catch((error) => { return res.status(500).json({error:error.message}) })

        }).catch((error) => { return res.status(500).json({message:error.message}) })
    }
    else {
      return res.status(404).json("You don't have access")
    }


  } catch (error) {
    return res.status(500).json(error)
  }
}
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params._id);
    if (user.level > req.user.level) {
      User.update(
        { isactive: false },
        { where: { userid: req.params._id } }
      ).then(() => { return res.status(200).json({ message: "Employee Successfuly Deleted" }) }).catch((error) => { return res.status(500).json(error) })

    }
    else {
      return res.status(404).json("You dont have access for it")
    }
  } catch (error) {
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findOne({ where: { email: req.body.email } })
    // console.log(user);
    if (!user || user.isactive == false) {
      return res.status(400).json({ Success: false, message: "user not found" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    // console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password"
      })
    }
    else {
      // console.log(user.level);
      const token = await sign(user);
      // console.log(token);
      res.status(201).json({
        success: true,
        designation:user.designation,
        message: "User logged in successfully", token
      })
    }
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Something went Wrong" })
  }
}


exports.changePassword= async (req, res) => {
  try {
  //  user=User.findByPk(req.user.userid)
console.log(req.user)
    const isMatch = await bcrypt.compare(req.body.oldpassword,req.user.password)
    console.log(isMatch)
    if(isMatch){
      if(req.body.newpassword==req.body.oldpassword){
        return res.status(400).json({message:"You have entered an old password."})
      }
      if(req.body.newpassword==req.body.confirmpassword){
        const Password = await bcrypt.hash(req.body.newpassword, 10)
        console.log(req.user.id)
       User.update({ password:Password},{ where: { userid:req.user.id }})
           return res.status(201).json({message:"Password Changed successfully."})
          }
          else{
            return res.status(400).json({message:"New password and Confirm password does not match"})
          }
        }
    else{
      return res.status(404).json({message:"You've entered wrong password."})
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.forgotPassword = async (req, res) => {
  console.log(req.body.email)
  if(req.body.email){
  const user = await User.findOne({ where: { email: req.body.email } })
  if (!user || user.isactive == false) {
    return res.status(400).json({ Success: false, message: "user not found" })
  }

  else {
    const url = `http://localhost:8000/user/resetPassword/set/0`
    const mail = await transporter.sendMail({
      to: user.email,
      subject: 'Reset Password',
      html: `<div>  Reset your  passsword </div><div> Click on link to reset Password : ${url}`
    }).then(() => { res.status(200).json({ message: "Password Reset Link has been sent to your Email." }) })
      .catch((err) => { res.status(500).json({ err, message: "Mail not sent" }) })}}
      else{
        return res.status(404).json({message:"Please Enter a valid email address"})
      }

  }

exports.resetPassword = async(req,res)=>{
  try {
  const user = await User.findOne({ where: { email: req.body.email } })
  if (!user || user.isactive == false) {
    return res.status(400).json({ Success: false, message: "User not found" })
  }
  else{
    if(req.body.newpassword==req.body.confirmpassword){
    const Password = await bcrypt.hash(req.body.newpassword, 10);
    User.update(
      { password: Password },
      { where: { email: user.email } }
    ).then(() => { return res.status(200).json({ message: "password successfully set" }) }).catch((error) => { return res.status(500).json({ error: error.message }) })
  }
  else{
    return res.status(404).json({message:"New Password and Confirm Password does not match."})
  }
}
  }
  catch (error) {
    return res.status(500).json({message:error.message})
    
  }

}
