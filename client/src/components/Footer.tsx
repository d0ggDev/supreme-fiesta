import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#0f1419] via-[#1a1a2e] to-[#0f1419] border-t border-cyan-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">BITSA CLUB</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bachelor of Information Technology Students Association - Empowering future tech leaders through innovation, collaboration, and continuous learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-cyan-400 transition-colors">Services</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-cyan-400 transition-colors">Events</a></li>
              <li><a href="#blog" className="text-gray-400 hover:text-cyan-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail className="w-4 h-4" />
                <a href="mailto:bitsaclub@ueab.ac.ke">bitsaclub@ueab.ac.ke</a>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span>President: +254 708 898 899</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span>VP: +254 725 486 687</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-cyan-500/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 sm:mb-0">
            © {currentYear} BITSA Club. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors p-2 hover:bg-white/5 rounded-lg">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors p-2 hover:bg-white/5 rounded-lg">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors p-2 hover:bg-white/5 rounded-lg">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
