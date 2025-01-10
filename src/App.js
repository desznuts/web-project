import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Homepage/HomepageHeader";
import Content from "./Homepage/HomepageContent";
import Footer from "./Footer/Footer";
import ArtistHeader from "./ArtistsPage/ArtistHeader";
import ArtistContent from "./ArtistsPage/ArtistContent";
import AboutHeader from "./AboutPage/AboutHeader";
import AboutContent from "./AboutPage/AboutContent";

function App() {
  const location = useLocation(); // Hook to detect the current route

  return (
    <>
      {/* Conditionally render different headers based on the route */}
   {location.pathname === '/artist' ? <ArtistHeader /> :  
    location.pathname === '/about-us' ? <AboutHeader /> : <Header />}

      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/artist" element={<ArtistContent />} />
        <Route path="/about-us" element={<AboutContent />} />
      </Routes>

      <Footer />
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
