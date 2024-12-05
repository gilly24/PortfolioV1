import React from "react";
import { motion } from "framer-motion";

const ContactMeSection = ({ theme }) => {
  return (
    <section
      id="contact"
      style={{
        minHeight: "100vh",
        padding: "5rem 2rem",
        background: theme.cardBackground,
        color: theme.textColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transition: "background 0.5s, color 0.5s",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: "3.5rem",
          marginBottom: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Contact Me
      </h2>

      {/* Decorative Divider */}
      <motion.div
        style={{
          width: "60px",
          height: "6px",
          background: "linear-gradient(135deg, #3c82f6, #9147ff)",
          borderRadius: "3px",
          marginBottom: "2rem",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      ></motion.div>

      {/* Web3Forms Contact Form */}
      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          width: "100%",
          maxWidth: "500px",
          padding: "2rem",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "10px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <input type="hidden" name="access_key" value="59392038-c743-4399-9bce-50102ea14208" />
        <input type="hidden" name="redirect" value="https://web3forms.com/success" />

        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            style={{ fontSize: "1.3rem", marginBottom: "0.5rem", display: "block" }}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            style={{
              width: "90%",
              padding: "1rem",
              borderRadius: "5px",
              border: `2px solid ${theme.buttonText}`,
              background: "rgba(255, 255, 255, 0.1)",
              color: theme.textColor,
              fontSize: "1.1rem",
            }}
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            style={{ fontSize: "1.3rem", marginBottom: "0.5rem", display: "block" }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
            style={{
              width: "90%",
              padding: "1rem",
              borderRadius: "5px",
              border: `2px solid ${theme.buttonText}`,
              background: "rgba(255, 255, 255, 0.1)",
              color: theme.textColor,
              fontSize: "1.1rem",
            }}
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            style={{ fontSize: "1.3rem", marginBottom: "0.5rem", display: "block" }}
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Type your message here..."
            rows="6"
            required
            style={{
              width: "90%",
              padding: "1rem",
              borderRadius: "5px",
              border: `2px solid ${theme.buttonText}`,
              background: "rgba(255, 255, 255, 0.1)",
              color: theme.textColor,
              fontSize: "1.1rem",
            }}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            border: `2px solid ${theme.buttonText}`,
            background: "transparent",
            color: theme.textColor,
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background 0.3s, color 0.3s",
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
        >
          Submit
        </button>
      </form>

      {/* Social Media Links */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
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
                color: theme.textColor,
                fontWeight: "bold",
                fontSize: "1rem",
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
