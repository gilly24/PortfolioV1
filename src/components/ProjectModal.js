import React from "react";
import { motion } from "framer-motion";

const ProjectModal = ({ project, onClose, theme }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.85)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "2rem",
    }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.5 }}
      style={{
        background: theme.cardBackground,
        borderRadius: "15px",
        overflow: "hidden",
        maxWidth: "90vw",
        maxHeight: "90vh",
        width: "auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div 
        style={{ 
          position: "relative",
          maxHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          background: "#000",
        }}
      >
        <video
          style={{
            width: "auto",
            height: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
          src={project.video}
          controls
          autoPlay
          loop
          playsInline
        />
        <button
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(0, 0, 0, 0.5)",
            border: "none",
            borderRadius: "50%",
            width: "2.5rem",
            height: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
            fontSize: "1.5rem",
            transition: "background-color 0.3s",
            zIndex: 2,
          }}
          onClick={onClose}
          onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.8)"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)"}
        >
          ×
        </button>
      </div>
      <div
        style={{
          padding: "1.5rem",
          color: theme.textColor,
          overflow: "auto",
          maxHeight: "40vh",
          scrollbarWidth: "thin",
          scrollbarColor: `${theme.buttonText || "#3c82f6"} transparent`,
        }}
      >
        <h2 
          style={{ 
            marginBottom: "1rem", 
            fontSize: "1.8rem",
          }}
        >
          {project.title}
        </h2>
        <div
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            paddingRight: "1rem",
          }}
        >
          <p style={{ margin: "0 0 1rem 0" }}>{project.description}</p>
          
          <h3 style={{ fontSize: "1.4rem", marginBottom: "0.8rem", color: theme.buttonText || "#3c82f6" }}>Features:</h3>
          {project.title === "Coinflip DApp" ? (
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li>Smart contract-based betting system</li>
              <li>Phantom wallet integration</li>
              <li>Real-time transaction tracking</li>
              <li>Transparent and verifiable outcomes</li>
              <li>User-friendly betting interface</li>
            </ul>
          ) : project.title === "MugenAI" ? (
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li>Secure authentication with Clerk</li>
              <li>AI video generation using Runway API</li>
              <li>Real-time generation progress tracking</li>
              <li>User profile management</li>
              <li>Video history and management</li>
            </ul>
          ) : null}

          <h3 style={{ fontSize: "1.4rem", marginBottom: "0.8rem", color: theme.buttonText || "#3c82f6" }}>Technologies Used:</h3>
          {project.title === "Coinflip DApp" ? (
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>Solidity for smart contracts</li>
              <li>Solana blockchain</li>
              <li>Web3.js for blockchain interaction</li>
              <li>React.js for frontend</li>
              <li>Anchor for development and testing</li>
            </ul>
          ) : project.title === "MugenAI" ? (
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>Next.js for frontend and API routes</li>
              <li>Clerk Authentication</li>
              <li>Runway ML API</li>
              <li>Tailwind CSS for styling</li>
              <li>PostgreSQL for data storage</li>
            </ul>
          ) : null}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default ProjectModal; 