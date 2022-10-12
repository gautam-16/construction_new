
const createTableUser = require('../models/user.model');
const bcrypt = require("bcrypt");
const { sign,transporter } = require("../middlewares/jwt")
exports.createUser = async (req, res) => {
  try {
    
    const Password = await bcrypt.hash(req.body.password,10);
    const user = await createTableUser.create({
      name: req.body.name, email: req.body.email, contact: req.body.contact
      , password: Password, address: req.body.address
      , verficiation_document: req.body.verfication_document, profile_image: req.body.profile_image
      , created_by: req.body.created_by, role: req.body.role, designation: req.body.designation
      , metadata: req.body.metadata
    }).then((data)=>{return data})
      .catch((error)=>{res.status(500).json({"error":error.message,message:"Employee not created"})})
      const url = `http://localhost:8000/user/loginUser`
    const mail = await transporter.sendMail({
      from: 'satyam.solanki@cubexo.io',
      to: user.email,
      subject: 'Verify Account',
      html: `<div>  Id : ${user.email} </div> <div> Password : ${req.body.password} </div> <div> Click on link to Login : ${url}`
    }).then(()=>{res.status(200).json({message:"Employee created and the email id and password is sent to mail"})})
    .catch((err)=>{res.status(500).json({err,message:"Please try mail not send"})})
   

  }
  catch (error) {
    res.status(500).json({ h3l: error.message, message:"somthing went wrong" })
    
  }

}


exports.readUser = async (req, res) => {
  try {
    const users = await createTableUser.findAll();
    console.log(users.every(user => user instanceof createTableUser));
    console.log("All users:", JSON.stringify(users, null, 2));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}
exports.readOneUser = async (req, res) => {
  try {
    const user = await createTableUser.findByPk(req.body.email);
    return res.json(user, null, 2);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}
exports.updateUser = async (req, res) => {
  try {
    createTableUser.update(
      { name: 'a very dif' },
      { where: { email: req.body.email } }
    )
      .success(result =>
        handleResult(result)
      )
      .error(err =>
        handleError(err)
      )
  } catch (error) {
    return res.status(500).json(error)
  }
}
exports.deleteUser = async (req, res) => {
  try {
    createTableUser.update(
      { status: false },
      { where: { email: req.body.email } }
    )
      .success(result =>
        handleResult(result)
      )
      .error(err =>
        handleError(err)
      )
  } catch (error) {
  }
}

exports.loginUser = async(req,res)=>{
    try {
      const { email, password } = req.body;
      const user = await createTableUser.findByPk(email)
      // console.log(user);
      if (!user) {
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
    else{
        const token = await sign(user);
        // console.log(token);
        res.status(201).json({
          success: true,
          message: "User logged in successfully"
        })
      }
    } catch (error) {
      res.status(500).json({error:error.message,message:"Something went Wrong"})
    }
}