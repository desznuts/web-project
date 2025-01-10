import React from 'react';
import styles from './AboutContent.module.css';

function AboutContent () {
    return (
        <div className={styles.aboutContent}>
            <section className={styles.aboutSection}>
                <h1>About Us</h1>
                <p>
                    Welcome to Eventify, your ultimate destination for discovering and booking tickets to the hottest events in town! 
                    Whether you're looking for concerts, parties, festivals, or exclusive gatherings, Eventify keeps you updated with 
                    the latest happenings and makes it easy to secure your spot. Founded with a passion for bringing people together 
                    through unforgettable experiences, we are committed to making event discovery and ticket booking seamless and enjoyable.
                </p>
            </section>

            <section className={styles.mvSection}>
                <div className={styles.missionSection}>
                    <h2>Our Mission</h2>
                    <p>
                        At Eventify, our mission is to connect people with the events they love. We aim to simplify the process of discovering 
                        and booking tickets to concerts, parties, and other exciting events, ensuring that our users never miss out on the 
                        experiences that matter most to them. By providing a user-friendly platform and up-to-date event information, we strive 
                        to make every event accessible and enjoyable.
                    </p>
                </div>
                <div className={styles.visionSection}>
                    <h2>Our Vision</h2>
                    <p>
                        Our vision is to become the go-to platform for event discovery and ticket booking worldwide. We envision a future where 
                        anyone, anywhere, can easily find and attend events that inspire, entertain, and bring people together. Through innovation 
                        and a commitment to exceptional user experiences, we aim to redefine how people connect with events and create lasting memories.
                    </p>
                </div>

            </section>

            <section className={styles.keyPeopleSection}>
                <h2>Meet Our Founder</h2>
                <div className={styles.keyPersonContainer}>
                    <div className={styles.keyPerson}>
                        <img src="/images/myimg.JPG" alt="John Doe" />
                        <h3>Des Mariano</h3>
                        <p> <i>Founder & CEO</i></p>
                        <p>Des is a seasoned entrepreneur with a passion for events and technology. He founded Eventify with the goal of making event discovery and ticket booking easier and more enjoyable. With a background in software development and a keen eye for innovation, Des is dedicated to driving Eventify forward and making it the go-to platform for event enthusiasts worldwide.</p>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default AboutContent;