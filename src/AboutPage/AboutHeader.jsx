import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import styles from './AboutHeader.module.css'

function AboutHeader () {

    const [scrolling, setScrolling] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
        <header className={styles.header}>
            <nav className={`${styles.navbar} ${scrolling ? styles.scrolled : ''}`}> {/* Apply scrolling effect */}
                <h1 className={styles.webName}>EVENTIFY</h1>
                <button className={styles.menuToggle} onClick={toggleMenu}>
                    &#9776;
                </button>
                <ul className={menuOpen ? styles.open : ''}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/artist">Artist</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                </ul>
            </nav>
            
            <h1 className={styles.aboutTitle}>CLUB PARTY</h1>
        </header>
    )
}

export default AboutHeader;