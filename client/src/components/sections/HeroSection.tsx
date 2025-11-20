import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import { useSection } from '@/contexts/SectionContext';

const HeroSection = () => {
  const { setActiveSection } = useSection();

  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f1419] via-[#1a1a2e] to-[#16213e] animate-section-enter">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

        {/* Floating Lines Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Animated Hexagons */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-cyan-500/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border-2 border-blue-500/20 rotate-45 animate-spin-reverse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <img 
              src="/bitsa-logo.png" 
              alt="BITSA Logo" 
              className="relative h-24 w-auto mx-auto drop-shadow-2xl hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            BITSA CLUB
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-300 mb-3 font-light animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Bachelor of Information Technology Students Association
        </p>

        {/* Tagline */}
        <p className="text-base text-cyan-400 mb-6 flex items-center justify-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Zap className="w-4 h-4" />
          Empowering Future Tech Leaders
        </p>

        {/* Description */}
        <p className="text-gray-400 text-base mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          Join a vibrant community of tech enthusiasts, innovators, and future leaders. Discover opportunities to grow, collaborate, and make an impact.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={() => setActiveSection('about')}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg text-base font-semibold flex items-center gap-2 group transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
          >
            Explore More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={() => setActiveSection('contact')}
            variant="outline"
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3 rounded-lg text-base font-semibold transition-all duration-300"
          >
            Get in Touch
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sectionEnter {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-section-enter {
          animation: sectionEnter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
