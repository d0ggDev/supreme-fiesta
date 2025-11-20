import { Card } from '@/components/ui/card';
import { Users, Target, Lightbulb } from 'lucide-react';
import './AboutSection.css';

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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              About BITSA
            </span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Discover who we are and what drives our mission
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-h-96 overflow-y-auto pr-4 animate-fade-in-up delay-100">
            <h3 className="text-2xl font-bold text-white mb-4">Who We Are</h3>
            <p className="text-gray-400 mb-4 text-base leading-relaxed">
              BITSA is a dynamic student organization dedicated to fostering excellence in technology education. We serve as a bridge between academic learning and real-world industry experience.
            </p>
            <p className="text-gray-400 mb-4 text-base leading-relaxed">
              Our members include passionate students and tech enthusiasts who collaborate to create meaningful opportunities for growth and innovation.
            </p>
            <ul className="space-y-3">
              {['Networking Events', 'Technical Workshops', 'Industry Partnerships', 'Career Development'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-300 text-base">
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in-up delay-200">
            {[
              { number: '500+', label: 'Members' },
              { number: '50+', label: 'Events' },
              { number: '100%', label: 'Commitment' },
              { number: '2024', label: 'Founded' },
            ].map((stat) => (
              <Card key={stat.label} className="bg-white/5 border border-cyan-500/20 p-6 text-center hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className={`animate-fade-in-up delay-${300 + index * 100}`}>
                <Card
                  className="bg-white/5 border border-cyan-500/20 p-6 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 group hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-base">{value.description}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
