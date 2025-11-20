import { Card } from '@/components/ui/card';
import { Code, Briefcase, BookOpen, Users, Zap, Award } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: 'Technical Workshops',
      description: 'Learn cutting-edge technologies through hands-on sessions',
    },
    {
      icon: Briefcase,
      title: 'Career Development',
      description: 'Access mentorship and interview preparation',
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Curated tutorials and study materials',
    },
    {
      icon: Users,
      title: 'Networking Events',
      description: 'Connect with professionals and peers',
    },
    {
      icon: Zap,
      title: 'Innovation Projects',
      description: 'Collaborate on real-world projects',
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Earn recognized tech certifications',
    },
  ];

  return (
    <section className="relative w-full h-full flex items-center overflow-hidden bg-gradient-to-b from-[#0f3460] via-[#1a1a2e] to-[#16213e] animate-section-enter">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Comprehensive offerings to accelerate your tech career
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={service.title} style={{ animationDelay: `${0.1 + index * 0.05}s` }} className="animate-fade-in-up">
                <Card
                  className="bg-white/5 border border-cyan-500/20 p-5 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 group cursor-pointer hover:scale-105"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>
                </Card>
              </div>
            );
          })}
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

export default ServicesSection;
