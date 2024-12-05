import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";

const Home = ({ theme, toggleTheme }) => {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: theme.background, // Apply the theme's background
        color: theme.textColor, // Apply the theme's text color
        fontFamily: "'Poppins', sans-serif",
        transition: "background 0.9s, color 0.9s", // Smooth transition for theme changes
      }}
    >
      <HeroSection theme={theme} toggleTheme={toggleTheme} />
            {/* Gradient Line Divider */}
            <div
        style={{
          width: "100%",
          height: "10px",
          background: "linear-gradient(90deg, #3c82f6, #9147ff)",
          margin: "0 auto",
          position: "relative",
        }}
      ></div>
      <AboutSection theme={theme} />
      <SkillsSection theme={theme} />
      <ProjectsSection theme={theme} />
      <ContactSection theme={theme} />
    </div>
  );
};

export default Home;
