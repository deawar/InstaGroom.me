require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const HTMLRoutes = require('./routes/htmlRoutes');
const CustomerRoutes = require('./routes/customerRoutes');
const AuthRoutes = require('./routes/authRoutes');
const GoogleApiRoutes = require('./routes/googleapiRoutes');
const AppointmentRoutes = require('./routes/appointmentRoute');

// MongoDB cloud URL
const { MONGODB_URI } = process.env;

// Defining Port
const PORT = process.env.PORT || 3006;
const app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(bodyParser.json());

// Connection to mongoose
mongoose.connect(MONGODB_URI, {
  // All these to get rid of Mongoose warnings
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
// mongoose.connect(mongoURL);
mongoose.connection.on('connected', () => {
  console.log('Sucessfully connected to MongoDb Cloud');
});
mongoose.connection.on('error', (error) => {
  console.log('Database Error:', error);
});

// Defining Routes
app.use(HTMLRoutes);
app.use('/api', CustomerRoutes);
app.use('/api', AuthRoutes);
app.use('/api', GoogleApiRoutes);
app.use('/api', AppointmentRoutes);

// Listening to PORT
app.listen(PORT, () => {
  console.log(`==> 🌎 App running on http://localhost:${PORT}`);
});

// app.post('/submit', (req, res) => {
//   console.log(req.body);

//   db.customer.insert(req.body, (error, data) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(data);
//     }
//   });
// });

// app.get('/all', (req, res) => {
//   db.customer.find({}, (error, data) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.json(data);
//     }
//   });
// });

// app.get('/find', (req, res) => {
//   res.sendFile(path.join(`${__dirname}./public/customer.html`));
// });

// app.post('/submit', (req, res) => {
//   console.log(req.body);

//   db.customer.insert(req.body, (error, data) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(data);
//     }
//   });
// });

// app.get('/find/:id', (req, res) => {
//   db.notes.findOne(
//     {
//       _id: mongojs.ObjectId(req.params.id),
//     },
//     (error, data) => {
//       if (error) {
//         res.send(error);
//       } else {
//         res.send(data);
//       }
//     },
//   );
// });

// app.post('/update/:id', (req, res) => {
//   db.customer.update(
//     {
//       _id: mongojs.ObjectId(req.params.id),
//     },
//     {
//       $set: {
//         title: req.body.title,
//         customer: req.body.customer, // pet owner
//         client: req.body.client, // pet breed and or any special needs
//         modified: Date.now(),
//       },
//     },
//     (error, data) => {
//       if (error) {
//         res.send(error);
//       } else {
//         res.send(data);
//       }
//     },
//   );
// });

// app.delete('/delete/:id', (req, res) => {
//   db.customer.remove(
//     {
//       _id: mongojs.ObjectID(req.params.id),
//     },
//     (error, data) => {
//       if (error) {
//         res.send(error);
//       } else {
//         res.send(data);
//       }
//     },
//   );
// });

// app.delete('/clearall', (req, res) => {
//   db.customer.remove({}, (error, response) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(response);
//     }
//   });
// });
