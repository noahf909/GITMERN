import './About.css'; 
import katelyn from '../assets/katelyn.jpg';
import santoscutie from '../assets/santoscutie.jpg';
import noah from '../assets/noah.jpg';
import randy from '../assets/randy.jpg';
import ashtoncutiepatootie from '../assets/ashtoncutiepatootie.jpg';
import nick from '../assets/nick.jpg';
import jacob from '../assets/jacob.jpg';
import joshua from '../assets/joshua.jpg'; 
import linkedinLogo from '../assets/icons/LI-In-Bug.png';

const About = () => {
    const AboutDes = "The journey to bring Average At Best online has been a true partnership. Our team of students has worked closely with the brand’s founder to turn their vision into a fully-functional website. With a shared love for running and the brand's inclusive approach, we’ve collaborated to create a digital experience that matches the spirit of Average At Best: for runners who are just getting started or those who’ve been running for years. It’s been a rewarding process of teamwork, learning, and bringing a vision to life.";
    return (
      <section className="section-white">
        <div className="container">
          <div className = 'col-md-12 text-center'>
            <h2 className="section-title">Meet the AAB Team</h2>
              <p className = "section-subtitle">{AboutDes}</p>
          </div>
          
          <div className = "row">
            <div className="col-sm-6 col--4">
              <div className = "team-item">
                <img src={katelyn} alt="Headshot" />
                <h3>Katelyn Campbell</h3>
                  <div className="team-info">
                    <p>Front-end/Mobile Dev</p>
                    <p>Created About & Home Page</p>
                  </div>
                  <a href="https://www.linkedin.com/in/katelynsoups/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" style={{ width: '40px', height: '32px', borderRadius: '0%' }} />
                  </a>
              </div>
            </div>

            <div className="col-sm-6 col--4">
              <div className = "team-item">
                <img src={noah} alt="Headshot" />
                <h3>Noah Fuhrman</h3>
                  <div className="team-info">
                    <p>Project Manager/Front-end</p>
                    <p>MERN Set Up & Created Products Page</p>
                  </div>
                  <a href="https://www.linkedin.com/in/noah-f-893a78237/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" style={{ width: '40px', height: '32px', borderRadius: '0%' }} />
                  </a>
              </div>
            </div>

            <div className="col-sm-6 col--4">
              <div className = "team-item">
                <img src={randy} alt="Headshot" />
                <h3>Randy Nguyen</h3>
                  <div className="team-info">
                    <p>Front-end</p>
                    <p>Created Navigation Bar & About Page</p>                 
                  </div>
                  <a href="https://www.linkedin.com/in/randy-nguyen-software-developer22/" target="_blank" rel="noopener noreferrer"> 
                    <img src={linkedinLogo} alt="LinkedIn" style={{ width: '40px', height: '32px', borderRadius: '0%' }} />
                  </a> 
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className = "team-item">
                <img src={nick} alt="Headshot" />
                <h3>Nick Piazza</h3>
                <div className="team-info">
                  <p>Front-end</p>
                  <p></p>
                  <p>Created Cart Page</p>
                  <p></p>
                </div>
                <a href="https://www.linkedin.com/in/nickpiazza26/" target="_blank" rel="noopener noreferrer">
                  <img src={linkedinLogo} alt="LinkedIn" style={{ width: '40px', height: '32px', borderRadius: '0%' }} />
                </a>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className = "team-item">
                <img src={santoscutie} alt="Headshot" />
                <h3>Santos Solanet</h3>
                <div className="team-info">
                  <p>API</p>
                  <p>Created API Portion</p>
                </div>
                <a href="https://www.linkedin.com/in/santos-solanet" target="_blank" rel="noopener noreferrer">
                  <img src={linkedinLogo} alt="LinkedIn" style={{ width: '40px', height: '32px', borderRadius: '0%' }} />
                </a>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className = "team-item">
                <img src={ashtoncutiepatootie} alt="Headshot" />
                <h3>Ashton Becker</h3>
                <div className="team-info">
                  <p>Database</p>
                  <p>Created Database</p>
                </div>
                <a href="https://www.linkedin.com/in/ashton-becker?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
                  <img src={linkedinLogo} alt="LinkedIn" style={{ width: '40px', height: '32px', borderRadius: '0%' }} />
                </a>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className = "team-item">
                <img src={jacob} alt="Headshot" />
                <h3>Jacob Adams</h3>
                <div className="team-info">
                  <p>Mobile Developer</p>
                  <p></p>
                  <p>Created Mobile App</p>
                  <p></p>
                </div>
                <a href="https://www.linkedin.com/in/jacobka1219/" target="_blank" rel="noopener noreferrer">
                  <img src={linkedinLogo} alt="LinkedIn" style={{ width: '40px', height: '32px', borderRadius: '0%' }} />
                </a>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className = "team-item">
                <img src={joshua} alt="Headshot" />
                <h3>Joshua Orlian</h3>
                <div className="team-info">
                  <p>Founder</p>
                  <p></p>
                  <p>Created the Brand</p>
                </div>
                <a href="https://www.linkedin.com/in/joshorlian/" target="_blank" rel="noopener noreferrer">
                  <img src={linkedinLogo} alt="LinkedIn" style={{ width: '40px', height: '32px', borderRadius: '0%' }} />
                </a>
              </div>
            </div>

          </div>
        </div>
        </section>
      );
};


export default About; 