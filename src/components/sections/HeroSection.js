
import React, { useEffect, Suspense,useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import "@fontsource/poppins";



const EthereumModel = () => {
  const { scene } = useGLTF("/assets/ethereum_3d_logo1/scene.gltf");

  useFrame(() => {
    scene.rotation.y += 0.01; // Rotate the model
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color("#3c82f6"); // Blue glow
        child.material.emissiveIntensity = 0.4; // Glow intensity
        child.material.color = new THREE.Color("#0a0a0a"); // Black base
        child.material.metalness = 100; // Maximum reflectivity
        child.material.roughness = 1; // Smooth surface
        child.material.transparent = false;
        child.material.depthWrite = true;
        child.material.depthTest = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={0.003} position={[0, -0.1, 0]} />;
};


const FlickeringStars = ({ theme }) => (
  <Stars
    radius={100}
    depth={50}
    count={50000}
    factor={4}
    fade
    saturation={
      theme.background === "linear-gradient(135deg, #0a0a0a, #141414)" ? 1 : 3
    } // Adjust star brightness for light/dark
  />
);

const TypingAnimation = ({ theme }) => {
  const phrases = ["Full-Stack Developer."];
  const [currentText, setCurrentText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);

  React.useEffect(() => {
    const type = () => {
      const currentPhrase = phrases[currentIndex];
      if (!isDeleting) {
        setCurrentText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
        }
      } else {
        setCurrentText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % phrases.length); // Loop through phrases
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 70; // Typing speed
    const timeout = setTimeout(type, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentIndex, phrases]);

  return (
    <span
      style={{
        fontSize: "3rem",
        fontFamily: "Poppins, sans-serif",
        color: theme.buttonText || "#3c82f6", // Fallback to blue
      }}
    >
      {currentText}
      <span
        style={{
          display: "inline-block",
          width: "10px",
          backgroundColor: theme.buttonText || "#3c82f6", // Fallback to blue
          height: "2.3rem",
          marginLeft: "5px",
          animation: "blink 0.8s step-end infinite",
        }}
      ></span>
      <style>
        {`
          @keyframes blink {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
        `}
      </style>
    </span>
  );
};

const HeroSection = ({ theme, toggleTheme }) => {
  const [showChallenge, setShowChallenge] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Check for mobile user agent
    const userAgent = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      setIsMobile(true);
    }
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
 {isMobile && (
        <div style={{
            position: 'fixed',
            top: '50%', // Center vertically
            left: '50%', // Center horizontally
            transform: 'translate(-50%, -50%)', // Adjust for exact centering
            backgroundColor: theme.cardBackground || "#1a1a1a", // Use theme color
            color: theme.textColor || "#ffffff", // Use theme text color
            border: `1px solid ${theme.buttonText || "#3c82f6"}`, // Theme-based border
            padding: '20px',
            fontSize: '16px',
            zIndex: 1000,
            width: '80%', // Responsive width
            textAlign: 'center',
            borderRadius: '10px', // Soften the corners
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
        }}>
            For the best experience, please access this website on a desktop or laptop computer.
        </div>
      )}

      
{/* Navbar */}
<nav
  id="navbar"
  style={{
    position: "fixed",
    top: ".5rem",
    left: "50%",
    transform: "translateX(-50%)",
    width: "fit-content",
    background: theme.cardBackground || "#1a1a1a",
    borderRadius: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    zIndex: 100,
  }}
>
  {/* Navigation Links */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      color: theme.textColor || "#ffffff",
      fontFamily: "Poppins, sans-serif",
      fontSize: "1rem",
      fontWeight: "bold",
    }}
  >
    {["About", "Skills", "Projects", "Contact"].map((section, index) => (
      <button
        key={index}
        style={{
          background: "transparent",
          border: "none",
          color: theme.textColor || "#ffffff",
          cursor: "pointer",
          transition: "color 0.3s ease",
          fontSize: "1rem",
        }}
        onMouseEnter={(e) =>
          (e.target.style.color = theme.buttonText || "#3c82f6")
        }
        onMouseLeave={(e) =>
          (e.target.style.color = theme.textColor || "#ffffff")
        }
        onClick={() => scrollToSection(section.toLowerCase())}
      >
        {section}
      </button>
    ))}

    {/* Basketball Challenge Button */}
    <button
      style={{
        background: "transparent",
        border: "none",
        color: theme.textColor || "#ffffff",
        cursor: "pointer",
        transition: "color 0.3s ease",
        fontSize: "1rem",
      }}
      onMouseEnter={(e) =>
        (e.target.style.color = theme.buttonText || "#3c82f6")
      }
      onMouseLeave={(e) =>
        (e.target.style.color = theme.textColor || "#ffffff")
      }
      onClick={() => setShowChallenge(true)}
    >
      1v1 Challenge
    </button>
  </div>

        {/* Basketball Challenge Modal */}
        {showChallenge && (
          <div
            style={{
              position: "fixed",
              top: "675%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Centers the modal
              width: "90%",
              maxWidth: "600px",
              background: theme.cardBackground,
              color: theme.textColor,
              borderRadius: "15px",
              padding: "2rem",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center", // Ensures content alignment
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                fontWeight: "bold",
              }}
            >
               Verse me in a 1v1 for a job!
            </h2>
            <p style={{ fontSize: "1.2rem", marginBottom: ".5rem" }}>
              Bet you can't guard me in basketball! Look at the highlights.
            </p>
            <p style={{ fontSize: "1.2rem" }}>If I win, I get the job.</p>

            {/* Basketball Highlights Video */}
            <iframe
            width="100%"
            height="315"  // Adjust height as necessary
            src="https://www.youtube.com/embed/R7LV7nvtCKA"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style={{
              borderRadius: "10px",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
              marginBottom: "1.5rem"  // Add space below video
            }}
          ></iframe>


            {/* Close Button */}
            <button
              style={{
                marginTop: "1rem",
                padding: "10px 20px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: `2px solid ${theme.buttonText}`,
                background: "transparent",
                color: theme.textColor,
                cursor: "pointer",
                transition: "transform 0.3s, background-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.background = theme.highlightBackground;
                e.target.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.background = "transparent";
                e.target.style.color = theme.textColor;
              }}
              onClick={() => setShowChallenge(false)}
            >
              Close
            </button>
          </div>
        )}

        {/* Theme Toggle Button */}
        <button
          style={{
            width: "40px",
            height: "40px",
            marginLeft: "2rem",
            border: `2px solid ${theme.buttonText}`,
            background: "transparent",
            color: theme.textColor,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.3s ease, background 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)"; // Slightly enlarge
            e.target.style.background = theme.highlightBackground;
            e.target.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)"; // Reset size
            e.target.style.background = "transparent";
            e.target.style.color = theme.textColor;
          }}
          onClick={toggleTheme} // Toggle theme on click
        >
          {/* Emoji changes based on theme */}
          {theme.background === "linear-gradient(135deg, #0a0a0a, #141414)"
            ? "☀️"
            : "🌙"}
        </button>
      </nav>

      {/* Hero Section */}
      <div
        id="hero"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          background:
            theme.background || "linear-gradient(135deg, #0a0a0a, #141414)", // Fallback to black gradient
          color: "#ffffff",
          transition: "background 0.5s, color 0.5s",
        }}
      >
        {/* 3D Scene */}
        <Canvas
          camera={{ position: [0, -0.3, 5], fov: 50 }}
          style={{
            background: "transparent", // Ensure Canvas doesn't override background
            transition: "background 0.5s",
          }}
        >
          <FlickeringStars theme={theme} />
          <ambientLight intensity={0.05} />
          <directionalLight position={[0, 5, 10]} intensity={0.3} />
          <pointLight position={[0, 2, 5]} intensity={0.1} color="#3c82f6" />
          <Suspense fallback={<Html>Loading Ethereum Model...</Html>}>
            <EthereumModel />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>

        {/* Text Overlay */}
        <div
          style={{
            position: "absolute",
            textAlign: "center",
            top: "8%",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "1.7rem",
              fontFamily: "Poppins, sans-serif",
              marginBottom: "1rem",
              color: theme.textColor,
            }}
          >
            Hi, I'm Gordon. A passionate Software Engineer
          </h1>
          <TypingAnimation theme={theme} />
        </div>

        {/* View My Work Button */}
        <button
          style={{
            position: "absolute",
            bottom: "10%",
            padding: "15px 30px",
            fontSize: "1.2rem",
            borderRadius: "8px",
            border: `2px solid ${theme.buttonText || "#3c82f6"}`, // Border color
            background: "transparent", // Transparent by default
            color: theme.buttonText || "#3c82f6", // Text color
            cursor: "pointer",
            transition: "transform 1s, background 1s, color 1s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)"; // Slightly enlarge
            e.target.style.background = theme.highlightBackground; // Reset to transparent
            e.target.style.color = "#ffffff"; // Change text color to white
            e.target.style.border = `2px solid ${
              theme.buttonText || "#ffffff"
            }`; // Restore border
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)"; // Reset size
            e.target.style.background = "transparent"; // Reset to transparent
            e.target.style.color = theme.buttonText || "#3c82f6"; // Reset text color
            e.target.style.border = `2px solid ${
              theme.buttonText || "#3c82f6"
            }`; // Restore border
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "scale(0.95)"; // Slightly shrink
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "scale(1.05)"; // Slightly enlarge after click
          }}
          onClick={() => scrollToSection("about")}
        >
          View My Work ↓
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
