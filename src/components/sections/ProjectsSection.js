import React from "react";
import { motion } from "framer-motion";

const ProjectsSection = ({ theme }) => {
  const placeholderProjects = Array(6).fill({}); // Replace with actual project data when ready

  return (
    <section
      id="projects"
      style={{
        minHeight: "45vh",
        padding: "5rem 2rem",
        background: theme.cardBackground,
        color: theme.textColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        transition: "background 0.5s, color 0.5s",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: "3rem",
          marginBottom: "2rem",
          fontWeight: "bold",
          color: theme.textColor,
        }}
      >
        Projects
      </h2>

      {/* Decorative Divider */}
      <motion.div
        style={{
          width: "50px",
          height: "5px",
          background: "linear-gradient(135deg, #3c82f6, #9147ff)",
          borderRadius: "2px",
          marginBottom: "2rem",
          zIndex: 1,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      ></motion.div>

      {/* Projects Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Responsive grid
          gap: "2rem",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto", // Center the grid
        }}
      >
        {placeholderProjects.map((_, index) => (
          <div
            key={index}
            className="project-card"
            style={{
              display: "flex",
              flexDirection: "column",
              background: theme.cardBackground,
              borderRadius: "10px",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "not-allowed",
            }}
          >
            {/* Loading Animation in 300x200 Box */}
            <div
              style={{
                width: "100%",
                height: "200px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {/* Animated Background */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(120deg, rgba(106, 17, 203, 0.8), rgba(37, 117, 252, 0.8))",
                  backgroundSize: "200% 200%",
                  animation: "move-background 1.5s infinite",
                }}
              ></div>

              {/* Loading Text */}
              <div
                style={{
                  position: "absolute",
                  zIndex: 2,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "2.3rem",
                  fontWeight: "bold",
                  color: "#fff",
                  textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                Loading<span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            </div>

            {/* Content */}
            <div
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                color: theme.textColor,
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                Project Coming Soon
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  margin: 0,
                  opacity: 0.8,
                }}
              >
                This project is under development. Stay tuned!
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CSS for Animation */}
      <style>
        {`
          @keyframes move-background {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes blink {
            0%, 20% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }

          .dot {
            animation: blink 1.5s infinite;
          }

          .dot:nth-child(2) {
            animation-delay: 0.2s;
          }

          .dot:nth-child(3) {
            animation-delay: 0.4s;
          }

          .project-card:hover {
            transform: translateY(-10px) scale(1.05); /* Lift and scale */
            box-shadow: 0px 10px 20px rgba(60, 130, 246, 0.5); /* Highlight shadow */
          }

          .project-card:hover .animated-background {
            filter: brightness(1.2); /* Brighten the background */
          }

          .project-card:hover h3, .project-card:hover p {
            color: rgba(60, 130, 246, 1); /* Change text color */
          }
        `}
      </style>
    </section>
  );
};

export default ProjectsSection;
