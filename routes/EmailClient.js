/* eslint-disable no-underscore-dangle */
const os = require('os');
const db = require('../models');

require('dotenv').config(); // move to a dev-dependency must run "node -r dotenv/config server.js"
// or "npm run start_local"
const smtpTransport = require('../config/verify'); // { sendMail }

const hostname = os.hostname();
const PORT = process.env.PORT || 3000;

// Email Client
let mailOptions;
let link;
function emailCient(id, eta, ) {
    db.Groomer.findOne({ _id: id })
      .then((dbUser) => {
        const user = {
          id: dbUser._id,
          email: dbUser.email,
          secretToken: dbUser.userToken,
          isVerified: dbUser.isVerified,
        };
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
                      <p>Hi there, ${customer.firstName} ${customer.lastName},<br>
                      <table width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                            <td>
                                <table cellspacing="0" cellpadding="0">
                                    <tr>
                                       Your Mobile Groomer is en route with an ETA of ${eta} minutes.abs
                                       Please let your Groomer know if you need to change your appointment 
                                       call your Groomer at ${groomers.phone}. 
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
                  <meta itemprop="description" content="Email ETA Request"/>
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
                "description": "Email ETA for Instagroom.Me"
              }
              </script>`,

          };

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
    
    module.exports = emailClient;