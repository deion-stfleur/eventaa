import React, {useState, useEffect} from 'react';
import '../../src/App.css'
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import axios from 'axios';


const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/getEvents');
        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  

  const location=useLocation()

 

    return (
      <div className='bg-gray'>
      <div className='home-section'>
        {/* <h2 className='nav-h2'>Welcome back, {location.state.id}</h2> */}

      <div className='inner-home-segments'>
        <p className='events-h1'>Events</p>

        <div className='animated-btns'>

          <div style={{marginRight: 15}}>
            <p>Upcoming</p>
          </div>

          <div>
            <p>Past</p>
          </div>
        </div>
      </div>


      <div className='data-section'>
  {events.length > 0 ? (
    
    <ul className='events-section-2'>
      {events.map((event) => (
        <>
        
        <div>

          <div>
          <li className='event-lists' key={event._id}>
          <Link to={`/event/${event._id}`}>
            <div className='invited-section'>
              <div className='is1'>
              <strong>Event Name:</strong> {event.eventName},{' '}
            <br />
            <strong>Location:</strong> {event.location},{' '}
            <br />
            <strong>Start Date:</strong> {new Date(event.startDate).toLocaleString()},{' '}
            <br />
            <strong>End Date:</strong>{' '}
            <br />
            {event.endDate ? new Date(event.endDate).toLocaleString() : 'N/A'}
            <br />

         

              </div>

              <div className='is2'>

              {event.pastedUrl ? (
  <img className='paste-img' src={event.pastedUrl} alt="Thumbnail" />
) : (
  <>
  <div className='no-img-btn'>
  <p>No image</p>
  </div>
  </>
)}
              {/* <p>You Are Invited!</p> */}
              </div>

            </div>
            </Link>
          </li>
          {/* <hr className='line-comp' /> */}
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

   
      </div>

      
    );
  };
  
  export default Home;