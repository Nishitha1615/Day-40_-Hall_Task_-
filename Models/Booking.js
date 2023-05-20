const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      
    }
  });

  bookingSchema.statics.countBookingsByCustomer = function(customerName) {
    return this.countDocuments({ customerName });
  };

  const Booking = mongoose.model('Booking', bookingSchema);
  module.exports = Booking;