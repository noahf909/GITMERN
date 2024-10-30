import './About.css'; 
import katelyn from '../assets/katelyn.jpg';

const About = () => {
    let AboutDes = 'AAB was started by noahs good pal and we are just making it happen add something more inspirational';
    return (
        <section className="section-white">
          <div className="container">
            <div className = "row">
    
              <div className = 'col-md-12 text-center'>
                <h2 className="section-title">
                  Average At Best Team
                </h2>
                <p className = "section-subtitle">{AboutDes}</p>
              </div>
    
              <div className="col-sm-6 col-md-4">
                <div className = "team-item">
                <img src={katelyn} alt="Headshot" />
                <h3>Katelyn Campbell</h3>
                  <div className="team-info">
                    <p>Team Role</p>
                    <p></p>
                    <p>Add a desicription of what they did</p>
                    <p></p>
                    <p>Add links to git linkedin etc?</p>
                  </div>
                </div>
              </div>
    
              <div className="col-sm-6 col-md-4">
                <div className = "team-item">
                <img src={katelyn} alt="Headshot" />
                <h3>Katelyn Campbell</h3>
                  <div className="team-info">
                    <p>Team Role</p>
                    <p></p>
                    <p>Add a desicription of what they did</p>
                    <p></p>
                    <p>Add links to git linkedin etc?</p>
                  </div>
                </div>
              </div>
    
              <div className="col-sm-6 col-md-4">
                <div className = "team-item">
                <img src={katelyn} alt="Headshot" />
                <h3>Katelyn Campbell</h3>
                  <div className="team-info">
                    <p>Team Role</p>
                    <p></p>
                    <p>Add a desicription of what they did</p>
                    <p></p>
                    <p>Add links to git linkedin etc?</p>
                  </div>
                </div>
              </div>
    
            </div>
          </div>
        </section>
      );
};


export default About; 