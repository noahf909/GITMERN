import './Home.css';

//icons for about section
import compost from '../assets/icons/compost.png'; 
import globe from '../assets/icons/globe.png';
import sprint from '../assets/icons/sprint.png';

//images for catagories
import mens from '../assets/mens.jpg';
import womens from '../assets/womens.jpg';
import accessories from '../assets/accessories.jpg';

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
          We're here to celebrate the everyday runner, the ones who believe that running is more about the journey than the destination. 
          So, whether you're setting new personal records or just getting started, we're with you every step of the way.
        </p>

        {/* new sections with icons */}
        <section className="features">
        <div className="feature">
            <div className="feature-icon-wrapper">
                <img src={sprint} alt="Sprint Icon" className="feature-icon" />
            </div>
            <h3>Performance</h3>
            <p className="feature-description">
              Unlock your potential and give your best with gear designed to support every step of your journey.
            </p>
        </div>
        <div className="feature">
            <div className="feature-icon-wrapper">
                <img src={globe} alt="Globe Icon" className="feature-icon" />
            </div>
            <h3>Community</h3>
            <p className="feature-description">
              Join a global community of runners where every stride is shared and every milestone is celebrated.
            </p>
        </div>
        <div className="feature">
            <div className="feature-icon-wrapper">
                <img src={compost} alt="Compost Icon" className="feature-icon" />
            </div>
            <h3>Quality</h3>
            <p className="feature-description">
              Crafted with care, built to last, and designed to leave a lighter footprint on the planet.
            </p>
        </div>
        </section>

      </section>

      <section className = "categories">
        <h2>Shop by Category</h2>
        <p>Find what you are loooking for</p>
      </section>
        
      <section className = "category-box">
        <div className = "category-item">
          <img src={mens} alt="mens" className="category-image" />
          <p className = "category-description">Men's</p>
        </div>
        <div className = "category-item">
          <img src={womens} alt="womens" className="category-image"/>
          <p className = "category-description">Women's</p>
        </div>
        <div className = "category-item">
          <img src={accessories} alt="accessories" className="category-image"/>
          <p className = "category-description">Accessories</p>
        </div>
      </section>

      <section className="explore-section">
        <div className="explore-content">
          <h2>Explore All AAB Products</h2>
          <p>Browse our full range of running apparel and accessories to find the perfect gear for your journey.</p>
          <a href="/products" className="explore-button">Explore Now</a>
        </div>
      </section>
    </>
  );
};

export default Home;
