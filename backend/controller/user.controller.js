const createTableUser=require('../models/user.model')
const {transporter}= require("../middleware/jwt")
exports.createUser= async(req,res)=>{
    try
    {
    await  createTableUser.create({name:req.body.name,email:req.body.email,contact:req.body.contact
      ,password:req.body.password,address:req.body.address
      ,verficiation_document:req.body.verfication_document,profile_image:req.body.profile_image
      ,created_by:req.body.created_by,role:req.body.role,designation:req.body.designation
      ,metadata:req.body.metadata})
      .then(async (data) => {
                  
                  //  const url = `http://localhost:8001/api/v2/register/${token}`;
                  //  const transporter = authCheck.transporter;
                   console.log(req.body.email);
                    const hello = await transporter.sendMail({
                        to:data.email,
                        subject: 'Verify Account',
                        html: `<div>  Id : ${data.email} </div> <div> Password : ${data.password}`
                    })
                })
           .then(()=>{return res.status(200).json({message:"Employee created and the email id and password is sent to mail"})})
         } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.readUser = async(req,res)=>{
    try {
    const users = await createTableUser.findAll();
    console.log(users.every(user => user instanceof createTableUser));
    console.log("All users:", JSON.stringify(users, null, 2));
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
}
exports.readOneUser = async(req,res)=>{
    try {
    const user = await createTableUser.findByPk(req.body.email);
    // console.log(user);
   return res.json( user, null, 2);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
}
exports.updateUser = async(req,res)=>{
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
exports.deleteUser = async(req,res)=>{
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