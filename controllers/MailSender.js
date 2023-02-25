require("express");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
});

async function _sendmail(req, res){
    var mailOptions = {
        from: process.env.FROM,
        to: process.env.TO,
        subject: req.body.subject,
        html: "<p>" + req.body.name + "</p><p>" + req.body.mail + "</p><p>" + req.body.mailbody + "</p>"
    };
    
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            res.render("users/contact", {
                send: "error"
            });
        } else {
            res.render("users/contact", {
                send: "send"
            });
        }
    });    
}
  
module.exports.sendmail = _sendmail;