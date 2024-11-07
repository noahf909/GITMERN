import './Home.css';

//icons for about section
import compost from '../assets/icons/compost.png'; 
import globe from '../assets/icons/globe.png';
import sprint from '../assets/icons/sprint.png';

const Home = () => {
  return (
    <>
      {/* title */}
      <div className="blue-box">
        <h1 className="title">Made for the<br /> Average<br /> Runner</h1>
        <h2 className="box-stats">50+ Products | 100+ Customers</h2>

        {/* search bar */}
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for products..." 
          />
        </div>
      </div>

      {/* about section */}
      <section className="about-section">
        <h2 className="about-title">About Us</h2>
        <p className="about-text">
        At Average at Best, we started with a simple idea: running is for everyone. Whether you're starting your journey
         or simply looking for comfortable, affordable gear to keep up with your daily run, we’re here for you.
         We know that the path to becoming the best version of yourself isn't about perfection, but persistence. 
         Our apparel is designed to keep you comfortable, inspired, and supported every step of the way—no matter where your feet take you.
          We're here to celebrate the everyday runner, the ones who believe that running is more about the journey than the destination. 
          So, whether you're setting new personal records or just getting started, we're with you every step of the way. 
          Because, at Average at Best, we believe every runner deserves the best.
        </p>

        {/* new sections with icons */}
        <section className="features">
        <div className="feature">
            <div className="feature-icon-wrapper">
                <img src={sprint} alt="Sprint Icon" className="feature-icon" />
            </div>
            <h3>Performance</h3>
        </div>
        <div className="feature">
            <div className="feature-icon-wrapper">
                <img src={globe} alt="Globe Icon" className="feature-icon" />
            </div>
            <h3>Community</h3>
        </div>
        <div className="feature">
            <div className="feature-icon-wrapper">
                <img src={compost} alt="Compost Icon" className="feature-icon" />
            </div>
            <h3>Quality</h3>
        </div>
        </section>

      </section>
    </>
  );
};

export default Home;
