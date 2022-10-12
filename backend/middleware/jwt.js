
let jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
exports.sign = function (user) {
    var payload = {
      id: user._id,
    //   firstName: user.firstname,
    //   lastName: user.lastname,
      email: user.email,
    //   idmUser: user.idmUser || false,
    //   role:user.role
    };
  
  
    try {
      return jwt.sign(payload, "myanmeissatyamsinghsolankicoudldyouguideme");
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
