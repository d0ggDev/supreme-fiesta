import { useSection } from '@/contexts/SectionContext';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import EventsSection from '@/components/sections/EventsSection';
import GallerySection from '@/components/sections/GallerySection';
import BlogSection from '@/components/sections/BlogSection';
import ContactSection from '@/components/sections/ContactSection';
import { useAuth } from "@/_core/hooks/useAuth";

export default function Home() {
  // Authentication state from new backend
  const { user, loading, isAuthenticated, logout } = useAuth();

  const { activeSection } = useSection();
  const [displaySection, setDisplaySection] = useState(activeSection);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (activeSection !== displaySection) {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        setDisplaySection(activeSection);
        setIsExiting(false);
      }, 300);

      return () => clearTimeout(exitTimer);
    }
  }, [activeSection, displaySection]);

  const renderSection = () => {
    switch (displaySection) {
      case 'home':
        return <HeroSection />;
      case 'about':
        return <AboutSection />;
      case 'services':
        return <ServicesSection />;
      case 'events':
        return <EventsSection />;
      case 'gallery':
        return <GallerySection />;
      case 'blog':
        return <BlogSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div
        className={`w-full h-full transition-all duration-300 ease-in-out ${
          isExiting
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        }`}
      >
        {renderSection()}
      </div>

      <style>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOutToLeft {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-30px);
          }
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

        @keyframes fadeOutDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(20px);
          }
        }
      `}</style>
    </div>
  );
}
