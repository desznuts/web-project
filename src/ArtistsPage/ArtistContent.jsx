import { useState } from 'react';
import styles from "./ArtistContent.module.css";

// Modal component
function Modal({ showModal, artist, onClose }) {
    if (!showModal) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeModalButton} onClick={onClose}>X</button>
                <h2>{artist.name}</h2>
                <img src={artist.image} alt={artist.name} className={styles.modalImage} />
                <p>{artist.description}</p>
            </div>
        </div>
    );
}

function ArtistContent() {
    const artists = [
        { name: "Taylor Swift", image: "/images/taylorswift.jpg", description: " Actively on her record-breaking Eras Tour, re-recording her early albums, with 1989 (Taylor’s Version) recently released." },
        { name: "Ed Sheeran", image: "/images/edsheeran.jpg", description: "Recently completed his Mathematics Tour and released his latest album, Autumn Variations, focusing on personal stories." },
        { name: "Drake", image: "/images/drake.jpg", description: "Released his new album For All the Dogs and recently announced a break from music after finishing his latest tour." },
        { name: "Adele", image: "/images/adele.jpg", description: "Continuing her residency in Las Vegas titled Weekends with Adele, captivating audiences with her powerful ballads." },
        { name: "Alan Walker", image: "/images/alanwalker.jpg", description: " Touring worldwide with his signature electronic music style and recently released new singles, continuing to expand his Walkerverse with immersive fan experiences." },
        { name: "Marshmello", image: "/images/marshmello.jpg", description: "Collaborating with various artists across genres and releasing chart-topping hits. He remains a prominent figure in electronic dance music (EDM) and pop, working on upcoming projects." },
        { name: "Olivia Rodrigo", image: "/images/olivia.jpg", description: "Released her second album GUTS and is preparing for her 2024 GUTS World Tour." },
        { name: "Bruno Mars", image: "/images/brunomars.jpg", description: "Actively performing globally, including shows with his Grammy-winning duo Silk Sonic alongside Anderson .Paak. Fans are anticipating new solo music while he continues to be a top live performer." },
        { name: "Doja Cat", image: "/images/doja.jpg", description: "Released her album Scarlet and embarked on her The Scarlet Tour, showcasing her new artistic direction and rap-heavy sound." },
        { name: "Billie Eilish", image: "/images/billie.jpg", description: " Released new music and continues to perform at major festivals, known for her evolving sound and introspective lyrics." },
        { name: "Bad Bunny", image: "/images/badbunny.jpg", description: "Released his album Nadie Sabe Lo Que Va a Pasar Mañana, exploring new sounds while dominating Latin music charts." },
        { name: "Rihanna", image: "/images/rihanna.jpg", description: "Recently welcomed her second child and is focusing on her Fenty beauty and fashion empire, with fans eagerly awaiting her musical comeback." },
    ];

    const [showModal, setShowModal] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Open the modal with selected artist details
    const openModal = (artistName) => {
        const artist = artists.find(artist => artist.name === artistName);
        setSelectedArtist(artist);
        setShowModal(true);
    };

    // Close the modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedArtist(null);
    };

    // Filter artists based on search query
    const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.content}>
            <div className={styles['artist-title']}>
                <div className={styles.titleContainer}>
                    <span className={styles.top}>Featured</span>
                    <span className={styles.bottom}>Artists</span>
                </div>
                <span className={styles.line}></span>
                <p className="description">See the latest updates on <br /> featured artists this month.</p>
            </div>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    className={styles.searchBar}
                    placeholder="Search artists..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className={styles.gridContainer}>
                {filteredArtists.length > 0 ? (
                    filteredArtists.map((artist, index) => (
                        <div
                            key={artist.name}
                            className={styles.gridItem}
                            onClick={() => openModal(artist.name)}  // Open modal on artist click
                        >
                            <img src={artist.image} alt={`Artist ${index}`} />
                            <div className={styles.description}>
                                <p>{artist.name}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.notFound}>No artists found</p>
                )}
            </div>

            {/* Artist Modal */}
            <Modal
                showModal={showModal}
                artist={selectedArtist}
                onClose={closeModal}
            />
        </div>
    );
}

export default ArtistContent;