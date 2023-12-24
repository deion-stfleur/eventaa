import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const CalendarEventDetailPage = () => {
    const { calendarEventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [imgNull, setImgNull] = useState(null);
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

                            {
                                imgNull ? (
                                    <img className='paste-img-3' src="https://images.unsplash.com/photo-1461088945293-0c17689e48ac?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                    ) : (
                                        <img className='paste-img-3' src={eventDetails.data.pastedUrlCover} alt="Thumbnail" />
                                )
                            }

                            <div className='subscribe-btn'>
                                <p>Subscribe</p>
                            </div>
                            <p style={{ color: 'white', fontSize: 40, fontWeight: '700' }}>Calendar Event Name</p>
                            <p className='white-txt'>
                                <strong>Description:</strong> {eventDetails.data.calendarDescription},{' '}


                                <strong>Location:</strong> {eventDetails.data.calendarName},{' '}
                                <strong>Location2:</strong> {eventDetails.data.location2},

                            </p>

                            <div>
                      

                                <div className='submit-event-btn'>
                                    <Link to="/events" style={{textDecoration: 'unset'}}>
                                    <p>+ Submit Events</p>
                                    </Link>
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