const express = require('express');
const collection = require('./mongo');
const Event = require('./models/events');
const Calendar = require('./models/calendar');
const cors = require('cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');





const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secretKey);



// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      req.user = user;
      next();
    });
  };


app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})


app.post('/api/createEvent', async (req, res) => {
    try {
      const { eventName, startDate, endDate, location, capacity, pastedUrl } = req.body;
      
      // Assuming the user data is stored in the 'users' collection
    //   const user = await collection.findOne({ email: req.user.email });
  
    //   if (!user) {
    //     return res.status(403).json({ message: 'Forbidden: User not found' });
    //   }
  
      // Now, you have the authenticated user information (req.user) available
      // You can use this information to associate the event with the user, for example
      const eventData = {
        eventName,
        startDate,
        endDate,
        location, // Associate the event with the user
        capacity,
        pastedUrl,
        // Add more properties as needed
      };
  
      // Save event data to MongoDB using the Event model
      const newEvent = new Event(eventData);
      await newEvent.save();
  
      // Respond with success message
      res.json({ message: 'Event created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });



  app.post('/api/createCalendarEvent', async (req, res) => {
    try {
      const { pastedUrlCover, calendarName, calendarDescription, location2 } = req.body;
      
      // Assuming the user data is stored in the 'users' collection
    //   const user = await collection.findOne({ email: req.user.email });
  
    //   if (!user) {
    //     return res.status(403).json({ message: 'Forbidden: User not found' });
    //   }
  
      // Now, you have the authenticated user information (req.user) available
      // You can use this information to associate the event with the user, for example
      const calendarData = {
        pastedUrlCover, 
        calendarName, 
        calendarDescription, 
        location2
        // Add more properties as needed
      };
  
      // Save event data to MongoDB using the Event model
      const newEvent2 = new Calendar(calendarData);
      await newEvent2.save();
  
      // Respond with success message
      res.json({ message: 'Calendar Event created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error for creating calendar' });
    }
  });



  app.get('/api/getCalendarEvents', async (req, res) => {
    try {
        const allCalendarEvents = await Calendar.find({});
        res.send({status: "ok", data: allCalendarEvents});
    } catch (error) {
        console.log("could not find calendar events");
    }
  });




  app.get('/api/getEvents', async (req, res) => {
    try {
        const allEvents = await Event.find({});
        res.send({status: "ok", data: allEvents});
    } catch (error) {
        console.log("could not find events");
    }
  });


  app.get('/api/checkTokenValidity', verifyToken, async (req, res) => {
    try {
      // Assuming the user data is stored in the 'users' collection
      const user = await collection.findOne({ email: req.user.email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // You can customize the response based on your needs
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/api/getEvent/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);

        if (event) {
            res.send({ status: "ok", data: event });
        } else {
            res.status(404).send({ status: "not found", message: "Event not found" });
        }
    } catch (error) {
        console.error("Error retrieving event:", error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
});



app.get('/api/getCalendarEvent/:calendarEventId', async (req, res) => {
    try {
        const calendarEventId = req.params.calendarEventId;
        const event = await Calendar.findById(calendarEventId);

        if (event) {
            res.send({ status: "ok", data: event });
        } else {
            res.status(404).send({ status: "not found", message: "Event not found" });
        }
    } catch (error) {
        console.error("Error retrieving calendar event:", error);
        res.status(500).send({ status: "error", message: "Internal server error for getting calendar event" });
    }
});

  app.use((req, res) => {
    res.status(404).json({ message: 'Page Not Found' });
  });

  
app.listen(8000,()=>{
    console.log("port connected");
})