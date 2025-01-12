import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './HomepageHeader.css';
import CardSlider from '../Card/Card-slider';
import LoginModal from '../LoginForm/Login';
import RegistrationModal from '../RegistrationForm/Registration';
import CardDetailModal from '../Card/CardDetailModal';
import api from '../api';

function Header({ children }) {
    const [scrolling, setScrolling] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const checkAuthenticationStatus = async () => {
            try {
                const response = await api.get('/user-status');
                if (response.data.isAuthenticated) {
                    setIsLoggedIn(true);
                }
            } catch (err) {
                console.log(err);
            }
        };

        checkAuthenticationStatus();
    }, []);

    const openLoginModal = () => {
        setLoginModalOpen(true);
        setRegistrationModalOpen(false);  // Close the registration modal if open
    }

    const closeLoginModal = () => {
        setLoginModalOpen(false);
    }

    const openRegistrationModal = () => {
        setRegistrationModalOpen(true);
        setLoginModalOpen(false);  // Close the login modal if open
    }

    const closeRegistrationModal = () => {
        setRegistrationModalOpen(false);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeCardDetailModal = () => {
        setSelectedCard(null);
    };

    const handleLogout = async () => {
        setLogoutLoading(true);
        try {
            await api.post('/logout');
            setIsLoggedIn(false);
        } catch (err) {
            setError('Failed to logout. Please try again.');
        } finally {
            setLogoutLoading(false);
        }
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        closeLoginModal();
    };

    const headerCards = [
        { id: 1, title: 'Rock Fest 2025', content: 'Join us for an epic night of rock music!', imgUrl: '/images/img1.jpg', date: '2025.01.05', price: 1000 },
        { id: 2, title: 'Summer Jazz Nights', content: 'Relax to the smooth sounds of jazz under the stars.', imgUrl: '/images/img2.jpg', date: '2025.01.15', price: 1500 },
        { id: 3, title: 'Pop Legends Live', content: 'Experience the biggest pop hits performed live.', imgUrl: '/images/img3.jpg', date: '2025.01.22', price: 2000 },
        { id: 4, title: 'Indie Vibes Festival', content: 'Discover new indie bands and enjoy great music.', imgUrl: '/images/img4.jpg', date: '2025.02.09', price: 1200 },
        { id: 5, title: 'Classical Evening', content: 'An evening of timeless classical performances.', imgUrl: '/images/img5.jpg', date: '2025.02.10', price: 1800 },
        { id: 6, title: 'EDM Dance Party', content: 'Get ready to dance the night away with top EDM DJs.', imgUrl: '/images/img6.jpg', date: '2025.02.26', price: 2500 },
        { id: 7, title: 'Hip-Hop Throwdown', content: 'Catch the hottest hip-hop acts live on stage.', imgUrl: '/images/img7.jpg', date: '2025.03.06', price: 2200 },
        { id: 8, title: 'Country Music Hoedown', content: 'Saddle up for a night of country music and line dancing.', imgUrl: '/images/img8.jpg', date: '2025.03.12', price: 1700 },
        { id: 9, title: 'Blues & Brews', content: 'Enjoy the best blues music with a selection of local brews.', imgUrl: '/images/img9.jpg', date: '2025.03.30', price: 1900 },
        { id: 10, title: 'Acoustic Chill Sessions', content: 'Unwind with acoustic performances from talented artists.', imgUrl: '/images/img10.jpg', date: '2025.04.01', price: 1400 },
    ];

    const handleScroll = () => {
        if (window.scrollY > 20) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className="header">
            <nav className={`navbar ${scrolling ? 'scrolled' : ''}`}>
                <h1 className="webName">EVENTIFY</h1>
                <button className="menu-toggle" onClick={toggleMenu}>
                    &#9776;
                </button>
                <ul className={menuOpen ? 'open' : ''}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/artist">Artist</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                    <li>
                        {isLoggedIn ? (
                            <button className="loginButton" onClick={handleLogout} disabled={logoutLoading}>
                                {logoutLoading ? 'Logging out...' : 'Logout'}
                            </button>
                        ) : (
                            <button className="loginButton" onClick={openLoginModal}>Login</button>
                        )}
                    </li>
                </ul>
            </nav>

            {/* Conditionally render modals */}
            {loginModalOpen && <LoginModal closeModal={closeLoginModal} openRegistrationModal={openRegistrationModal} onLoginSuccess={handleLoginSuccess} />}
            {registrationModalOpen && <RegistrationModal closeModal={closeRegistrationModal} openLoginModal={openLoginModal} />}
            {selectedCard && <CardDetailModal card={selectedCard} closeModal={closeCardDetailModal} />}

            <div className='allevent-title'>
                <div className='titleContainer'>
                    <span className='top'>Upcoming</span>
                    <span className='bottom'>Events</span>
                </div>
                <span className='line'></span>
                <p className="description">See the latest updates on <br /> upcoming events this year. </p>
                <p className="description">Click and book your tickets now!</p>
            </div>
            <CardSlider cards={headerCards} onCardClick={handleCardClick} /> {children}
        </header>
    );
}

export default Header;