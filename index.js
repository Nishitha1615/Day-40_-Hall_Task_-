const express = require('express');
const app = express();
app.use(express.json());
require("./db/conn");
const Room = require('./Models/Room');
const Booking = require('./Models/Booking')


// Q1) Creating a Room 
app.post('/rooms', async (req, res) => {
    
      const { numberOfSeats, amenities, pricePerHour, roomName, bookedStatus, bookingDate,startTime,endTime,customerName } = req.body;
  
      // Create a new room
      const newRoom = await new Room({
        numberOfSeats: numberOfSeats,
        amenities:amenities,
        pricePerHour:pricePerHour,
        roomName:roomName,
        bookedStatus:bookedStatus,
        customerName:customerName,
        bookingDate:bookingDate,
        startTime:startTime,
        endTime:endTime
      });
  
      // Save the room to the database
      await newRoom.save();
  
      res.json(newRoom);
   
  });

  //Q2) Booking a Room 
  
  app.post('/bookings', async (req, res) => {
    
      const { customerName, date, startTime, endTime, roomId } = req.body;
  
      const newBooking =await new Booking({
        customerName,
        date,
        startTime,
        endTime,
        roomId
      });
  
      // Save the booking to the database
      await newBooking.save();
  
      res.json(newBooking);
   
  });

// Q3) List all Rooms with Booked Data 

app.get('/rooms/bookings/', async (req, res) => {
    try {
      const bookings = await Room.find();
  
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the bookings' });
    }
  });

// Q4) List all customers with booked Data

  app.get('/getBookedCustomerAllDetails', async (req,res) => {
    
    const custormerroom= await Room.find();
    console.log(custormerroom)
    const filterNames = [];
    custormerroom.map((dataAll)=>{
        if(dataAll.bookedStatus === "booked")
        {
            filterNames.push({
                "CustomerName":dataAll.customerName,
                "RoomName":dataAll.roomName, 
                // "Date":dataAll.Date,
                "Start_Time":dataAll.startTime,
                "End_Time":dataAll.endTime,
            });
        }
    })
    res.send(filterNames);
});

//Q5) List how many times a customer has booked the room

app.get('/customerbook', async (req, res) => {
    try {
      const bookings = await Booking.find();
  
      // Create an array to store the customer booking counts
      const customerBookingCounts = [];
  
      // Loop through the bookings and count the bookings for each customer
      for (const booking of bookings) {
        const customerName = booking.customerName;
  
        // Check if the customer booking count already exists in the array
        const existingCustomerBookingCount = customerBookingCounts.find(count => count.customerName === customerName);
  
        if (existingCustomerBookingCount) {
          existingCustomerBookingCount.count++;
        } else {
          // Create a new customer booking count object
          const newCustomerBookingCount = {
            customerName,
            count: 1
          };
          customerBookingCounts.push(newCustomerBookingCount);
        }
      }
  
      // Add the customer booking counts to the bookings response
      const bookingsWithCounts = bookings.map(booking => {
        const customerName = booking.customerName;
        const customerBookingCount = customerBookingCounts.find(count => count.customerName === customerName);
  
        return {
          ...booking._doc,
          bookingCount: customerBookingCount.count
        };
      });
  
      res.json(bookingsWithCounts);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the bookings' });
    }
  });


  // Start the server
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });