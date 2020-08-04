const nodemailer = require('nodemailer');
// require('dotenv').config(); moved to dev-dependency
// must run with "nodemon -r dotenv/config server.js" or "npm run start_local"

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  // host: process.env.GMAIL_SERVICE_HOST,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

module.exports = {
  sendMail(mailOptions, cb) {
    smtpTransport.sendMail(mailOptions, (error, data) => {
      if (error) {
        cb(error, null);
      } else {
        cb(null, data);
      }
    });
  },
};
