import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "../ProjectModal";

const ProjectsSection = ({ theme }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Coinflip DApp",
      description: "A decentralized coin flip game built on the blockchain where users can bet Solana on the outcome. The smart contract ensures fair and transparent gameplay, with all bets and outcomes recorded on-chain. Users can connect their Phantom wallet to participate in the game.",
      video: "assets/videos/Coinflip_demo.mp4",
      type: "video"
    },
    {
      title: "MugenAI",
      description: "A web application integrated with Clerk authentication that allows users to generate AI videos using Runway's API, enabling creative video content generation. Users can securely log in, manage their account, and create unique AI-generated videos. The platform features a user-friendly interface and real-time video generation progress tracking.",
      video: "assets/videos/MugenAI_demo.mp4",
      type: "video"
    },
    // Keep remaining slots as placeholders
    ...Array(4).fill({})
  ];

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
        {projects.map((project, index) => (
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
              cursor: project.title ? "pointer" : "not-allowed",
              height: "400px", // Fixed height for consistent card sizes
            }}
            onClick={() => project.title && setSelectedProject(project)}
          >
            {project.title ? (
              <>
                {/* Project Video/Image Container */}
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0, // Prevent video container from shrinking
                  }}
                >
                  {project.type === "video" ? (
                    <>
                      <video
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "rgba(0, 0, 0, 0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.3s",
                        }}
                        className="video-overlay"
                      >
                        <span style={{ 
                          color: "#fff", 
                          fontSize: "1.2rem",
                          background: "rgba(0, 0, 0, 0.6)",
                          padding: "0.5rem 1rem",
                          borderRadius: "5px",
                        }}>
                          Click to expand
                        </span>
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(120deg, rgba(106, 17, 203, 0.8), rgba(37, 117, 252, 0.8))",
                      }}
                    />
                  )}
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
                    height: "calc(100% - 200px)", // Remaining space after video
                    overflow: "hidden", // Hide overflow
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      margin: 0,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {project.title}
                  </h3>
                  <div
                    style={{
                      overflow: "auto", // Make this container scrollable
                      flex: 1, // Take remaining space
                      paddingRight: "10px", // Space for scrollbar
                    }}
                    onClick={(e) => e.stopPropagation()} // Allow scrolling without triggering modal
                  >
                    <p
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        margin: 0,
                        opacity: 0.8,
                        textAlign: "left", // Left-align for better readability
                      }}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
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
                      background: "linear-gradient(120deg, rgba(106, 17, 203, 0.8), rgba(37, 117, 252, 0.8))",
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
              </>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            theme={theme}
          />
        )}
      </AnimatePresence>

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

          .project-card:hover .video-overlay {
            opacity: 1;
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
