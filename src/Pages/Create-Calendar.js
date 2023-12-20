import React, {useState} from 'react';
import { BrowserRouter as useNavigate } from 'react-router-dom';


const CreateCalendar = () => {


    const [circle, setCircle] = useState('');
    const colors = ["green", "red", "blue", "purple"];
    const history = useNavigate();

    const [imageUrl, setImageUrl] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('gray');
    const [calendarName, setCalendarName] = useState('');
    const [calendarDescription, setCalendarDescription] = useState('');
    const [location, setLocation] = useState('');
    const [pastedUrl, setPastedUrl] = useState('');

    const [error, setError] = useState('');

  
    const handleInputChange = (event) => {
      const url = event.target.value;
      setImageUrl(url);
      setBackgroundColor(url ? `url(${url})` : 'gray');
      setPastedUrl(url);
    };

    const handleCreateEvent = () => {
        // Prepare the event data
        const eventData = {
          calendarName,
          calendarDescription,
          location,
          pastedUrl,
        };
    
        // Make a POST request to your server
        fetch('http://localhost:8000/api/createCalendarEvent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response from the server if needed
            console.log('Calendar Event created successfully:', data);
            console.log('calendar event passed');
  
            if (data.success) {
              history("/calendar");
            } else {
              console.log('Server response indicates failure for calendar event');
              alert('something went wrong please try again')
            }
          })
          .catch(error => {
            console.error('Error creating calendar event:', error);
            console.log('calendar event failed');
            setError('Error please try again....')
            console.log(setCircle)
            console.log(setCalendarName)
            console.log(setLocation)
            console.log(setCalendarDescription)
          });
      };
    return (
        <div>

            <div className='create-calendar-col'>
            <p className='cc-h1'>Create Calendar</p>




            <div className='img-change-container'>
            <div className='img-change-col' style={{ background: backgroundColor }}>
      <div className='img-paste-url-container'>
        <div>
          <p>Paste URL</p>
          <input
            placeholder='Place Image URL here'
            value={imageUrl}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
            </div>
            <div className='cc-bubble'>
                <div className='cc-input-row'>
                    <input placeholder='Calendar name for the event' />
                    <input placeholder='Add a brief description' />
                </div>
            </div>
            <div className='cc-comp-2'>
                <p className='cc-comp-title'>Customization</p>

                <div className='cc-comp-inner'>

                    <div className='circle-selection'>
                <p>Color</p>

                        <div>
            {colors.map((color, index) => (
                <div
                key={index}
                style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: color,
                    margin: '5px',
                    display: 'inline-block',
                    borderRadius: '200px',
                    cursor: 'pointer',
                }}
                ></div>
            ))}

            {circle && (
                <div>
                <p>You selected: {circle}</p>
                <div
                    style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: circle,
                    }}
                ></div>
                </div>
            )}
            </div>
                    </div>

                
                <div className='loc-calendar-container' onClick={handleCreateEvent}>
                    <p>Location</p>
                    <input placeholder='Enter City' style={{borderBottom: '1px solid'}}  />
                </div>
                </div>
            </div>

            <div className='create-calendar-cta-2'>
                <p>Create Calendar</p>
            </div>
            <p>{error}</p>
            </div>

        </div>
    )
}

export default CreateCalendar;