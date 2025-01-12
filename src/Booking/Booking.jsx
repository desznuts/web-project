import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import LoginModal from './LoginModal';

const Booking = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const checkAuth = async () => {
        try {
            const response = await axios.get('/api/user-status');
            if (response.data.isAuthenticated) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                setShowLogin(true);
            }
        } catch (error) {
            console.error('Check auth error:', error);
        }
    }

    const handleBookTicket = (e) => {
        e.preventDefault();
        checkAuth();
    }

    return (
        <div>
            <button onClick={handleBookTicket}>Book Ticket</button>
            {showLogin && <LoginModal />}
        </div>
    );
}