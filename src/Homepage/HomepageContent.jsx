import { useState } from 'react';
import styles from './HomepageContent.module.css';
import CardSlider from '../Card/Card-slider';

// Modal component
function Modal({ showModal, card, onClose }) {
    if (!showModal) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeModalButton} onClick={onClose}>X</button>
                <h2>{card.title}</h2>
                <img src={card.imgUrl} alt={card.title} className={styles.modalImage} />
                <p>{card.contentt}</p>
            </div>
        </div>
    );
}

function Content({ children }) {
    const contentCards = [
        { id: 1, title: 'Rock the Night', content: 'Experience an electrifying rock concert.', imgUrl: '/images/img10.jpg' },
        { id: 2, title: 'Jazz Vibes', content: 'Smooth jazz tunes under the stars.', imgUrl: '/images/img9.jpg' },
        { id: 3, title: 'Pop Mania', content: 'The hottest pop artists live in concert.', imgUrl: '/images/img8.jpg' },
        { id: 4, title: 'Classical Evening', content: 'Enjoy a night of timeless classical music.', imgUrl: '/images/img7.jpg' },
        { id: 5, title: 'EDM Bash', content: 'Feel the beat at this EDM extravaganza.', imgUrl: '/images/img6.jpg' },
        { id: 6, title: 'Indie Beats', content: 'Discover upcoming indie bands.', imgUrl: '/images/img5.jpg' },
        { id: 7, title: 'Hip-Hop Explosion', content: 'Top hip-hop artists performing live.', imgUrl: '/images/img4.jpg' },
        { id: 8, title: 'Acoustic Sessions', content: 'Unplugged acoustic performances.', imgUrl: '/images/img3.jpg' },
        { id: 9, title: 'Reggae Rhythms', content: 'Chill out to relaxing reggae tunes.', imgUrl: '/images/img2.jpg' },
        { id: 10, title: 'Country Fest', content: 'Sing along to your favorite country hits.', imgUrl: '/images/img1.jpg' },
    ];

    const contentCardss = [
        { 
            id: 1, 
            title: 'Rock the Night', 
            contentt: `
                Experience an electrifying rock concert that will leave you breathless. 
                With a lineup of talented artists, this concert promises to be an unforgettable experience. 
                From the opening chords to the final encore, you'll be on the edge of your seat, singing along to every song. 
                Don't miss out on this opportunity to rock the night away with your favorite artists.
            `, 
            imgUrl: '/images/img10.jpg' 
        },
        { 
            id: 2, 
            title: 'Jazz Vibes', 
            contentt: `
                Smooth jazz tunes under the stars - what more could you ask for? 
                This concert promises to be a sophisticated and relaxing experience, perfect for a night out with friends or a romantic evening. 
                With a talented lineup of jazz musicians, you'll be treated to a night of soulful melodies and smooth harmonies. 
                So why not come and indulge in some jazz vibes?
            `, 
            imgUrl: '/images/img9.jpg' 
        },
        { 
            id: 3, 
            title: 'Pop Mania', 
            contentt: `
                Get ready for the hottest pop artists live in concert! 
                This concert promises to be an unforgettable experience, with a lineup of talented artists performing their biggest hits. 
                From chart-topping singles to fan favorites, you'll be singing along to every song. 
                Don't miss out on this opportunity to experience the magic of pop music live.
            `, 
            imgUrl: '/images/img8.jpg' 
        },
        { 
            id: 4, 
            title: 'Classical Evening', 
            contentt: `
                Enjoy a night of timeless classical music that will leave you in awe. 
                With a talented lineup of classical musicians, this concert promises to be a sophisticated and cultured experience. 
                From the soothing sounds of the violin to the powerful notes of the piano, you'll be treated to a night of beautiful music. 
                So why not come and indulge in some classical elegance?
            `, 
            imgUrl: '/images/img7.jpg' 
        },
        { 
            id: 5, 
            title: 'EDM Bash', 
            contentt: `
                Feel the beat at this EDM extravaganza! 
                With a lineup of talented DJs and producers, this concert promises to be an unforgettable experience. 
                From the opening beats to the final drop, you'll be dancing the night away to the hottest EDM tracks. 
                Don't miss out on this opportunity to experience the energy of EDM live.
            `, 
            imgUrl: '/images/img6.jpg' 
        },
        { 
            id: 6, 
            title: 'Indie Beats', 
            contentt: `
                Discover upcoming indie bands that are making waves in the music scene. 
                This concert promises to be a unique and exciting experience, with a lineup of talented artists performing their original music. 
                From the catchy hooks to the infectious beats, you'll be treated to a night of fresh and exciting music. 
                So why not come and discover the next big thing in indie music?
            `, 
            imgUrl: '/images/img5.jpg' 
        },
        { 
            id: 7, 
            title: 'Hip-Hop Explosion', 
            contentt: `
                Top hip-hop artists performing live - what more could you ask for? 
                This concert promises to be an unforgettable experience, with a lineup of talented artists performing their biggest hits. 
                From the opening bars to the final verse, you'll be treated to a night of energetic and infectious hip-hop music. 
                Don't miss out on this opportunity to experience the power of hip-hop live.
            `, 
            imgUrl: '/images/img4.jpg' 
        },
        { 
            id: 8, 
            title: 'Acoustic Sessions', 
            contentt: `
                Unplugged acoustic performances that will leave you in awe. 
                With a talented lineup of acoustic musicians, this concert promises to be a sophisticated and intimate experience. 
                From the soothing sounds of the guitar to the powerful notes of the voice, you'll be treated to a night of beautiful music. 
                So why not come and indulge in some acoustic elegance?
            `, 
            imgUrl: '/images/img3.jpg' 
        },
        { 
            id: 9, 
            title: 'Reggae Rhythms', 
            contentt: `
                Chill out to relaxing reggae tunes that will transport you to a tropical paradise. 
                With a talented lineup of reggae musicians, this concert promises to be a soothing and laid-back experience. 
                From the rhythmic beats to the smooth melodies, you'll be able to unwind and enjoy the vibes. 
                Don't miss this chance to immerse yourself in the world of reggae music and let the rhythms take you away.
            `, 
            imgUrl: '/images/img2.jpg' 
        },
        { 
            id: 10, 
            title: 'Country Fest', 
            contentt: `
                Sing along to your favorite country hits at this lively festival! 
                With a lineup of talented country artists, this event promises to be a fun-filled experience. 
                From heartfelt ballads to toe-tapping anthems, you'll be singing along to every song. 
                So grab your cowboy boots and come join us for a night of country music and good times!
            `, 
            imgUrl: '/images/img1.jpg' 
        },
        {
            id: 11,
            title: 'Summer Jazz Nights',
            contentt: `
                Relax to the smooth sounds of jazz under the stars. 
                Join us for an evening of soulful melodies and captivating performances by talented jazz musicians. 
                From classic standards to modern interpretations, you'll be treated to a night of unforgettable music. 
                Don't miss out on this opportunity to experience the magic of jazz in a beautiful outdoor setting.
            `,
            imgUrl: '/images/img3.jpg'
        },
        {
            id: 12,
            title: 'Electronic Dreams',
            contentt: `Feel the beat at this EDM extravaganza! 
                With a lineup of talented DJs and producers, this concert promises to be an unforgettable experience. 
                From the opening beats to the final drop, you'll be dancing the night away to the hottest EDM tracks. 
                Don't miss out on this opportunity to experience the energy of EDM live.`,
            imgUrl: '/images/img6.jpg'
        },
    ];

    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Open the modal with selected card details
    const openModal = (cardId) => {
        const card = contentCardss.find(card => card.id === cardId);
        setSelectedCard(card);
        setShowModal(true);
    };

    // Close the modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedCard(null);
    };

    // Filter cards based on search query
    const filteredCards = contentCards.filter(card =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.content}>
            <div className={styles['recent-title']}>
                <div className={styles.titleContainer}>
                    <span className={styles.top}>Recent</span>
                    <span className={styles.bottom}>Events</span>
                </div>
                <span className={styles.line}></span>
                <p className="description">See the latest updates on <br /> recent events this year.</p>
            </div>
            <CardSlider cards={contentCards} /> {children}

            <div className={styles['allevent-title']}>
                <div className={styles.titleContainer}>
                    <span className={styles.top}>All</span>
                    <span className={styles.bottom}>Events</span>
                </div>
                <span className={styles.line}></span>
                <p className="description">See the latest updates on <br /> all events this year.</p>

                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        className={styles.searchBar}
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.gridContainer}>
                {filteredCards.length > 0 ? (
                    filteredCards.map((card, index) => (
                        <div
                            key={card.id}
                            className={styles.gridItem}
                            onClick={() => openModal(card.id)}  // Open modal on card click
                        >
                            <img src={card.imgUrl} alt={`Event ${index}`} />
                            <div className={styles.description}>
                                <p>{card.title}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.notFound}>No events found</p>
                )}
            </div>

            {/* Card Modal */}
            <Modal
                showModal={showModal}
                card={selectedCard}
                onClose={closeModal}
            />
        </div>
    );
}

export default Content;