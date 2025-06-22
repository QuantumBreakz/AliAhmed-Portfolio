import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:ali.ahmed.work.dev@gmail.com" data-cursor="disable">
                ali.ahmed.work.dev@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+923224267825" data-cursor="disable">
                +92 322 4267825
              </a>
            </p>
            <h4>Location</h4>
            <p>Allama Iqbal Town, Lahore</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/QuantumBreakz"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://linkedin.com/in/ali-ahmed-hustletothemax92"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Ali Ahmed</span>
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
        </div>
        
        <div className="languages-section">
          <h4>Programming Languages & Technologies</h4>
          <div className="languages-grid">
            <span>Python</span>
            <span>JavaScript</span>
            <span>HTML5</span>
            <span>PHP</span>
            <span>C++</span>
            <span>SQL</span>
            <span>React</span>
            <span>React Native</span>
            <span>Node.js</span>
            <span>Django</span>
            <span>Laravel</span>
            <span>Flask</span>
            <span>Bootstrap</span>
            <span>MongoDB</span>
            <span>MySQL</span>
            <span>PostgreSQL</span>
            <span>Apache</span>
            <span>Docker</span>
            <span>GitHub Pages</span>
            <span>TensorFlow</span>
            <span>PyTorch</span>
            <span>Scikit-learn</span>
            <span>Pandas</span>
            <span>Numpy</span>
            <span>Matplotlib</span>
            <span>Plotly</span>
            <span>SciPy</span>
            <span>MLflow</span>
            <span>NLTK</span>
            <span>OpenCV</span>
            <span>Hadoop</span>
            <span>Power BI</span>
            <span>Figma</span>
            <span>Canva</span>
            <span>Web Scraping</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
