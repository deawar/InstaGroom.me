const mongoose = require('mongoose');

const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  apptDate: {
    type: String,
    trim: true,
    required: true,
  },
  apptTime: {
    type: String,
    trim: true,
    required: true,
  },
  notes: {
    type: String,
    trim: true,
    required: true,
  },
  customer: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
  ],
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
