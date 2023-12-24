import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MdAddAlert } from "react-icons/md";
import { GrSend } from "react-icons/gr";
import { CiShare2 } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FcFeedback } from "react-icons/fc";








// import Modal from './Modal';


const Modal = ({ onClose, children }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};


const Modal2 = ({ onClose2, children}) => {
    return (
        <div className="modal">
        <div id="md-fix" className="modal-content">
            <span className="close" onClick={onClose2}>&times;</span>
            {children}
        </div>
    </div>
    )
}

const EventDetailPage = () => {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);

    const location = useLocation();
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        // Set the current URL when the component mounts
        setCurrentUrl(window.location.href);
    }, []);

    const handleCopyClick = () => {
        // Create a textarea element to hold the URL
        const textarea = document.createElement('textarea');
        textarea.value = currentUrl;

        // Append the textarea to the document
        document.body.appendChild(textarea);

        // Select the text in the textarea
        textarea.select();

        // Execute the copy command
        document.execCommand('copy');

        // Remove the textarea from the document
        document.body.removeChild(textarea);

        // Optionally, you can show a notification or perform other actions after copying
        alert('URL copied to clipboard!');
    };

    const [activeTab, setActiveTab] = useState('overview');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleOverviewClick = () => {
        setShowModal(true);
        setShowModal2(false)
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleGuestClick = () => {
        setShowModal2(true);
        setShowModal(false)
    };

    const handleCloseModal2 = () => {
        setShowModal2(false);
    };

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/getEvent/${eventId}`);
                console.log('Fetch URL:', `http://localhost:8000/api/getEvent/${eventId}`);
                const data = await response.json();
                console.log('Data from server:', data); // Add this line
                setEventDetails(data);

            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };


        fetchEventDetails();
    }, [eventId]);



    return (
        <>
            <div className='event-details-page-comp'>
                {eventDetails ? (
                    <>

                    <div className='mx-width'>
                        <Link className='back-arrow' to="/home">
                            <p>go back &gt;</p>
                        </Link>
                        <p className='white-txt'>
                            <strong>Event Name: {eventDetails.data.eventName}{' '}</strong>
                        </p>

                        <div className='event-details-btn-row'>
                            <p onClick={() => handleTabClick('overview')}>Overview</p>
                            <p onClick={() => handleTabClick('guests')}>Guests</p>
                            <p onClick={() => handleTabClick('more')}>More</p>
                        </div>
                    </div>
                        <hr className='gray-line' />

                        {/* Render content based on the active tab */}
                        {activeTab === 'overview' && (
                            <>
                                {/* <p>Overview1</p> */}


                                <div className='tab-row'>

                                    <div className='inner-tab-row'>
                                    <div onClick={handleGuestClick} className='tab-btn'>
                                        <p>Add Reminder <MdAddAlert /></p>
                                    </div>
                                    <div onClick={handleOverviewClick} className='tab-btn'>
                                        <p>Share Event <CiShare2 /></p>
                                    </div>

                                    {/* <div className='tab-btn'>
                                        <p>Send Post <GrSend /></p>
                                    </div> */}

                                    </div>

                                </div>

                                <div className='event-detail-api-col'>

                                    <div className='inner-event-detail-api-col'>

                                        <div className='inner-event-detail-api-col-left'>
                                            <p className='inner-event-detail-api-col-left-title'>Event Info</p>
                                <p className='white-txt'>
                                    <strong>Location:</strong> {eventDetails.data.location}{' '}
                                    <strong>Start Date:</strong> {new Date(eventDetails.data.startDate).toLocaleString()},{' '}
                                    
                                    <strong>End Date:</strong>{' '}
                                    {eventDetails.data.endDate
                                        ? new Date(eventDetails.data.endDate).toLocaleString()
                                        : 'N/A'}
                                </p>

                                        </div>
                                    <div className='sep-line'></div>
                                <div className='inner-event-detail-api-col-right'>
                                    <p className='inner-event-detail-api-col-left-title'>Feedback</p>
                                    <FcFeedback className='feed-icon' />
                                    <p className='fc-text'>No Feedback Collected</p>
                                    <p className='fc-copy'>Send feedback message</p>
                                </div>
                                    </div>


                                <div>
                                    {/* <p className='white-txt mbt-gone'>Hosts</p>
                                    <p className='second-gray-text'>Invite subscribers, contacts and past guests via email or SMS.</p> */}
                                    {/* <hr className='second-gray-line' /> */}

                                    <div className='invite-row'>
                                    <p className='white-txt mbt-gone'>Invites</p>

                                        <div className='invite-guests-btn'>
                                            <p>+ Invite Guests</p>
                                        </div>
                                    </div>
                                    <p className='second-gray-text'>Invite subscribers, contacts and past guests via email or SMS.</p>
                                    <hr className='second-gray-line' />

                                    <div className='invite-bubble'>
                                        <div className='invite-row-2'>
                                            <div className='invite-icon'>
                                            <CiClock2 className='clockIcon' />
                                            </div>

                                            <div>
                                                <p className='invite-title'>No guests yet</p>
                                                <p className='invite-copy'>Once guests have been invited they will show here.</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p className='white-txt'>hosts, special guests, and event managers.</p> */}

                                   
                                </div>

                                </div>
                            </>
                        )}
                        {activeTab === 'guests' && (
                            <>
                            <div className='gLists-containter'>
                                <p className='white-txt'>Guests Lists</p>
                            </div>

                            </>
                        )}
                        {activeTab === 'more' && (
                            <>
                            <div className='gLists-containter'>
                                <p className='white-txt'>Clone Event</p>


                                <div>
                                    <p className='white-txt'>Event Page</p>

                                    <p className='white-txt'>Public URL</p>
                                    <p className='white-txt'>{currentUrl}</p>
                                </div>
                            </div>
                            </>
                        )}
                    </>
                ) : (
                    <p>Loading event details...</p>
                )}

            </div>

            {showModal && (
                <Modal onClose={handleCloseModal}>
                    {/* Modal content goes here */}
                    <p>Share This Event</p>
                    <hr />

                    <div className='icon-row'>

                        <div>
                        <FaFacebook className='shareable-links' />
                            <p className='shareable-text'>Facebook</p>
                        </div>
                        <div>
                        <FaSquareXTwitter className='shareable-links' />
                            <p className='shareable-text'>Tweet</p>
                        </div>
                        <div>
                        <FaLinkedin className='shareable-links' />
                            <p className='shareable-text'>Linkedin</p>
                        </div>
                        {/* <div>
                            <p>Email</p>
                        </div>
                        <div>
                            <p>Text</p>
                        </div> */}

                    </div>

                    <p className='share-link-title'>Share this link:</p>

                    <div className='share-link-container'>
                        <div>
                            <p>{currentUrl}</p>
                        </div>

                        <div className='copy-btn'>
                            <p onClick={handleCopyClick}>Copy</p>
                        </div>
                    </div>
                    {/* <p>This is the modal content for Overview1.</p> */}
                </Modal>
            )}


{showModal2 && (
                <Modal2 onClose2={handleCloseModal2}>
                    {/* Modal content goes here */}
                    <p>Invite Guests</p>
                  <hr />

                    <p className='share-link-title'>Add emails:</p>
                <div className='email-row'>
                    <input className='add-email-input' placeholder='Paste or enter emails here' />

                    <div className='add-btn-cta'>
                        <p>Add</p>
                    </div>
                </div>

              
                </Modal2>
            )}

        </>
    );
};

export default EventDetailPage;
