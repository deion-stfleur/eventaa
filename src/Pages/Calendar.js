import React, {useState, useEffect} from 'react';
import '../../src/App.css'
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import axios from 'axios';


const Calendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/getCalendarEvents');
          const data = await response.json();
          setEvents(data.data);
          console.log(data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    return (
        <div className='calendar-container'>
            <p className='calendar-text'>Calendars</p>
            {/* <hr /> */}

            <div>
                <div>
                    <p className='calendar-text'>Subscribed Calendars</p>
                </div>
                <div className='data-section-2'>
  {events.length > 0 ? (
    
    <ul className='events-section-2-2'>
      {events.map((event) => (
        <>
        
        <div>

          <div>
          <li className='event-lists-2' key={event._id}>
         
            <div className='invited-section'>
              <div className='invited-section-2-inner'>
              <strong>Event Name:</strong> {event.calendarName}{' '}
              <strong>Description:</strong> {event.calendarDescription}{' '}
              <strong>Location:</strong> {event.location}{' '}
              
            <br />
          

         

              </div>

              <div className='invited-section-2-inner-right'>

              {event.pastedUrlCover ? (
                <>
                    <img className='paste-img-2' src={event.pastedUrlCover} alt="Thumbnail" />
                    <div className='view-calendar-cta'>
                    <Link to={`/calendar-event/${event._id}`}>
                        <p>View Calendar</p>
                    </Link>   
                    </div>   
                </>
                ) : (
                <>
                <div className='no-img-btn'>
                    <img className='paste-img-2' alt="Thumbnail" src="https://images.unsplash.com/photo-1682686580950-960d1d513532?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw5Nnx8fGVufDB8fHx8fA%3D%3D" />
                </div>
                <div className='view-calendar-cta'>
                <Link to={`/calendar-event/${event._id}`}>
                        <p>View Calendar</p>
                </Link>
                    </div> 
                </>
                )}
                            {/* <p>You Are Invited!</p> */}
              </div>

            </div>
    
          </li>
      
          </div>

            {/* <p> <strong>Start Date:</strong> {new Date(event.startDate).toLocaleString()},{' '}</p> */}
        </div>
       
        </>
      ))}
    </ul>

    
  ) : (
    <div className='inner-data-section'>
      <p className='noti-text'>
        No events found yet.. Either no events have been found or you need to create one...
      </p>
      <div className='main-cta'>
        <p>Create Event</p>
      </div>
    </div>
  )}
</div>
            </div>
                <Link to="/create-calendar" className='create-calendar-cta'>
            <div className='event-adding'>
                <p>Create +</p>
            </div>
                </Link>

        </div>
    )
}

export default Calendar;