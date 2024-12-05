import React from "react";

const SocialLinks = ({ theme }) => {
  const socialMedia = [
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
      icon: "/assets/icons/x.png",
      link: "https://twitter.com/zynl_eth",
    },
  ];

  return (
    <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
      {socialMedia.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          <img
            src={social.icon}
            alt={`${social.name} icon`}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
            }}
          />
          <p style={{ color: theme.textColor, fontSize: "0.9rem", marginTop: "0.5rem" }}>
            {social.name}
          </p>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
