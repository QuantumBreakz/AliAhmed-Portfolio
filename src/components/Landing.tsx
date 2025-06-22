import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              ALI
              <br />
              <span>AHMED</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Ali Ahmed</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Software Engineer</div>
              <div className="landing-h2-2">AI Engineer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">AI Engineer</div>
              <div className="landing-h2-info-1">Software Engineer</div>
            </h2>
          </div>
          <div className="profile-picture-container">
            <img 
              src="/profilepic.jpg" 
              alt="Ali Ahmed" 
              className="profile-picture"
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
