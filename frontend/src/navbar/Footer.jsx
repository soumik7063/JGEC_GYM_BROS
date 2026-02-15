import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const socialMidia = [
  {
    name: "GitHub",
    icon: <FaGithub />,
    link: "https://github.com/soumik7063"
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/soumik-ghatak-6584bb23b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    link: "https://www.instagram.com/soumik.ghatak/"
  }
];

const Footer = () => {
  return (
    <div className='flex justify-between bg-gray-200 dark:bg-gray-800 p-4 items-center text-center text-gray-600 dark:text-gray-300'>
      <h1>Author: Soumik Ghatak (IT'27)</h1>
      <div className='flex'>
        {socialMidia.map((social) => (
          <a 
            key={social.name} 
            href={social.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mx-2 text-2xl text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Footer