import React from "react";
import { motion } from "framer-motion";

const AboutSection = ({ theme }) => (
  <section
    id="about"
    style={{
      height: "100vh",
      padding: "5rem 2rem",
      backgroundColor: theme.cardBackground,
      color: theme.textColor,
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
        opacity: 0.3,
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
        width: "250px",
        height: "250px",
        background: "linear-gradient(135deg, #3c82f6, #9147ff)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 5px 20px rgba(60, 130, 246, 0.5)",
        marginBottom: "1.5rem",
        zIndex: 1,
        overflow: "hidden", // Ensure the image fits within the circular container
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.img
        src="assets/images/me.jpg"
        alt="Gordon Milly"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensure the image fills the container
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
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
      Hello! My name is <strong style={{ color: "#3c82f6" }}>Gordon</strong>.
      I'm a <strong>Third-year Computer Science student</strong> at the University of Technology Sydney, 
      deeply passionate about <strong>decentralized finance (DeFi)</strong>, 
      <strong> blockchain technology</strong>, and <strong>full-stack development</strong>. 
      I'm always eager to grow as a <strong>software engineer</strong>, constantly exploring new technologies 
      and building innovative solutions to solve real-world problems.
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
      Currently, I'm exploring the intersection of technology and creativity,
      focusing on delivering exceptional user experiences in my projects.
    </motion.p>
  </section>
);

export default AboutSection;
