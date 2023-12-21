// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './Pages/Home';
import Trivia1 from './Pages/Trivia1';
import Profile from './Pages/Profile';
import SignUp from './Pages/Auth';
import Explore from './Pages/Explore';
import Calendar from './Pages/Calendar';
import CalendarCreation from './Pages/Create-Calendar';
import Signup2 from './Pages/Signup';
import EventDetailPage from './Pages/EventDetailPage';
import CalendarEventDetailPage from './Pages/CalendarEventDetailPage';
import { GiPartyPopper } from "react-icons/gi";
import { TbViewfinder } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";






const SearchModal = ({ onClose }) => {
  return (
    <div className="modal-overlay-search">
      <div className="modal-content-search">
        <input placeholder='search calendar events' />
        <hr />
        <Link className='modal-search-create-event-cta' to="/events" onClick={onClose}>
        <p>+ Create Event</p>
        </Link>

        {/* <p>Calendar Events</p>

        <p>Past Events</p> */}
        <button onClick={onClose}>Close x</button>
      </div>
    </div>
  );
};

function App() {

  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  // Function to open the search modal
  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  // Function to close the search modal
  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  return (
    <Router>
      <div className='web-width-dt'>
        <nav className='head-nav'>

          <div className='inner-head-nav'>
          <Link to="/home" className='main-logo-styling-home'>
            <p className='logo'>&#9775;</p>
          </Link>
          <ul className='nav-links'>
           
                <li>
                  <div className='nav-roww'>
                  <Link to="/home">All Events</Link>
                  <Link to="/home">
                  <GiPartyPopper />
                  </Link>
                  </div>

                </li>

                <li>
                  <div className='nav-roww'>
                  <Link id="second-middle" to="/explore">Explore</Link>
                  <Link to="/explore">
                  <TbViewfinder />
                  </Link>
                    </div>
                </li>

                <li>
                  <div className='nav-roww'>
                  <Link id="second-middle" to="/calendar">Calendar</Link>
                  <Link to="/calendar">
                  <IoCalendarOutline />
                  </Link>
                  </div>
                </li>
                <li>
                  <div className='nav-roww'>
                  <Link id="middle" onClick={openSearchModal}>Search</Link>
                  <Link onClick={openSearchModal}>
                  <FaSearch />
                  </Link>
                  </div>
                </li>
             
          
          </ul>
          </div>

          <div className='cr-event-cta'>
            <Link to="/events">
            <p>+ Add new event</p>
            </Link>
          </div>
        </nav>
          <hr />
        {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Trivia1 />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<SignUp />} />
          <Route path="/signup" element={<Signup2 />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/create-calendar" element={<CalendarCreation />} />
          <Route path='/explore' element={<Explore />} />
          <Route path="/event/:eventId" element={<EventDetailPage />} />
          <Route path="/calendar-event/:calendarEventId" element={<CalendarEventDetailPage />} />
        </Routes>

      
      </div>
    </Router>
  );
}

export default App;
