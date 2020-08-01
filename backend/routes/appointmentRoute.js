const router = require('express').Router();
const db = require('../models');
const authToken = require('../config/authToken');

// Add a new Appointment
router.post('/addAppointment', (req, res) => {
//   res.json('Thank You for Appointment!');
  db.Appointment.create(req.body)
    .then((appointment) => {
      res.json({
        error: false,
        data: appointment,
        message: 'Appointment was sucessfully added.',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: 'An error occured creating an appointment.',
      });
    });
});

router.get('/findappointment', (req, res) => {
  db.Appointment
    .findOne({ customerEmail: /jacob_smith@yahoo.com/i })
    .populate('customer') // only return the Persons name
    .then((appointment) => {
      console.log(appointment);
      res.json({
        error: false,
        data: appointment,
        message: 'Customer info requested',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: 'No Customer with such email found.',
      });
    });
});
module.exports = router;
//   db.Appointment.find({})
//   // .populate("ingredients")
//     .populate({
//       path: 'ingredients', // populate with user collection
//       options: {
//         limit: null, // query string or null
//         skip: null, // query string or null
//       },
//     })
//     .then((foundPizzas) => {
//       res.json({
//         error: false,
//         data: foundPizzas,
//         message: 'All pizzas retrieved.',
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: true,
//         data: null,
//         message: 'Unable to retrieve all pizzas.',
//       });
//     });
// });

// Find all customer
// router.get('/customer', authToken, (req, res) => {
//   db.Customer.find({}).then((customer) => {
//     console.log(customer);
//     res.json({
//       error: false,
//       data: customer,
//       message: 'All available users.',
//     });
//   });
// });

// // Find a single customer
// router.get('/customer/:id', authToken, (req, res) => {
//   db.Customer.findOne({ _id: req.params.id })
//     .then((singleCustomer) => {
//       res.json({
//         error: false,
//         data: singleCustomer,
//         message: 'Customer with requested id',
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: true,
//         data: null,
//         message: 'No Customer with such id found.',
//       });
//     });
// });
