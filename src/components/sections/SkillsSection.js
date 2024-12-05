import React from "react";
import { motion } from "framer-motion";

const SkillsSection = ({ theme }) => {
  const skills = [
    { name: "React.js", image: "React.png" },
    { name: "Next.js", image: "nextjs.svg" },
    { name: "JavaScript", image: "javascript.webp" },
    { name: "Python", image: "python.png" },
    { name: "Solidity", image: "solidity.png" },
    { name: "Node.js", image: "node.webp" },
    { name: "PostgreSQL", image: "postgresql.png" },
    { name: "Django", image: "django.svg" },
    { name: "Rust", image: "rust.png" },
    { name: "Docker", image: "docker.webp" },
  ];

  return (
    <section
      id="skills"
      style={{
        minHeight: "5vh",
        padding: "5rem 2rem",
        background: theme.cardBackground,
        color: theme.textColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        overflow: "visible", // Allow decorative circle to "leak" into this section
        transition: "background 0.5s, color 0.5s",
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
          opacity: 0.1,
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
          color: theme.textColor,
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
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          width: "100%",
          maxWidth: "1200px",
          zIndex: 1,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            style={{
              padding: "2.5rem",
              background: theme.cardBackground,
              borderRadius: "15px",
              boxShadow:
                "0px 15px 30px rgba(0, 0, 0, 0.5), inset 0px 0px 15px rgba(255, 255, 255, 0.05)",
              border: `1px solid ${theme.buttonBorder}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            whileHover={{
              scale: 1.1,
              boxShadow:
                "0px 20px 40px rgba(60, 130, 246, 0.7), inset 0px 0px 20px rgba(60, 130, 246, 0.3)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.02,
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {/* Animated Background Effect */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle, rgba(60, 130, 246, 0.2), transparent 70%)",
                zIndex: 0,
              }}
            ></div>

            {/* Skill Icon/Image */}
            <img
              src={`assets/images/${skill.image}`} // Update this path based on your folder structure
              alt={`${skill.name} logo`}
              style={{
                width: "75px",
                height: "75px",
                objectFit: "contain",
                marginBottom: "1rem",
                zIndex: 1,
              }}
            />

            {/* Skill Name */}
            <h4
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                color: theme.textColor,
                zIndex: 1,
              }}
            >
              {skill.name}
            </h4>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsSection;
