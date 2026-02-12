import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const socialMidia = [
  {
    name: "GitHub",
    icon: <FaGithub />,
    link: "https://github.com/soumik7063",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/soumik-ghatak-6584bb23b",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    link: "https://www.instagram.com/soumik.ghatak/",
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-black/80 backdrop-blur-xl border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left - Author */}
        <h1 className="text-gray-400 text-sm text-center md:text-left">
          Author:{" "}
          <span className="text-orange-500 font-semibold">
            Soumik Ghatak (IT'27)
          </span>
        </h1>

        {/* Right - Social Icons */}
        <div className="flex space-x-6 text-xl">
          {socialMidia.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-all duration-300 hover:scale-110"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-0.5 bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-40"></div>
    </footer>
  );
};

export default Footer;
