import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const CalendarEventDetailPage = () => {
    const { calendarEventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/getCalendarEvent/${calendarEventId}`);
                console.log('Fetch URL:', `http://localhost:8000/api/getCalendarEvent/${calendarEventId}`);
                const data = await response.json();
                console.log('Data from server:', data); // Add this line
                setEventDetails(data);

            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };


        fetchEventDetails();
    }, [calendarEventId]);
    return (
        <div>
            <div className='event-details-page-comp-2'>
                {eventDetails ? (
                    <>
                        <Link to="/calendar" className='back-arrow'>
                            <p>go back</p>
                        </Link>




                        {/* Render content based on the active tab */}

                        <>
                            {/* <p>Overview1</p> */}


                            <img className='paste-img-3' src={eventDetails.data.pastedUrlCover} alt="Thumbnail" />

                            <div className='subscribe-btn'>
                                <p>Subscribe</p>
                            </div>
                            <p style={{color:'white',fontSize: 40, fontWeight: '700'}}>Calendar Event Name</p>
                            <p className='white-txt'>
                                <strong>Description:</strong> {eventDetails.data.calendarDescription},{' '}


                                <strong>Location:</strong> {eventDetails.data.calendarName},{' '}
                                <strong>Location2:</strong> {eventDetails.data.location2},

                            </p>

                            <div>
                                <p className='white-txt'>Hosts</p>
                                <p className='white-txt'>hosts, special guests, and event managers.</p>

                                <p>More Event Dates</p>

                                <div>
                                    <p>+ Submit Events</p>
                                </div>
                            </div>
                        </>


                    </>
                ) : (
                    <p>Loading event details...</p>
                )}

            </div>

        </div>
    )
}
export default CalendarEventDetailPage;