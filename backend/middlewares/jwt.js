
let jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
exports.sign = function (user) {
    var payload = {
      name: user.name,
contact: user.contact,
email: user.email,
address: user.address,
verficiation_document: user.verficiation_document,
profile_image: user.profile_image,
created_by: user.created_by,
role: user.role,
designation: user.designation,
metadata: user.metadata,
userstatus: user.userstatus,
isactive:user.isactive
    };
  
  
    try {
      return jwt.sign(payload, process.env.SECRET_KEY);
    } catch (err) {}
  };
  exports.transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'solankisatyam4105@gmail.com',
        pass: 'bfsimcdpcmuhcyqa',
    },
    secure: true,
});
