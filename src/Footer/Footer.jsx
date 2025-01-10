import React from 'react';
import { FaFacebook, FaTwitch, FaInstagram, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <h3>About Us</h3>
                        <p>Eventify connects you to unforgettable live events, from concerts to festivals, making it easy to find experiences you’ll love. Our team is passionate about bringing communities together through music and culture. Discover your next favorite event with us!</p>
                    </div>

                    <div className={styles.column}>
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>Follow Us</h3>
                        <div className={styles.socialIcons}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={30}/> </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={30}/></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={30}/></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>&copy; 2024 Jose. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
