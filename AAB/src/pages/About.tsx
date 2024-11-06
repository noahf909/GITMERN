import './About.css'; 
import katelyn from '../assets/katelyn.jpg';
import santoscutie from '../assets/santoscutie.jpg';
import noah from '../assets/noah.jpg';
import randy from '../assets/randy.jpg';
import ashtoncutiepatootie from '../assets/ashtoncutiepatootie.jpg';
import nick from '../assets/nick.jpg';
const About = () => {
    const AboutDes = "Average At Best is an athletic clothing brand founded by a friend of Noah's";
    return (
      <section className="section-white">
        <div className="container">
          <div className = 'col-md-12 text-center'>
            <h2 className="section-title">Average At Best Team</h2>
              <p className = "section-subtitle">{AboutDes}</p>
          </div>
          
          <div className = "row1">
            <div className="col-sm-6 col--4">
              <div className = "team-item">
                <img src={katelyn} alt="Headshot" />
                <h3>Katelyn Campbell</h3>
                  <div className="team-info">
                    <p>Front-end/Mobile Dev</p>
                    <p>Created About & Home Page</p>
                    <p>Add links to git linkedin etc?</p>
                  </div>
              </div>
            </div>

            <div className="col-sm-6 col--4">
              <div className = "team-item">
                <img src={noah} alt="Headshot" />
                <h3>Noah Fuhrman</h3>
                  <div className="team-info">
                    <p>Front-end</p>
                    <p>MERN Set Up & Created Products Page</p>
                    <a href="https://www.linkedin.com/in/noah-f-893a78237/" target="_blank" rel="noopener noreferrer">Linkedin</a>
                  </div>
              </div>
            </div>

            <div className="col-sm-6 col--4">
              <div className = "team-item">
                <img src={randy} alt="Headshot" />
                <h3>Randy Nguyen</h3>
                  <div className="team-info">
                    <p>Front-end</p>
                    <p>Created Navigation Bar & About Page</p>
                    <a href="https://www.linkedin.com/in/randy-nguyen-software-developer22/" target="_blank" rel="noopener noreferrer">Linkedin</a>                  
                  </div>
              </div>
            </div>
          </div>
          <div className = "row2">

            <div className="col-sm-6 col-md-4">
              <div className = "team-item">
                <img src={santoscutie} alt="Headshot" />
                <h3>Santos Solanet</h3>
                <div className="team-info">
                  <p>API</p>
                  <p>Created API Portion</p>
                  <a href="https://www.linkedin.com/in/santos-solanet" target="_blank" rel="noopener noreferrer">Linkedin</a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className = "team-item">
                <img src={ashtoncutiepatootie} alt="Headshot" />
                <h3>Ashton Becker</h3>
                <div className="team-info">
                  <p>Database</p>
                  <p>Created Database</p>
                  <a href="https://www.linkedin.com/in/ashton-becker?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">Linkedin</a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className = "team-item">
                <img src={santoscutie} alt="Headshot" />
                <h3>Jacob Adams</h3>
                <div className="team-info">
                  <p>API</p>
                  <p></p>
                  <p>Created Mobile App</p>
                  <p></p>
                  <a href="https://www.linkedin.com/in/santos-solanet" target="_blank" rel="noopener noreferrer">Linkedin</a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className = "team-item">
                <img src={nick} alt="Headshot" />
                <h3>Nick Piazza</h3>
                <div className="team-info">
                  <p>Project Manager</p>
                  <p></p>
                  <p>Created Cart Page</p>
                  <p></p>
                  <a href="https://www.linkedin.com/in/nickpiazza26/" target="_blank" rel="noopener noreferrer">Linkedin</a>
                </div>
              </div>
            </div>

          </div>
        </div>
        </section>
      );
};


export default About; 