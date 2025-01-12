import React, { useState } from 'react';
import styles from './CardDetailModal.module.css';
import api from '../api';
import LoginModal from '../LoginForm/Login';
import RegistrationModal from '../RegistrationForm/Registration';

const BookingModal = ({ card, closeModal, userEmail }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState(userEmail || '');
    const [tickets, setTickets] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [specialRequests, setSpecialRequests] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBooking = async () => {
        setLoading(true);
        try {
            const response = await api.post('/bookings', {
                name,
                email,
                tickets,
                payment_method: paymentMethod,
                special_requests: specialRequests,
                card_title: card.title,
                card_date: card.date,
                card_price: card.price,
                total_price: totalPrice,
            });
            alert(`Booking ${tickets} ticket(s) for ${card.title} by ${name} (${email}) using ${paymentMethod}. Special requests: ${specialRequests}`);
            closeModal();
        } catch (error) {
            console.error('Booking failed:', error.response.data);
            alert(`Booking failed: ${error.response.data.message}`);
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = card.price * tickets;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={closeModal}>X</button>
                <h2>Book Ticket for {card.title}</h2>
                <p>Date: {card.date}</p>
                <p>Price per Ticket: P{card.price}</p>
                <p>Total Price: P{totalPrice}</p>
                <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="tickets">Number of Tickets:</label>
                        <input
                            type="number"
                            id="tickets"
                            value={tickets}
                            onChange={(e) => setTickets(e.target.value)}
                            min="1"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="paymentMethod">Payment Method:</label>
                        <select
                            id="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                        >
                            <option value="creditCard">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="bankTransfer">Bank Transfer</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="specialRequests">Special Requests:</label>
                        <textarea
                            id="specialRequests"
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles.confirmButton} disabled={loading}>
                        {loading ? 'Booking...' : 'Confirm Booking'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const CardDetailModal = ({ card, closeModal }) => {
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);

    if (!card) return null;

    const checkAuthentication = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            setBookingModalOpen(true);
        } else {
            setLoginModalOpen(true);
        }
    };

    const handleLoginSuccess = () => {
        setLoginModalOpen(false);
        setBookingModalOpen(true);
    };

    const handleCloseLoginModal = () => {
        setLoginModalOpen(false);
    };

    const handleCloseBookingModal = () => {
        setBookingModalOpen(false);
    };

    const handleOpenRegisterModal = () => {
        setRegisterModalOpen(true);
        setLoginModalOpen(false);
    };

    const handleCloseRegisterModal = () => {
        setRegisterModalOpen(false);
    };

    return (
        <>
            {bookingModalOpen && <BookingModal card={card} closeModal={handleCloseBookingModal} />}
            {loginModalOpen && <LoginModal closeModal={handleCloseLoginModal} openRegistrationModal={handleOpenRegisterModal} onLoginSuccess={handleLoginSuccess} />}
            {registerModalOpen && <RegistrationModal closeModal={handleCloseRegisterModal} openLoginModal={() => setLoginModalOpen(true)} />}
            {!bookingModalOpen && !loginModalOpen && !registerModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={closeModal}>X</button>
                        <img src={card.imgUrl} alt={card.title} />
                        <h2>{card.title}</h2>
                        <p>{card.content}</p>
                        <p>Date: {card.date}</p>
                        <p>Ticket Price: P{card.price}</p>
                        <button className={styles.bookNowButton} onClick={checkAuthentication}>Book Ticket</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CardDetailModal;