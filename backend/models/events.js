const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://deionstfleur:Blessed2023@cluster0.eidarkq.mongodb.net/")
.then(()=>{
    console.log("mongodb connected test 2");
})
.catch(()=>{
    console.log('failed');
})

const eventSchema = new mongoose.Schema({
    eventName: String,
    startDate: Date,
    endDate: Date,
    location: String,
    createdBy: String,
    capacity: String,
    pastedUrl: String,
  }, { collection: 'customEventCollection' });
  
  const Event = mongoose.model('Event', eventSchema);
  
  module.exports = Event;