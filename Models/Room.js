
const mongoose = require('mongoose');

// Define the Room schema
const roomSchema = new mongoose.Schema({
  roomName: String,
  bookedStatus: String,
  customerName: String,
  bookingDate: String,
  startTime: String,
  endTime: String,
  numberOfSeats: {
    type: Number,
    required: true
  },
  amenities: {
    type: String,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true
  }
});

// Create the Room model
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;