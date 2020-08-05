/* eslint-disable no-underscore-dangle */
const os = require('os');
const db = require('../models');

require('dotenv').config(); // move to a dev-dependency must run "node -r dotenv/config server.js"
// or "npm run start_local"
const smtpTransport = require('../config/verify'); // { sendMail }

const hostname = os.hostname();
const PORT = process.env.PORT || 3000;

// Email verification
let mailOptions;
let link;

function emailverify(id) {
  db.Groomer.findOne({ _id: id })
    .then((dbUser) => {
      const user = {
        id: dbUser._id,
        email: dbUser.email,
        secretToken: dbUser.userToken,
        isVerified: dbUser.isVerified,
      };
      if (process.env.NODE_ENV === 'development') {
        link = `http://${hostname}:${PORT}/api/verify/Bearer%20${user.secretToken}`;
      } else {
        link = `https://www.instagroom.me/api/verify/Bearer%20${user.secretToken}`;
      }
      mailOptions = {
        from: '"InstaGroomMe" <instagroomme@gmail.com>',
        to: user.email,
        subject:
                'InstaGroomMe is asking you to confirm your Email account',
        // eslint-disable-next-line prefer-template
        html: `<div itemscope itemtype="http://schema.org/EmailMessage">
              <div itemprop="potentialAction" itemscope itemtype="http://schema.org/ConfirmAction">
                <meta itemprop="name" content="Verify Email"/>
                <div>
                  <p>Hi there,<br>
                  <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>
                            <table cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="border-radius: 2px;" bgcolor="#ED2939">
                                        <a href="${link}" target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                                            Click Here to Verify Your Email             
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                  </table> 
                  Please Click on the button to verify your email. <br></p>
                <div itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler">
                  <link itemprop="url" href="${link}"/>
                </div>
              </div>
              <meta itemprop="description" content="Email Verification Request"/>
            </div>

          <script type="application/ld+json">
          {
            "@context": "https://instagroom.me/",
            "@type": "EmailMessage",
            "potentialAction": {
              "@type": "ConfirmAction",
              "name": "Approve Expense",
              "handler": {
                "@type": "HttpActionHandler",
                "url": "https://instagroom.me/api/verify/Bearer%20${user.secretToken}"
              }
            },
            "description": "Email Verification for Instagroom.Me"
          }
          </script>`,
        // html: `Hi there,<br> Copy this token:<br><b>${secretToken}</b>
        // <br>and paste it into the Verification page at the link below.<br>
        // Please Click on the link to verify your email. <br><a href=${link}>
        // Click here to verify</a>`,
      };
      // console.log('Sent by:', process.env.GMAIL_USERNAME);
      // console.log('Line 81 signup_controller.js: ', mailOptions);
      // eslint-disable-next-line func-names
      // eslint-disable-next-line no-unused-vars
      smtpTransport.sendMail(mailOptions, (error, info) => {
        // console.log('Information!!!', info);
        if (error) {
          console.log('Error happened!!!', error);
        } else {
          console.log('Email sent!!!');
        }
      });
    });
}

module.exports = emailverify;
