const express = require('express');

const router = express.Router();

const Customer = require('../models/customers');

router.post('/new', (req, res) => {
  req.assert('customer', 'Customer must be set').notEmpty();
  req.assert('pet', 'Pet must have content').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  } else {
    const customer = new Customer();
    customer.customer = req.body.customer;
    customer.content = req.body.content;

    customer.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: 'Customer created', customer });
      }
    });
  }
});

router.get('/', (req, res) => {
  Customer.find({}, (err, customers) => {
    if (err) {
      console.log(err);
    } else {
      // Send all posts.
      res.json({ customers });
    }
  });
});

router.post('/edit/:id', (req, res) => {
  const post = {};
  post.customer = req.body.customer;
  post.content = req.body.content;

  const query = { _id: req.params.id };

  Customer.update(query, post, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ msg: 'Customer successfully updated', post });
    }
  });
});

router.delete('/:id', (req, res) => {
  const query = { _id: req.params.id };

  Customer.remove(query, (err) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: 'Customer deleted successfully!' });
  });
});

module.exports = router;
