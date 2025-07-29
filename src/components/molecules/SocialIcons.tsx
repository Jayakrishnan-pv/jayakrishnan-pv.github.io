import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaCodepen } from "react-icons/fa";

import { SOCIAL_LINKS } from "../../constants/appConstants";

const socials = [
  {
    href: SOCIAL_LINKS.github,
    icon: <FaGithub size={32} className="social-icon" />,
    label: "GitHub",
  },
  {
    href: SOCIAL_LINKS.linkedin,
    icon: <FaLinkedin size={32} className="social-icon" />,
    label: "LinkedIn",
  },
  {
    href: SOCIAL_LINKS.codepen,
    icon: <FaCodepen size={32} className="social-icon" />,
    label: "CodePen",
  },
];

const SocialIcons: React.FC = () => (
  <>
    {socials.map(({ href, icon, label }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="text-gray-300 transition-all duration-300 social-icon"
      >
        {icon}
      </a>
    ))}
  </>
);

export default SocialIcons;
