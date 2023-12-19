import React, { useState, useEffect }  from 'react';
import '../../src/App.css'
import Modal from './Modal';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';



const Trivia1 = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');



  const generateThumbnail = (url) => {
    // Assuming you have a function to generate a thumbnail URL (e.g., resizing the image on the server)
    // For this example, we'll simply use the same URL as the thumbnail.
    setThumbnailUrl(url);
  };

    const [error, setError] = useState('');

    const history = useNavigate();

    const [eventName, setEventName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [pastedUrl, setPastedUrl] = useState('');

    const handleInputChange = (event) => {
      const url = event.target.value;
      setImageUrl(url);
      generateThumbnail(url);
    
      // Your additional onChange logic here
      setPastedUrl(url);
    };
  
    const handleCreateEvent = () => {
      // Prepare the event data
      const eventData = {
        eventName,
        startDate,
        endDate,
        location,
        capacity,
        pastedUrl,
      };
  
      // Make a POST request to your server
      fetch('http://localhost:8000/api/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the server if needed
          console.log('Event created successfully:', data);
          console.log('passed');

          if (data.success) {
            history("/home");
          } else {
            console.log('Server response indicates failure');
            history("/home");
          }
        })
        .catch(error => {
          console.error('Error creating event:', error);
          console.log('failed');
          setError('Error please try again....')
        });
    };
    return (
      <div className='events-section'>
      <div className='inner-left'>


        <input
          type='text'
          placeholder='Event Name'
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        <p>Start</p>
        <input
          type='datetime-local'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <p>End</p>
        <input
          type='datetime-local'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <p>Location</p>
        <input
          type='text'
          placeholder='Location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* <p>Theme</p> */}

        <div>
          <p className='eo-copy'>Event Options</p>

          <div>
            <div className='eo-col'>
              <p>Capacity</p>

              <div className='eo-input-col'>
                <input
                 placeholder='Unlimited' 
                 className='eo-input'
                 value={capacity}
                 onChange={(e) => setCapacity(e.target.value)}
                 />
              </div>
            </div>

            {/* <div className='eo-col'>
              <p>Visibilty</p>

              <div className='eo-input-col'>
                <p>Public</p>
              </div>
            </div> */}

  
          </div>
        </div>
        {/* Add more input fields as needed for other properties */}
        <p>{error}</p>
        <div className='create-btn' onClick={handleCreateEvent}>
          <p className='create-text'>Create Event</p>
        </div>
      </div>

      <div className='inner-right'>
        <div className='add-section'>
          <p>(Optional)</p>
        <p>Upload Image</p>
        </div>

      <p>Paste URL:</p>
        <input
        type="text"
        id="imageUrl"
        value={imageUrl}
        onChange={handleInputChange}
        placeholder="Paste image URL here"
      />

      {thumbnailUrl && (
        <div>
          <p>Thumbnail:</p>
          <img className='paste-img' src={thumbnailUrl} alt="Thumbnail" />
        </div>
      )}
        {/* <div className='eo-col' id="mb-fix">
              <p>Add emails?</p>

              <div className='eo-input-col'>
                <div className='add-btn'>
                <p>+</p>
                </div>
              </div>
            </div> */}
      </div>
    </div>
    );
  };
  
  export default Trivia1;