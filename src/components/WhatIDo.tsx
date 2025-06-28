import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const whatBoxInRef = useRef<HTMLDivElement>(null);
  
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  
  useEffect(() => {
    // Mobile detection
    const isMobile = window.innerWidth <= 1024;
    
    if (isMobile) {
      // Ensure what-box-in is visible on mobile
      const ensureMobileVisibility = () => {
        if (whatBoxInRef.current) {
          whatBoxInRef.current.style.display = 'flex';
        }
      };
      
      // Check immediately
      ensureMobileVisibility();
      
      // Check after a short delay to ensure GSAP has run
      setTimeout(ensureMobileVisibility, 500);
      
      // Check when scrolling to the section
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && whatBoxInRef.current) {
              whatBoxInRef.current.style.display = 'flex';
            }
          });
        },
        { threshold: 0.1 }
      );
      
      if (whatBoxInRef.current) {
        observer.observe(whatBoxInRef.current);
      }
      
      return () => {
        observer.disconnect();
      };
    }
    
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in" ref={whatBoxInRef}>
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DEVELOP</h3>
              <h4>Full-Stack Development</h4>
              <p>
                Specialized in building scalable web applications and mobile apps using modern technologies. Experienced in developing AI-powered solutions, machine learning models, and data-driven applications that solve complex business problems.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">React</div>
                <div className="what-tags">React Native</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Django</div>
                <div className="what-tags">Laravel</div>
                <div className="what-tags">MongoDB</div>
                <div className="what-tags">MySQL</div>
                <div className="what-tags">PostgreSQL</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>AI & ML</h3>
              <h4>Machine Learning & Data Science</h4>
              <p>
                Expert in developing and fine-tuning AI models, implementing machine learning pipelines, and creating data-driven solutions. Specialized in natural language processing, computer vision, and predictive analytics for real-world applications.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">TensorFlow</div>
                <div className="what-tags">PyTorch</div>
                <div className="what-tags">Scikit-learn</div>
                <div className="what-tags">Pandas</div>
                <div className="what-tags">Numpy</div>
                <div className="what-tags">NLTK</div>
                <div className="what-tags">OpenCV</div>
                <div className="what-tags">Jupyter</div>
                <div className="what-tags">Anaconda</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
