import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactMeSection = ({ theme }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const object = {};
    formData.forEach((value, key) => object[key] = value);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
      });

      if (response.ok) {
        setShowSuccess(true);
        e.target.reset();
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Responsive styles
  const styles = {
    section: {
      minHeight: "100vh",
      padding: window.innerWidth <= 768 ? "3rem 1rem" : "5rem 2rem",
      background: theme.cardBackground,
      color: theme.textColor,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      transition: "background 0.5s, color 0.5s",
      position: "relative",
    },
    title: {
      fontSize: window.innerWidth <= 768 ? "2.5rem" : "3.5rem",
      marginBottom: "1.5rem",
      fontWeight: "bold",
      padding: "0 1rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      width: "100%",
      maxWidth: window.innerWidth <= 768 ? "100%" : "500px",
      padding: window.innerWidth <= 768 ? "1.5rem" : "2rem",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "10px",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    },
    input: {
      width: "100%",
      padding: window.innerWidth <= 768 ? "0.8rem" : "1rem",
      borderRadius: "5px",
      border: `2px solid ${theme.buttonText}`,
      background: "rgba(255, 255, 255, 0.1)",
      color: theme.textColor,
      fontSize: window.innerWidth <= 768 ? "1rem" : "1.1rem",
    },
    label: {
      fontSize: window.innerWidth <= 768 ? "1.1rem" : "1.3rem",
      marginBottom: "0.5rem",
      display: "block",
      textAlign: "left",
    },
    socialLinks: {
      display: "flex",
      gap: window.innerWidth <= 768 ? "1rem" : "2rem",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "2rem",
      flexWrap: "wrap",
      padding: "0 1rem",
    },
    socialIcon: {
      width: window.innerWidth <= 768 ? "40px" : "60px",
      height: window.innerWidth <= 768 ? "40px" : "60px",
    },
    successPopup: {
      position: "fixed",
      top: "2rem",
      left: "50%",
      transform: "translateX(-50%)",
      background: "linear-gradient(135deg, #3c82f6, #9147ff)",
      color: "#ffffff",
      padding: window.innerWidth <= 768 ? "0.8rem 1.5rem" : "1rem 2rem",
      borderRadius: "10px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      width: window.innerWidth <= 768 ? "90%" : "auto",
      maxWidth: "500px",
    },
  };

  return (
    <section id="contact" style={styles.section}>
      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={styles.successPopup}
          >
            <div style={{ fontSize: window.innerWidth <= 768 ? "1.2rem" : "1.5rem" }}>✓</div>
            <div>
              <h3 style={{ margin: 0, marginBottom: "0.2rem", fontSize: window.innerWidth <= 768 ? "1.1rem" : "1.3rem" }}>
                Message Sent!
              </h3>
              <p style={{ margin: 0, fontSize: window.innerWidth <= 768 ? "0.8rem" : "0.9rem", opacity: 0.9 }}>
                Thank you for reaching out. I'll get back to you soon!
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#ffffff",
                fontSize: window.innerWidth <= 768 ? "1rem" : "1.2rem",
                cursor: "pointer",
                padding: "0.5rem",
                marginLeft: "auto",
              }}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <h2 style={styles.title}>Contact Me</h2>

      {/* Decorative Divider */}
      <motion.div
        style={{
          width: window.innerWidth <= 768 ? "40px" : "60px",
          height: "6px",
          background: "linear-gradient(135deg, #3c82f6, #9147ff)",
          borderRadius: "3px",
          marginBottom: "2rem",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Contact Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="hidden" name="access_key" value="59392038-c743-4399-9bce-50102ea14208" />

        {/* Name Field */}
        <div>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            style={styles.input}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
            style={styles.input}
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" style={styles.label}>Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Type your message here..."
            rows={window.innerWidth <= 768 ? "4" : "6"}
            required
            style={styles.input}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: window.innerWidth <= 768 ? "0.8rem 1.5rem" : "1rem 2rem",
            fontSize: window.innerWidth <= 768 ? "1.1rem" : "1.2rem",
            fontWeight: "bold",
            border: `2px solid ${theme.buttonText}`,
            background: "transparent",
            color: theme.textColor,
            borderRadius: "5px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            transition: "background 0.3s, color 0.3s, transform 0.3s",
            opacity: isSubmitting ? 0.7 : 1,
            width: "100%",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.transform = "scale(1.05)";
              e.target.style.background = theme.highlightBackground;
              e.target.style.color = "#ffffff";
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.target.style.transform = "scale(1)";
              e.target.style.background = "transparent";
              e.target.style.color = theme.textColor;
            }
          }}
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>

      {/* Social Media Links */}
      <div style={styles.socialLinks}>
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
            name: "X/Twitter",
            icon: "assets/images/x.png",
            link: "https://twitter.com/zynl_eth",
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
                ...styles.socialIcon,
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
                color: theme.textColor,
                fontWeight: "bold",
                fontSize: window.innerWidth <= 768 ? "0.9rem" : "1rem",
              }}
            >
              {social.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ContactMeSection;
