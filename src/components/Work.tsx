import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);

  const projects = [
    {
      id: 1,
      name: "Virtual Doctor (FYP)",
      category: "AI Healthcare",
      tools: "Python, Deep Learning, NLP, React Native",
      description: "AI-based emotion and sentiment analysis system with personalized medicine prescription",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Phishing URL Detection",
      category: "Cybersecurity",
      tools: "Python, Scikit-learn, Machine Learning",
      description: "Machine learning model to detect phishing URLs using heuristic and AI-driven techniques",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Google Play Sentiment Analysis",
      category: "Data Analysis",
      tools: "Python, Pandas, NLTK, Matplotlib",
      description: "Sentiment analysis on Google Play app reviews to derive actionable insights",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "AML Negative Articles Fetcher",
      category: "Financial Tech",
      tools: "Python, NLP, Web Scraping",
      description: "Web scraper and sentiment analyzer for AML compliance and automated reporting",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 5,
      name: "Rhythmic - Spotify Clone",
      category: "Web Application",
      tools: "ASP.NET, HTML, JavaScript, CSS, MS-SQL",
      description: "Full-stack music streaming application with user authentication and playlist management",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 6,
      name: "Instagram Clone",
      category: "Social Media",
      tools: "MERN Stack, MongoDB, Express, React, Node.js",
      description: "Social media platform with user profiles, image uploads, and real-time feeds",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop&crop=center"
    }
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
