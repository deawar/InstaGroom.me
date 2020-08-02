const router = require('express').Router();
const db = require('../models');
const authToken = require('../config/authToken');

// Test AuthToken
router.get('/hey', authToken, (req, res) => {
  res.send('Ho!');
});

// Add a new customer
router.post('/addCustomer', (req, res) => {
  console.log(req.body);
  db.Customer.create(req.body)
    .then((customer) => {
      res.json({
        error: false,
        data: customer,
        message: 'Customer was sucessfully added.',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: 'An error occured creating new user.',
      });
    });
});

// Find all customer
router.get('/customer', authToken, (req, res) => {
  db.Customer.find({})
    .populate('appointment')
    .then((customer) => {
      console.log(customer);
      res.json({
        error: false,
        data: customer,
        message: 'All available users.',
      });
    });
});

// Find a single customer
router.get('/customer/:id', authToken, (req, res) => {
  db.Customer.findOne({ _id: req.params.id })
    .populate('appointment')
    .then((singleCustomer) => {
      res.json({
        error: false,
        data: singleCustomer,
        message: 'Customer with requested id',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: 'No Customer with such id found.',
      });
    });
});

module.exports = router;
