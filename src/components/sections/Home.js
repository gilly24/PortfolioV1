import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";

const Home = ({ theme, toggleTheme }) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: theme.background, // Apply the theme's background
        color: theme.textColor, // Apply the theme's text color
        fontFamily: "'Poppins', sans-serif",
        transition: "background 0.9s, color 0.9s", // Smooth transition for theme changes
        overflowX: "hidden",
        position: "relative",
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
