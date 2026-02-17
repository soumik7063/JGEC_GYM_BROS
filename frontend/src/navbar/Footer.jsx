import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-gray-100 dark:bg-gray-900 pt-16 pb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[50%] -left-[20%] w-[70%] h-[70%] rounded-full bg-blue-400/10 blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-purple-400/10 blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[40%] left-[20%] w-[60%] h-[60%] rounded-full bg-pink-400/10 blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 group">
              <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-xl">💪</span>
              </div>
              <div>
                <span className="text-2xl font-black text-gray-900 dark:text-white">GYM</span>
                <span className="text-2xl font-black bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">BROS</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              Empowering the students of JGEC to achieve their fitness goals. Strength, Unity, and Discipline. Join the movement today.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://github.com/soumik7063" icon={<FaGithub />} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/soumik-ghatak-6584bb23b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" icon={<FaLinkedin />} label="LinkedIn" />
              <SocialLink href="https://www.instagram.com/soumik.ghatak/" icon={<FaInstagram />} label="Instagram" />
              <SocialLink href="#" icon={<FaTwitter />} label="Twitter" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <FooterLink href="#">Home</FooterLink>
              <FooterLink href="#">Workouts</FooterLink>
              <FooterLink href="#">Statistics</FooterLink>
              <FooterLink href="#">Leaderboard</FooterLink>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white relative inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-purple-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Community Guidelines</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-pink-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400 group">
                <FaMapMarkerAlt className="mt-1 text-blue-500 group-hover:text-blue-400 transition-colors" />
                <span>Jalpaiguri Government Engineering College, West Bengal, India</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 group">
                <FaEnvelope className="text-purple-500 group-hover:text-purple-400 transition-colors" />
                <span>support@gymbros.jgec.edu</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 group">
                <FaPhone className="text-pink-500 group-hover:text-pink-400 transition-colors" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} JGEC Gym Bros. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
            <p className="flex items-center">
              Made with <span className="text-red-500 mx-1 animate-pulse">❤</span> by <a href="https://github.com/soumik7063" className="text-blue-500 ml-1 hover:underline font-medium">Soumik Ghatak</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg hover:shadow-blue-500/30 border border-gray-200 dark:border-gray-700 hover:border-transparent"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }) => (
  <li>
    <a href={href} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center group text-sm">
      <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
      {children}
    </a>
  </li>
);

export default Footer;