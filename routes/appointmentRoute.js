/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const db = require('../models');
const authToken = require('../config/authToken');

// Add a new Appointment
router.post('/addAppointment', authToken, (req, res) => {
  db.Customer.findOne({ email: req.body.customerEmail }).then((customer) => {
    if (!customer) {
      res.json({
        error: true,
        data: null,
        message: 'No customer with the given email found',
      });
    } else {
      db.Appointment.create(req.body)
        .then((appointment) => {
          const appointmentId = appointment._id;
          db.Customer.findOneAndUpdate(
            { email: appointment.customerEmail },
            { $push: { appointment: appointmentId } },
            { new: true },
          )
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
    }
  });
});

// Find appointment by Email
router.get('/findappointmentbyEmail', authToken, (req, res) => {
  db.Customer.find({ email: req.body.customerEmail })
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

// Find appointment by date
router.get('/findappointment/:date', (req, res) => {
  db.Appointment.find({ appointmentDate: req.params.date })
    // .populate('appointment') // only return the Persons name
    .then((appointment) => {
      console.log(appointment);
      if (!appointment.length) {
        res.json({
          error: false,
          data: appointment,
          message: 'You do not have any appointment for the date specified',
        });
      } else {
        res.json({
          error: false,
          data: appointment,
          message: 'Requested Appointment Info for the day',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: 'Oops something went wrong!!',
      });
    });
});
module.exports = router;
