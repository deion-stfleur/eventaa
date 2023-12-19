const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://deionstfleur:Blessed2023@cluster0.eidarkq.mongodb.net/")
.then(()=>{
    console.log("mongodb connected test 3");
})
.catch(()=>{
    console.log('failed');
})

const calendarSchema = new mongoose.Schema({
    pastedUrlCover: String,
    calendarName: String,
    calendarDescription: String,
    location2: String,
  }, { collection: 'calendarEventCollection' });
  
  const Calendar = mongoose.model('Calendar', calendarSchema);
  
  module.exports = Calendar;