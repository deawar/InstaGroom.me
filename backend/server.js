require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongojs = require('mongojs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const config = require('./config/database');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const databaseUrl = 'Instagroomer';
const collections = ['customers'];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/groomDb', {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongojs(databaseUrl, collections);

db.on('error', (error) => {
  console.log('Database Error:', error);
});

// Route Files
const customers = require('./routes/post');

app.use('/posts', customers);

app.get('/', (req, res) => {
  console.log('primary route /');
  res.sendFile(path.join(`${__dirname}./public/index.html`));
});

app.post('/submit', (req, res) => {
  console.log(req.body);

  db.customer.insert(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

app.get('/all', (req, res) => {
  db.customer.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

app.get('/find', (req, res) => {
  res.sendFile(path.join(`${__dirname}./public/customer.html`));
});

app.post('/submit', (req, res) => {
  console.log(req.body);

  db.customer.insert(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

app.get('/find/:id', (req, res) => {
  db.notes.findOne(
    {
      _id: mongojs.ObjectId(req.params.id),
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    },
  );
});

app.post('/update/:id', (req, res) => {
  db.customer.update(
    {
      _id: mongojs.ObjectId(req.params.id),
    },
    {
      $set: {
        title: req.body.title,
        customer: req.body.customer, // pet owner
        client: req.body.client, // pet breed and or any special needs
        modified: Date.now(),
      },
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    },
  );
});

app.delete('/delete/:id', (req, res) => {
  db.customer.remove(
    {
      _id: mongojs.ObjectID(req.params.id),
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    },
  );
});

app.delete('/clearall', (req, res) => {
  db.customer.remove({}, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send(response);
    }
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
