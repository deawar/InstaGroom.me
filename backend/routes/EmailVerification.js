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
        link = `https://localhost:${PORT}/api/verify/Bearer%20${user.secretToken}`;
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
                  Please Click on the link to verify your email. <br><a href=${link}>Click here to verify</a></p>
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
// eslint-disable-next-line no-cond-assign

// user.secretToken = ''; // to clear for verify
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());

// router
//   // eslint-disable-next-line no-unused-vars
//   .get('/verify', (req, res, next) => {
//     console.log('<----------------------------------Req.body: ', req.body);
//     res.render('verifytoken', { title: 'Verify Email Page' });
//   })
//   // eslint-disable-next-line prefer-template
//   // console.log(req.protocol + ':/' + req.get('host'));
//   // eslint-disable-next-line prefer-template
//   // TODO: change this to a promis Referenece: https://zellwk.com/blog/async-await-express/
//   .post('/verify', async (req, res, next) => {
//     try {
//       secretToken = req.body;

//       console.log('Line 182 ----->secretToken:', secretToken);
//       // Find account with matching secret Token
//       const user = await db.User.findOne({
//         where: {
//           secretToken: secretToken.secretToken,
//         },
//       });
//       if (!user.dataValues.secretToken || user.dataValues.active === 1 || user.dataValues.secretToken === ' ') {
//         req.flash('You have either already confirmed your account OR you may need to register');
//         return res.status(404).redirect('/signup', { title: 'Register Page' });
//       }
//       console.log('Line 193------->User db output:', user.dataValues.secretToken);
//       console.log('line 194 ------>User db active output:', user.dataValues.active);

//     if (user.dataValues.secretToken === secretToken.secretToken) {
//       console.log('Domain is matched. Information is from Authentic email. secretToken:',
//         req.query.id === secretToken);
//       console.log('email is verified');
//       console.log('In Verify Route and user: ', user);
//       if (!user) {
//         console.log('*****************User NOT Found!!!****************');
//         // res.;
//         req.flash('Error, No user found.');
//         res.status(401).redirect('/signup');
//         return;
//       }
//       const condition = {
//         where: {
//           secretToken: secretToken.secretToken,
//         },
//       };
//       console.log('Condition----->: ', condition);
//       // db.User.update({ secretToken: null, active: true }, condition)
//       //     .then((result) => {
//       //         console.log('============>', result);
//       //         // if (result.changedRows > 0) {
//       //         //     res.json({
//       //         //         error: false,
//       //         //         data: singleCustomer,
//       //         //         message: `Success! Thank you, please login.`,
//       //         //     });
//       //         //     res.redirect('/login').status(200),
//       //         // }
//       //     })
//       //     .catch((err) => {
//       //         console.log(err);
//       //         res.status(500).json({
//       //         error: true,
//       //         data: null,
//       //         message: 'No Customer with such id found.',
//       //         });
//       //         res.redirect('/signup');
//       //     });
//     } else {
//       req.flash('Success', 'Thank you! Now you can Login.');
//       res.redirect('/login');
//     }
//   } catch (error) {
//     // throw new Error('BROKEN-DID NOT CATCH THE NULL VALUE')
//     // eslint-disable-next-line no-unreachable
//     return next(error);
//   }
// };

module.exports = emailverify;
