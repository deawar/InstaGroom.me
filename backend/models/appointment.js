const mongoose = require('mongoose');

const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  appointmentDate: {
    type: Date,
    min: () => Date(),
    required: true,
  },
  appointmentTime: {
    type: String,
    trim: true,
    required: true,
  },
  notes: {
    type: String,
  },
  customerEmail: {
    type: String,
    trim: true,
    lowercase: true,
    required: 'Please enter an email id',
  },
  customerName: {
    type: String,
    trim: true,
    required: 'Please enter customer name',
  },
  petService: [
    {
      service: {
        type: String,
        trim: true,
      },
      fee: {
        type: String,
        trim: true,
      },
    },
  ],
  totalFee: {
    type: String,
    trim: true,
  },
  customer: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
  ],
});

module.exports = mongoose.model('Appointment', AppointmentSchema);