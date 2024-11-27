import React, { useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stars, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import "@fontsource/poppins";

const EthereumModel = () => {
  const { scene } = useGLTF("/assets/Images/ethereum_3d_logo1/scene.gltf");

  useFrame(() => {
    scene.rotation.y += 0.01; // Rotate the model
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Set emissive properties for a darker glow effect
        child.material.emissive = new THREE.Color("#3c82f6"); // Darker blue glow
        child.material.emissiveIntensity = .4; // Moderate glow
        child.material.color = new THREE.Color("#0a0a0a"); // Black base
        child.material.metalness = 100; // Add reflectivity
        child.material.roughness = 1; // Add subtle surface reflections
        child.material.transparent = false;
        child.material.depthWrite = true;
        child.material.depthTest = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={0.003} position={[0, -0.1, 0]} />;
};

const FlickeringStars = ({ theme }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Stars
      radius={100}
      depth={50}
      count={50000}
      factor={4}
      saturation={4}
      fade
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      speed={hovered ? 5 : 4} // Flicker effect on hover
    />
  );
};

const TypingAnimation = () => {
  const phrases = ["Blockchain Software Engineer.", "Full-Stack Developer."];
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
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
    const typingTimeout = setTimeout(type, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, currentIndex, phrases]);

  return (
    <span
      style={{
        fontSize: "3rem",
        fontFamily: "Poppins, sans-serif",
        color: "#3c82f6",
      }}
    >
      {currentText}
      <span
        style={{
          display: "inline-block",
          width: "10px",
          backgroundColor: "#3c82f6",
          height: "2.3rem",
          marginLeft: "3px",
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



export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("hero");
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const themeStyles = {
    dark: {
      background: "linear-gradient(135deg, #0a0a0a, #141414)", // Black gradient
      textColor: "#ffffff", // White text
      cardBackground: "#1a1a1a", // Darker black for cards
      buttonBackground: "transparent", // Transparent button background
      buttonText: "#3c82f6", // Blue text for buttons
      buttonBorder: "#3c82f6", // Purple-to-blue gradient
      highlightBackground: "linear-gradient(135deg, #9147ff, #3c82f6)", // Gradient highlights
      highlightText: "#ffffff", // White text for highlighted buttons
    },
  };

  const currentTheme = themeStyles[theme];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    const aboutSection = document.getElementById("about");
    const aboutTop = aboutSection.offsetTop;

    // Check if the user has scrolled past the About section
    setIsNavbarSticky(window.scrollY >= aboutTop);
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // Trigger when 60% of the section is visible
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      observerOptions
    );

    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        overflow: "hidden",
        background: currentTheme.background,
        color: currentTheme.textColor,
        fontFamily: "Poppins, sans-serif",
        transition: "background 0.5s, color 0.5s",
      }}
    >
      {/* Hero Section */}
      <div
        id="hero"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        
        <Canvas camera={{ position: [0, -0.3, 5], fov: 50 }}>
          <FlickeringStars theme={theme} />
          <ambientLight intensity={0.05} />
          <directionalLight position={[0, 5, 10]} intensity={0.3} />
          <pointLight position={[0, 2, 5]} intensity={0.1} color="#3c82f6" />
          <Suspense fallback={<Html>Loading Ethereum Model...</Html>}>
            <EthereumModel />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
        <div
          style={{
            position: "absolute",
            textAlign: "center",
            top: "10%",
            width: "100%",
          }}
        >
          <h1 style={{ fontSize: "1.2rem", margin: 0 }}>
            Hi, I'm Gordon. A passionate Software Engineer.
          </h1>
          <TypingAnimation />
        </div>
        <button
          style={{
            position: "absolute",
            bottom: "10%",
            padding: "15px 30px",
            fontSize: "1.2rem",
            borderRadius: "5px",
            border: `2px solid ${currentTheme.buttonBorder}`,
            backgroundColor: currentTheme.buttonBackground,
            color: currentTheme.buttonText,
            cursor: "pointer",
            transition: "transform 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          onMouseDown={(e) => (e.target.style.backgroundColor = currentTheme.buttonBorder)}
          onMouseUp={(e) => (e.target.style.backgroundColor = currentTheme.buttonBackground)}
          onClick={() => scrollToSection("about")}
        >
          View My Work ↓
        </button>
      </div>

      {/* Navbar */}
<nav
  id="navbar"
  style={{
    position: "fixed",
    top: ".5rem",
    left: "50%",
    transform: "translateX(-50%)",
    width: "fit-content",
    background: currentTheme.cardBackground,
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
      color: currentTheme.textColor,
      fontFamily: "Poppins, sans-serif",
      fontSize: "1rem",
      fontWeight: "bold",
    }}
  >
    {["About", "Skills","Projects", "Contact"].map((section, index) => (
      <button
        key={index}
        style={{
          background: "transparent",
          border: "none",
          color: currentTheme.textColor,
          cursor: "pointer",
          transition: "color 0.3s ease",
          fontSize: "1rem",
        }}
        onMouseEnter={(e) => (e.target.style.color = currentTheme.buttonText)}
        onMouseLeave={(e) => (e.target.style.color = currentTheme.textColor)}
        onClick={() => scrollToSection(section.toLowerCase())}
      >
        {section}
      </button>
    ))}
  </div>


  {/* Theme Toggle Button */}
  <button
    style={{
      width: "40px",
      height: "40px",
      marginLeft: "2rem",
      background: currentTheme.cardBackground,
      border: `2px solid ${currentTheme.buttonText}`,
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "transform 0.3s ease, background 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.1)";
      e.currentTarget.style.background = currentTheme.highlightBackground;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.background = currentTheme.cardBackground;
    }}
    onClick={toggleTheme}
  >
    {theme === "dark" ? "🌙" : "☀️"}
  </button>
</nav>

<div
  style={{
    width: "100%",
    height: "10px",
    background: "linear-gradient(90deg, #3c82f6, #9147ff)",
    margin: "0 auto",
    position: "relative",
  }}
></div>
      {/* About Me Section */}
      <section
        id="about"
        style={{
          height: "100vh",
          padding: "5rem 2rem",
          backgroundColor: currentTheme.cardBackground,
          color: currentTheme.textColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          transition: "background 0.5s, color 0.5s",
        }}
      >
        {/* Decorative Background Circles */}
        <motion.div
          style={{
            position: "absolute",
            top: "-40%",
            left: "-10%",
            width: "1000px",
            height: "1000px",
            background: "linear-gradient(135deg, #3c82f6, transparent)",
            borderRadius: "50%",
            opacity: 0.1,
            zIndex: 0,
          }}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2.4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        ></motion.div>


        {/* Title */}
        <motion.h2
          style={{
            fontSize: "3rem",
            marginBottom: "1.5rem",
            fontWeight: "bold",
            textShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          About Me
        </motion.h2>

        {/* Avatar */}
        <motion.div
          style={{
            width: "150px",
            height: "150px",
            background: "linear-gradient(135deg, #3c82f6, #9147ff)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 5px 20px rgba(60, 130, 246, 0.5)",
            marginBottom: "1.5rem",
            zIndex: 1,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.span
            style={{
              fontSize: "4rem",
              color: "#fff",
              fontWeight: "bold",
              userSelect: "none",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            G
          </motion.span>
        </motion.div>

        {/* About Text */}
        <motion.p
          style={{
            fontSize: "1.2rem",
            maxWidth: "800px",
            margin: "0 auto 2rem",
            lineHeight: "1.8",
            textAlign: "justify",
            zIndex: 1,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          Hello! My name is <strong style={{ color: "#3c82f6" }}>Gordon</strong>. I
          am a <strong>computer science student</strong> specializing in{" "}
          <strong>blockchain technology</strong>, Ethereum development, and
          cutting-edge <strong>web3 applications</strong>. I’m passionate about
          building scalable, decentralized solutions and always eager to grow as a{" "}
          <strong>software engineer</strong>.
        </motion.p>

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

        {/* Subtext */}
        <motion.p
          style={{
            fontSize: "1rem",
            maxWidth: "600px",
            margin: "0 auto",
            opacity: 0.8,
            zIndex: 1,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        >
          Currently, I’m exploring the intersection of technology and creativity,
          focusing on delivering exceptional user experiences in my projects.
        </motion.p>
      </section>

{/* Skills Section */}
<section
  id="skills"
  style={{
    minHeight: "5vh",
    padding: "5rem 2rem",
    background: currentTheme.cardBackground,
    color: currentTheme.textColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    overflow: "visible", // Allow the decorative circle to "leak" into this section
  }}
>
  {/* Decorative Circle Leaking from About Me */}
  <motion.div
    style={{
      position: "absolute",
      top: "-50%",
      right: "-20%",
      width: "1000px",
      height: "1000px",
      background: "linear-gradient(135deg, #9147ff, transparent)",
      borderRadius: "50%",
      opacity: 0.05,
      zIndex: 0,
    }}
    initial={{ scale: 0.8 }}
    animate={{ scale: [0.9, 1, 0.9] }}
    transition={{
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    }}
  ></motion.div>

  {/* Title */}
  <motion.h2
    style={{
      fontSize: "3rem",
      marginBottom: "2rem",
      fontWeight: "bold",
      color: currentTheme.textColor,
      zIndex: 1,
    }}
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    Skills
  </motion.h2>

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

  {/* Skills Grid */}
  <motion.div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1.5rem",
      width: "100%",
      maxWidth: "1200px",
      zIndex: 1,
    }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    {[
      { name: "React.js", icon: "⚛️" },
      { name: "Next.js", icon: "⟡" },
      { name: "JavaScript", icon: "🟨" },
      { name: "Python", icon: "🐍" },
      { name: "Solidity", icon: "⛓️" },
      { name: "Node.js", icon: "🟢" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Django", icon: "💻" },
      { name: "Rust", icon: "🦀" },
      { name: "Docker", icon: "🐳" },
    ].map((skill, index) => (
      <motion.div
        key={index}
        style={{
          padding: "2rem",
          background: `linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(60, 130, 246, 0.1))`,
          borderRadius: "15px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(60, 130, 246, 0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 15px 30px rgba(60, 130, 246, 0.5)",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: index * 0.001,
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        {/* Skill Icon */}
        <div
          style={{
            fontSize: "4rem",
            marginBottom: "-1rem",
            color: currentTheme.buttonText,
          }}
        >
          {skill.icon}
        </div>

        {/* Skill Name */}
        <h4
          style={{
            fontSize: "1.9rem",
            fontWeight: "bold",
            color: currentTheme.textColor,
          }}
        >
          {skill.name}
        </h4>
      </motion.div>
    ))}
  </motion.div>
</section>


{/* Projects Section */}
<section
  id="projects"
  style={{
    minHeight: "100vh",
    padding: "5rem 2rem",
    background: currentTheme.cardBackground,
    color: currentTheme.textColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
  }}
>
  {/* Title */}
  <h2
    style={{
      fontSize: "3rem",
      marginBottom: "2rem",
      fontWeight: "bold",
      color: currentTheme.textColor,
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
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      width: "100%",
      maxWidth: "1200px",
    }}
  >
    {[
      {
        name: "CoinFlip Gambling Platform",
        description:
          "A decentralized Solana-based gambling platform where users can play a provably fair coin flip game. Includes wallet integration, betting logic, and house edge tracking.",
        image: "https://via.placeholder.com/300x200", // Replace with actual image
      },
      {
        name: "Telegram Solana Memecoin Bot",
        description:
          "Automates memecoin transactions and tracking, including tax calculations, first safe block detection, and secure swaps.",
        image: "https://via.placeholder.com/300x200", // Replace with actual image
      },
      {
        name: "PennyWise Price Comparison App",
        description:
          "A smart shopping assistant designed to help users compare prices and manage budgets effectively while shopping online.",
        image: "https://via.placeholder.com/300x200", // Replace with actual image
      },
      {
        name: "AI-Driven Scam Detection System",
        description:
          "An AI-powered system to detect scams and fraudulent activities in crypto projects, featuring smart contract audits and real-time transaction monitoring.",
        image: "https://via.placeholder.com/300x200", // Replace with actual image
      },
      {
        name: "Smart Home Automation System",
        description:
          "A centralized IoT platform integrating multiple devices for enhanced control and real-time responsiveness, designed using Event-Driven Architecture.",
        image: "https://via.placeholder.com/300x200", // Replace with actual image
      },   
      {
        name: "Smart Home Automation System",
        description:
          "A centralized IoT platform integrating multiple devices for enhanced control and real-time responsiveness, designed using Event-Driven Architecture.",
        image: "https://via.placeholder.com/300x200", // Replace with actual image
      },
    ].map((project, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          flexDirection: "column",
          background: currentTheme.cardBackground,
          borderRadius: "10px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
          transition: "transform 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {/* Image */}
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundImage: `url(${project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Content */}
        <div
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            color: currentTheme.textColor,
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.5",
              margin: 0,
              opacity: 0.9,
            }}
          >
            {project.description}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* View All Button */}
  <button
    style={{
      marginTop: "2rem",
      padding: "10px 20px",
      fontSize: "1rem",
      fontWeight: "bold",
      border: `2px solid ${currentTheme.buttonText}`,
      background: "transparent",
      color: currentTheme.textColor,
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background 0.3s, color 0.3s",
    }}
    onMouseEnter={(e) => {
      e.target.style.background = currentTheme.highlightBackground;
      e.target.style.color = "#ffffff";
    }}
    onMouseLeave={(e) => {
      e.target.style.background = "transparent";
      e.target.style.color = currentTheme.textColor;
    }}
  >
    View All
  </button>
</section>


{/* Contact Me Section */}
<section
  id="contact"
  style={{
    minHeight: "2vh",
    padding: "5rem 2rem",
    background: currentTheme.cardBackground,
    color: currentTheme.textColor,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {/* Title */}
  <h2
    style={{
      fontSize: "3rem",
      marginBottom: "2rem",
      fontWeight: "bold",
    }}
  >
    Contact Me
  </h2>

  {/* Decorative Divider */}
  <motion.div
    style={{
      width: "50px",
      height: "5px",
      background: "linear-gradient(135deg, #3c82f6, #9147ff)",
      borderRadius: "2px",
      marginBottom: "2rem",
    }}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1, ease: "easeInOut" }}
  ></motion.div>

  {/* Email */}
  <p
    style={{
      fontSize: "1.2rem",
      marginBottom: "2rem",
      opacity: 0.9,
    }}
  >
    I’d love to hear from you! Feel free to connect with me via email or social media.
  </p>
  <p
    style={{
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: currentTheme.buttonText,
      marginBottom: "2rem",
    }}
  >
    Email Me: <a href="mailto:gordongill24@gmail.com">gordongill24@gmail.com</a>
  </p>

  {/* Social Media Links */}
  <div
    style={{
      display: "flex",
      gap: "1.5rem",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "2rem",
    }}
  >
    {[
      {
        name: "LinkedIn",
        icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
        link: "https://linkedin.com/in/gordongill",
      },
      {
        name: "GitHub",
        icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        link: "https://github.com/gilly24",
      },
      {
        name: "Twitter",
        icon: "https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
        link: "https://twitter.com/example",
      },
    ].map((social, index) => (
      <a
        key={index}
        href={social.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <img
          src={social.icon}
          alt={`${social.name} logo`}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.boxShadow = "0px 10px 20px rgba(60, 130, 246, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.2)";
          }}
        />
        <span
          style={{
            marginTop: "0.5rem",
            color: currentTheme.textColor,
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {social.name}
        </span>
      </a>
    ))}
  </div>

  {/* Download Resume Button */}
  <button
    style={{
      padding: "10px 20px",
      fontSize: "1rem",
      fontWeight: "bold",
      border: `2px solid ${currentTheme.buttonText}`,
      background: "transparent",
      color: currentTheme.textColor,
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background 0.3s, color 0.3s",
    }}
    onMouseEnter={(e) => {
      e.target.style.background = currentTheme.highlightBackground;
      e.target.style.color = "#ffffff";
    }}
    onMouseLeave={(e) => {
      e.target.style.background = "transparent";
      e.target.style.color = currentTheme.textColor;
    }}
  >
    <a
      href="/assets/resume.pdf" // Replace with the actual resume file path
      download="GordonGill_Resume.pdf"
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      Download Resume
    </a>
  </button>
</section>

    </div>
  );
}

const sectionStyle = (theme) => ({
  height: "100vh",
  padding: "5rem 2rem",
  backgroundColor: theme.cardBackground,
  color: theme.textColor,
  textAlign: "center",
  transition: "background 0.5s, color 0.5s",
});


