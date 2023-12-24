import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';



const Main = () => {
    return (
        <div>
            <p className='main-h1-title'>Host Delightful Events with friends</p>

            <div className='main-cta-max-container'>
                <Link to="/home">
                <p>Explore</p>
                </Link>
            </div>
            
        </div>
    )
}

export default Main;