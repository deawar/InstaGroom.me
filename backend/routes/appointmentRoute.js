/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const db = require('../models');
const authToken = require('../config/authToken');

// Add a new Appointment
router.post('/addAppointment', (req, res) => {
  db.Appointment.create(req.body)
    .then((appointment) => {
      const appointmentId = appointment._id;
      db.Customer.findOneAndUpdate({ email1: appointment.customerEmail },
        { $push: { appointment: appointmentId } },
        { new: true })
        .then((updatedCustomer) => {
          console.log(updatedCustomer);
          res.json({
            error: false,
            data: appointment,
            message: 'Appointment was sucessfully added.',
          });
        })
        .catch((err) => {
          console.log(err);
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

router.get('/findappointmentbyEmail', authToken, (req, res) => {
  db.Customer
    .find({ email1: req.body.customerEmail })
    .populate('appointment') // only return the Persons name
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
