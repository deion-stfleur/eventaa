import React, {useState, useEffect} from 'react';
import '../../src/App.css'
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Map from 'react-map-gl';


const Explore = () => {
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
        <div>
        <h1 className='event-list-heading'>Event List</h1>


        <div className="events-top-comp">
 
        <div className='left-panel'>
            <div>
                <p className='inner-lp-title'>Explore Events</p>
                <p className='inner-lp-copy'>Discover exciting events taking place in vibrant urban centers every week. Stay connected and explore diverse community calendars by subscribing today.</p>

                {/* <p className='inner-lp-copy'>Choose Location</p> */}
{/* 
                <div className='pic-img-row'>
                    <div>
                        <p>Brockton</p>
                    </div>

                    <div>
                        <p>Boston</p>
                    </div>
                </div> */}
            </div>
        </div>
        <Map
      mapboxAccessToken="pk.eyJ1IjoiZGVpb25zdGZsZXVyIiwiYSI6ImNscTFoZ21uejA4bmgyam1xc2Y5MmFwc2MifQ.1jezNRykcGiitrVZfkdrDQ"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: '100% !important'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
        </div>

        <div>
            <p className='trending-title'>Trending Calendars</p>

            <div className='data-section-2'>
  {events.length > 0 ? (
    
    <ul className='trending-subscribe-section'>
      {events.map((event) => (
        <>
        
        <div className='wd-24'>

          <div>
          <li className='trending-card' key={event._id}>
         
            <div className='subscribe-section'>
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
                    <div className='event-subscribe-btn'>
                   
                        <p>Subscribe</p>
                  
                    </div>   
                </>
                ) : (
                <>
                <div className='no-img-btn'>
                    <img className='paste-img-2' alt="Thumbnail" src="https://images.unsplash.com/photo-1682686580950-960d1d513532?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw5Nnx8fGVufDB8fHx8fA%3D%3D" />
                </div>
                <div className='event-subscribe-btn'>
               
                        <p>Subscribe</p>
              
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
      </div>
    )

};

export default Explore;