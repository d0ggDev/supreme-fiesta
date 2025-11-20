import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { trpc } from '@/lib/trpc';

const EventsSection = () => {
  const { data: events = [], isLoading } = trpc.events.list.useQuery();

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      workshop: 'bg-blue-500/20 text-blue-400',
      networking: 'bg-purple-500/20 text-purple-400',
      bootcamp: 'bg-cyan-500/20 text-cyan-400',
      competition: 'bg-green-500/20 text-green-400',
      meeting: 'bg-orange-500/20 text-orange-400',
      seminar: 'bg-red-500/20 text-red-400',
    };
    return colors[category.toLowerCase()] || 'bg-gray-500/20 text-gray-400';
  };

  if (isLoading) {
    return (
      <section className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#16213e] via-[#0f3460] to-[#1a1a2e]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading events...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-full flex items-center overflow-hidden bg-gradient-to-b from-[#16213e] via-[#0f3460] to-[#1a1a2e] animate-section-enter">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Join us for exciting workshops, competitions, and networking opportunities
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No upcoming events. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-4">
            {events.map((event, index) => (
              <div key={event.id} style={{ animationDelay: `${0.1 + index * 0.1}s` }} className="animate-fade-in-up">
                <Card className="bg-white/5 border border-cyan-500/20 p-4 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 group hover:scale-105">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-400 text-xs mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 border-t border-cyan-500/20 pt-3 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                  </div>

                  {event.registrationLink ? (
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs py-1 hover:from-cyan-600 hover:to-blue-600 transition-all">
                        Register Now
                      </Button>
                    </a>
                  ) : (
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs py-1 hover:from-cyan-600 hover:to-blue-600 transition-all">
                      Learn More
                    </Button>
                  )}
                </Card>
              </div>
            ))}
          </div>
        )}
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

export default EventsSection;
