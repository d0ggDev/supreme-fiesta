import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { trpc } from '@/lib/trpc';

const GallerySection = () => {
  const { data: galleryItems = [], isLoading } = trpc.gallery.list.useQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Infinite scroll effect
  useEffect(() => {
    if (!isAutoPlay || galleryItems.length === 0) return;
    
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, isAutoPlay, galleryItems.length]);

  const handleNext = () => {
    if (galleryItems.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
      setIsTransitioning(false);
    }, 500);
    setIsAutoPlay(false);
  };

  const handlePrev = () => {
    if (galleryItems.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
      setIsTransitioning(false);
    }, 500);
    setIsAutoPlay(false);
  };

  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
    setIsAutoPlay(false);
  };

  if (isLoading) {
    return (
      <section className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading gallery...</p>
        </div>
      </section>
    );
  }

  if (galleryItems.length === 0) {
    return (
      <section className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        <div className="text-center">
          <p className="text-gray-400">No gallery images yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  const currentItem = galleryItems[currentIndex];
  const nextIndex = (currentIndex + 1) % galleryItems.length;
  const nextItem = galleryItems[nextIndex];

  return (
    <section className="relative w-full h-full flex items-center overflow-hidden bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] animate-section-enter">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-full">
        {/* Section Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Photo Gallery
            </span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Memorable moments from our events
          </p>
        </div>

        {/* Carousel Container */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="relative flex items-center justify-center gap-4 mb-8">
            {/* Left Navigation Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 z-20 p-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-cyan-500/50 group"
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100"></div>
            </button>

            {/* Main Carousel */}
            <div className="flex-1 flex items-center justify-center gap-4 px-20">
              {/* Current Image */}
              <div
                className={`relative w-96 h-96 transition-all duration-500 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <div className="relative w-full h-full">
                  {/* Glossy Card Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none"></div>

                  {/* Image with Shadow */}
                  <img
                    src={currentItem.imageUrl}
                    alt={currentItem.title}
                    className="w-full h-full object-cover rounded-3xl shadow-2xl"
                    style={{
                      boxShadow: '0 0 60px rgba(0, 206, 212, 0.3), 0 20px 40px rgba(0, 0, 0, 0.5)',
                    }}
                  />

                  {/* Shine Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Next Image Peek */}
              <div
                className={`relative w-20 h-96 transition-all duration-500 ${
                  isTransitioning ? 'opacity-0 blur-md' : 'opacity-50 blur-sm'
                }`}
              >
                <img
                  src={nextItem.imageUrl}
                  alt={nextItem.title}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 z-20 p-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-cyan-500/50 group"
            >
              <ChevronRight className="w-5 h-5" />
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100"></div>
            </button>
          </div>

          {/* Image Details */}
          <div className="text-center space-y-3 animate-fade-in-up">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400">
              {currentItem.category}
            </div>
            <h3 className="text-2xl font-bold text-white">{currentItem.title}</h3>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">{currentItem.description}</p>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {galleryItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-gradient-to-r from-cyan-500 to-blue-500'
                      : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
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

export default GallerySection;
