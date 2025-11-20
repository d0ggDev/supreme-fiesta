import { Card } from '@/components/ui/card';
import { Users, Target, Lightbulb } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: Users,
      title: 'Community',
      description: 'Building a supportive network of tech enthusiasts',
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Fostering creative thinking and solutions',
    },
    {
      icon: Lightbulb,
      title: 'Learning',
      description: 'Continuous growth through workshops and projects',
    },
  ];

  return (
    <section className="relative w-full h-full flex items-center overflow-hidden bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] animate-section-enter">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              About BITSA
            </span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Discover who we are and what drives our mission
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="max-h-96 overflow-y-auto pr-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-bold text-white mb-3">Who We Are</h3>
            <p className="text-gray-400 mb-3 text-sm leading-relaxed">
              BITSA is a dynamic student organization dedicated to fostering excellence in technology education. We serve as a bridge between academic learning and real-world industry experience.
            </p>
            <p className="text-gray-400 mb-3 text-sm leading-relaxed">
              Our members include passionate students and tech enthusiasts who collaborate to create meaningful opportunities for growth and innovation.
            </p>
            <ul className="space-y-2">
              {['Networking Events', 'Technical Workshops', 'Industry Partnerships', 'Career Development'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {[
              { number: '500+', label: 'Members' },
              { number: '50+', label: 'Events' },
              { number: '100%', label: 'Commitment' },
              { number: '2024', label: 'Founded' },
            ].map((stat) => (
              <Card key={stat.label} className="bg-white/5 border border-cyan-500/20 p-4 text-center hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <p className="text-gray-400 text-xs">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={value.title} style={{ animationDelay: `${0.3 + index * 0.1}s` }} className="animate-fade-in-up">
                <Card
                  className="bg-white/5 border border-cyan-500/20 p-5 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 group hover:scale-105"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
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

export default AboutSection;
