const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

exports.sign = function (user) {
    var payload = {
      id:user.userid,
      name: user.name,
      password:user.password,
contact: user.contact,
email: user.email,
address: user.address,
verification_document: user.verification_document,
profile_image: user.profile_image,
created_by: user.created_by,
level: user.level,
designation: user.designation,
metadata: user.metadata,
userstatus: user.userstatus,
isactive:user.isactive
    };
    try {
      // console.log(process.env.JWT_SECRET);
      // console.log(jwt.sign(payload, process.env.JWT_SECRET));
      return jwt.sign(payload, process.env.JWT_SECRET);
    } catch (err) {}
  };
  exports.transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "sample.mail.send.test@gmail.com",
        pass: "nurasrmykcdbbjaj",
    },
    secure: true,
});



