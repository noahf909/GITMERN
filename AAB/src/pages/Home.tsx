import './Home.css'; 

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
          We are a brand dedicated to making running accessible and enjoyable for everyone. 
          Whether you're a seasoned marathoner or a casual jogger, we provide the gear and 
          resources to help you succeed on your fitness journey.
        </p>
      </section>
    </>
  );
};

export default Home;
